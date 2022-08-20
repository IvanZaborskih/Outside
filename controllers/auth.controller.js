const authService = require('../services/auth.service');
const { validationResult } = require('express-validator');

class AuthController {
	async signIn(req, res) {
		try {
			const userToken = await authService.signIn(req.body);

			if (!userToken) {
				throw new Error;
			} if (userToken === 'exists') {
				return res.status(400).json({ message: 'User with email/nickname already exists' });
			} else {
				return res.status(200).json({ token: userToken, expire: process.env.EXPIRE_TIME });
			}
		} catch (err) {
			return res.status(500).json({ message: err.message });
		}
	}

	async login(req, res) {
		try {
			const userToken = await authService.login(req.body);

			if (!userToken) {
				throw new Error;
			} else if (userToken === 'user') {
				return res.status(400).json({ message: 'User not found' });
			} else if (userToken === 'password') {
				return res.status(400).json({ message: 'Wrong password' });
			} else {
				return res.status(200).json({ token: userToken, expire: process.env.EXPIRE_TIME });
			}
		} catch (err) {
			return res.status(500).json({ message: err.message });
		}
	}

	async logout(req, res) {
		try {
			return res.status(200).json({ message: 'User logout' });
		} catch (err) {
			return res.status(500).json({ message: err.message });
		}
	}
}

module.exports = new AuthController();