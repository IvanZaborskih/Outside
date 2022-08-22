const tagService = require('../services/tag.service');

class TagController {
	async postTag(req, res) {
		try {
			const tag = await tagService.postTag(req.body, req.user.id);

			if (!tag) {
				throw new Error;
			} else if (tag === 'name') {
				return res.status(400).json({ message: 'Tag with same name already exist' });
			} else {
				return res.status(201).json(tag);
			}
		} catch (err) {
			return res.status(500).json({ message: err.message });
		}
	}

	async getTag(req, res) {
		try {
			const tag = await tagService.getTag(req.params.id, req.user.id);

			if (!tag) {
				throw new Error;
			} else {
				return res.status(200).json(tag);
			}
		} catch (err) {
			return res.status(500).json({ message: err.message });
		}
	}

	async updateTag(req, res) {
		try {
			const tag = await tagService.updateTag(req.body, req.params.id, req.user.id);

			if (!tag) {
				throw new Error;
			} else if (tag === 'notCreator') {
				return res.status(400).json({ message: 'Tag has the different creator' });
			} else if (tag === 'name') {
				return res.status(400).json({ message: 'Tag has the same name' });
			} else {
				return res.status(201).json(tag);
			}
		} catch (err) {
			return res.status(500).json({ message: err.message });
		}
	}

	async deleteTag(req, res) {
		try {
			const tag = await tagService.deleteTag(req.params.id, req.user.id);

			if (!tag) {
				throw new Error;
			} else if (tag === 'notCreator') {
				return res.status(400).json({ message: 'Tag has the different creator' });
			} else {
				return res.status(200).json({ message: 'Tag deleted' });
			}
		} catch (err) {
			return res.status(500).json({ message: err.message });
		}
	}
}

module.exports = new TagController();