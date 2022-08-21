const { User, Tag } = require('../models/index');

class TagServise {
	async postTag(tagBody, userId) {
		const { name, sortOrder } = tagBody;

		// let checkTagName = await Tag.findOne({
		// 	where: { name }
		// });

		// if (checkTagName.name === name) {
		// 	return 'name';
		// }

		const user = await User.findOne({
			where: { id: userId }
		});

		const tag = await Tag.create(
			{ name, sortOrder, creator: user.uuid }
		);

		if (!tag) {
			return false;
		} else {
			return tag;
		}
	}
}

module.exports = new TagServise();