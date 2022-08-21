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
				return res.status(200).json(tag);
			}
		} catch (err) {
			return res.status(500).json({ message: err.message });
		}
	}
}

module.exports = new TagController();