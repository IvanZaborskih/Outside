const { User } = require('../models/index');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Op } = require("sequelize");

const generateAccessToken = (password, email) => {
	const payload = { password, email };
	return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: process.env.EXPIRE_TIME });
}

class AuthService {
	async signIn(registrationBody) {
		const { nickname, email, password } = registrationBody;
		const candidate = await User.findOne({
			where: {
				[Op.or]: [{ email }, { nickname }]
			}
		});
		if (candidate) {
			return 'exists';
		}
		const hashPassword = bcrypt.hashSync(password, 7);

		const user = await User.create({ nickname, email, password: hashPassword });

		if (!user) {
			return false;
		} else {
			const token = generateAccessToken(user.password, user.email);
			return token;
		}
	}

	async login(loginBody) {
		const { email, password } = loginBody;
		const user = await User.findOne({ where: { email } });
		if (!user) {
			return 'user';
		}

		const validPassword = bcrypt.compareSync(password, user.password);
		if (!validPassword) {
			return 'password';
		}

		const token = generateAccessToken(user.password, user.email);
		return token;
	}
}

module.exports = new AuthService();