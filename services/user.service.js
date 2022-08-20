const { User } = require('../models/index');
const { Op } = require("sequelize");
const bcrypt = require('bcryptjs');

class UserService {
	async getUser(id) {
		const user = await User.findOne({
			where: { id },
			attributes: { exclude: ['uuid', 'password'] }
		});

		if (!user) {
			return false;
		} else {
			return user;
		}
	}

	async updateUser(userBody, userId) {
		const { nickname, email, password } = userBody;

		let regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
		if (!password.match(regexPassword)) {
			return 'password'
		}

		const hashPassword = bcrypt.hashSync(password, 7);

		let user = await User.findOne({
			where: { id: userId }
		});

		if (user.nickname === nickname) {
			return 'nickname'
		} else if (user.email === email) {
			return 'email'
		}

		user = await User.update(
			{ nickname, email, password: hashPassword },
			{ where: { id: userId } }
		);

		const newUser = await User.findOne({
			where: { id: userId },
			attributes: { exclude: ['uuid', 'password'] }
		});

		if (!user) {
			return false;
		} else {
			return newUser;
		}
	}
}

module.exports = new UserService();