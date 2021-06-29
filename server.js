require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { PORT = 5000, DATABASE_URL } = process.env;
const mongoose = require('mongoose');
const app = express();

mongoose.connect(DATABASE_URL, {
	useUnifiedTopology: true,
	useNewUrlParser: true,
	useFindAndModify: false,
	useCreateIndex: true,
});
// connection events
mongoose.connection
	.on('open', () => console.log('Your are connected to mongoose'))
	.on('close', () => console.log('Your are disconnected from mongoose'))
	.on('error', (error) => console.log(error));

//middleware
app.use(cors());
app.use(express.json());

//routes
const packagesController = require('./controllers/package_controller');
app.use('/packages', packagesController);

app.get('/', (req, res) => {
	res.send('Welcome to Jauntly');
});

//listener
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
