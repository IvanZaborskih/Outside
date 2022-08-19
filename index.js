require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { sequelize, User } = require('./models');
const router = require('./routes/index');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors({ origin: '*' }));
app.use(express.json());
app.use('/', router);

sequelize.authenticate()
	.then(() => {
		console.log('Database connected');
		app.listen(PORT, () => {
			console.log(`SERVER STARTED ON PORT ${PORT}`);
		});
	})
	.catch(error => console.log(error));
