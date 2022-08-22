const authService = require('../services/auth.service');

class AuthController {
	async signIn(req, res) {
		try {
			const userToken = await authService.signIn(req.body);

			if (!userToken) {
				throw new Error;
			} else if (userToken === 'exists') {
				return res.status(401).json({ message: 'User with email/nickname already exists' });
			} else if (userToken === 'password') {
				return res.status(401).json({ message: 'The password must contain at least 8 characters, at least one uppercase letter, one lowercase letter and one number' });
			} else {
				return res.status(201).json({ token: userToken, expire: process.env.EXPIRE_TIME });
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
				return res.status(401).json({ message: 'User not found' });
			} else if (userToken === 'password') {
				return res.status(401).json({ message: 'Wrong password' });
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