const { User, Tag } = require('../models/index');

class TagServise {
	async postTag(tagBody, userId) {
		const { name, sortOrder } = tagBody;

		const checkTagName = await Tag.findOne({
			where: { name }
		});
		if (checkTagName !== null) {
			return 'name';
		}

		const user = await User.findOne({
			where: { id: userId }
		});
		const tag = await Tag.create(
			{ name, sortOrder, creator: user.uuid }
		);

		if (!tag) {
			return false;
		} else {
			return await Tag.findOne({
				where: { id: tag.id },
				attributes: {
					exclude: ['creator']
				}
			});
		}
	}
}

module.exports = new TagServise();