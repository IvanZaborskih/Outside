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
			{ name, sortOrder, creator_uuid: user.uuid }
		);

		if (!tag) {
			return false;
		} else {
			return await Tag.findOne({
				where: { id: tag.id },
				attributes: {
					exclude: ['creator_uuid']
				}
			});
		}
	}

	async getTag(tagId, userId) {
		const tag = await Tag.findOne({
			where: { id: tagId },
			attributes: {
				exclude: ['creator_uuid', 'id']
			},
			include: [{
				model: User,
				as: 'creator',
				attributes: ['nickname', 'uuid']
			}]
		});

		if (!tag) {
			return false;
		} else {
			return tag;
		}
	}

	async updateTag(tagBody, tagId, userId) {
		const { name, sortOrder } = tagBody;
		const user = await User.findOne({
			where: { id: userId }
		});

		let tag = await Tag.findOne({
			where: { id: tagId }
		});

		if (tag.creator_uuid !== user.uuid) {
			return 'notCreator'
		} else if (tag.name === name) {
			return 'name'
		}

		tag = await Tag.update(
			{ name, sortOrder },
			{ where: { id: tagId } }
		);

		tag = await Tag.findOne({
			where: { id: tagId },
			attributes: {
				exclude: ['creator_uuid', 'id']
			},
			include: [{
				model: User,
				as: 'creator',
				attributes: ['nickname', 'uuid']
			}]
		});

		if (!tag) {
			return false;
		} else {
			return tag;
		}
	}

	async deleteTag(tagId, userId) {
		const user = await User.findOne({
			where: { id: userId }
		});

		let tag = await Tag.findOne({
			where: { id: tagId }
		});

		if (tag.creator_uuid !== user.uuid) {
			return 'notCreator'
		}

		tag = await Tag.destroy(
			{ where: { id: tagId } }
		);

		if (!tag) {
			return false;
		} else {
			return tag;
		}
	}
}

module.exports = new TagServise();