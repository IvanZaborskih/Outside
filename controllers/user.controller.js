const userService = require('../services/user.service');
const { validationResult } = require('express-validator');

class UserController {
	async getUser(req, res) {
		try {
			const user = await userService.getUser(req.user.id);

			if (!user) {
				throw new Error;
			} else {
				return res.status(200).json(user);
			}
		} catch (err) {
			return res.status(500).json({ message: err.message });
		}
	}

	async updateUser(req, res) {
		try {
			const errorsValidation = validationResult(req);
			if (!errorsValidation.isEmpty()) {
				return res.status(400).json({ message: errorsValidation.errors[0].msg });
			}

			const user = await userService.updateUser(req.body, req.user.id);

			if (!user) {
				throw new Error;
			} else if (user === 'nickname') {
				return res.status(400).json({ message: 'User has the same nickname' });
			} else if (user === 'email') {
				return res.status(400).json({ message: 'User has the same email' });
			} else {
				return res.status(200).json(user);
			}
		} catch (err) {
			return res.status(500).json({ message: err.message });
		}
	}
}

module.exports = new UserController();