require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { sequelize, User } = require('./models');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors({ origin: '*' }));
app.use(express.json());

app.post('/users', async (req, res) => {
	const { email, password, nickname } = req.body;

	try {
		const user = await User.create({ email, password, nickname });

		return res.json(user);
	} catch (err) {
		console.log(err);
		return res.status(500).json(err);
	}
})

sequelize.authenticate()
	.then(() => {
		console.log('Database connected');
		app.listen(PORT, () => {
			console.log(`SERVER STARTED ON PORT ${PORT}`);
		});
	})
	.catch(error => console.log(error));
