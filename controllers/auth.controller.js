const authService = require('../services/auth.service');
const { validationResult } = require('express-validator');

class AuthController {
	async signIn(req, res) {
		try {
			const errorsValidation = validationResult(req);
			if (!errorsValidation.isEmpty()) {
				return res.status(400).json({ message: errorsValidation.errors[0].msg });
			}

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

	// async login(req, res) {
	// 	try {
	// 		const token = await authService.login(req.body);

	// 		if (!token) {
	// 			throw new Error;
	// 		} else if (token === 'user') {
	// 			return res.status(400).json({ message: 'User not found' });
	// 		} else if (token === 'password') {
	// 			return res.status(400).json({ message: 'Wrong password' });
	// 		} else {
	// 			return res.status(200).json(token);
	// 		}
	// 	} catch (err) {
	// 		return res.status(500).json({ message: err.message });
	// 	}
	// }
}

module.exports = new AuthController();