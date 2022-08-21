const userService = require('../services/user.service');

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
			const user = await userService.updateUser(req.body, req.user.id);

			if (!user) {
				throw new Error;
			} else if (user === 'nickname') {
				return res.status(400).json({ message: 'User has the same nickname' });
			} else if (user === 'email') {
				return res.status(400).json({ message: 'User has the same email' });
			} else if (user === 'password') {
				return res.status(400).json({ message: 'The password must contain at least 8 characters, at least one uppercase letter, one lowercase letter and one number' });
			} else {
				return res.status(200).json(user);
			}
		} catch (err) {
			return res.status(500).json({ message: err.message });
		}
	}

	async deleteUser(req, res) {
		try {
			const user = await userService.deleteUser(req.user.id);

			if (!user) {
				throw new Error;
			} else {
				return res.status(200).json({ message: 'User deleted' });
			}
		} catch (err) {
			return res.status(500).json({ message: err.message });
		}
	}
}

module.exports = new UserController();