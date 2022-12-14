const { User } = require('../models/index');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Op } = require("sequelize");

const generateAccessToken = (id, email) => {
	const payload = { id, email };
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

		let regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
		if (!password.match(regexPassword)) {
			return 'password'
		}

		const hashPassword = bcrypt.hashSync(password, 7);

		const user = await User.create({ nickname, email, password: hashPassword });

		if (!user) {
			return false;
		} else {
			const token = generateAccessToken(user.id, user.email);
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

		const token = generateAccessToken(user.id, user.email);
		return token;
	}
}

module.exports = new AuthService();