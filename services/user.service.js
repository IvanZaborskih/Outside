const { User, Tag, UserTag } = require('../models/index');
const bcrypt = require('bcryptjs');

const addTags = async (userId, tagsIdArray) => {
	await User.findOne({ where: { id: userId } })
		.then(async user => {
			for (let i = 0; i < tagsIdArray.length; i++) {
				await Tag.findOne({ where: { id: tagsIdArray[i] } })
					.then(async tag => {
						await user.addTag(tag, { througth: UserTag });
					});
			}
		});
};

const checkPassword = (password) => {
	let regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
	if (typeof password !== 'undefined') {
		if (!password.match(regexPassword)) {
			return 'password'
		}
		return hashPassword = bcrypt.hashSync(password, 7);
	}
}

class UserService {
	async getUser(id) {
		const user = await User.findOne({
			where: { id },
			attributes: {
				exclude: ['uuid', 'password']
			},
			include: [{
				model: Tag,
				as: 'tags',
				attributes: {
					exclude: ['creator_uuid']
				}
			}]
		});

		if (!user) {
			return false;
		} else {
			return user;
		}
	}

	async updateUser(userBody, userId) {
		const { nickname, email, password } = userBody;

		const hashPassword = checkPassword(password);

		let user = await User.findOne({
			where: { id: userId }
		});

		if (user.nickname === nickname) {
			return 'nickname'
		} else if (user.email === email) {
			return 'email'
		} else if (hashPassword === 'password') {
			return 'password'
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

	async deleteUser(id) {
		const user = await User.destroy({ where: { id } });

		if (!user) {
			return false;
		} else {
			return true;
		}
	}

	async addTagToUser(tagArray, userId) {
		await addTags(userId, tagArray.tags);

		const tags = await Tag.findAll({
		})

		if (!tags) {
			return false;
		} else {
			return tags;
		}
	}
}

module.exports = new UserService();