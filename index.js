const api = require('./api.json');
const axios = require('axios');

const getWeather = async location => {
	const city = location || 'Tunisia';
	const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${
		api.key
	}`;

	try {
		const response = await axios.get(url);

		if (response.status === 200) {
			try {
				if (response.data.name) {
					return response.data;
				} else {
					const queryError = new Error(`The location ${city} was not found`);
					printError(queryError);
				}
			} catch (error) {
				printError(error);
			}
		} else {
			const statusCodeError = new Error(
				`There was an error getting the message for ${city}(StatusCode ${
					response.status
				})`
			);
			printError(statusCodeError);
		}
	} catch (error) {
		printError(error);
	}
};

if (require.main == module) {
    // this module was run directly from the command line as in node xxx.js
	const argument = process.argv.slice(3).join(' ');

	getWeather(argument).then(val => {
		printWeather(val);
	});
}

function printWeather(weather) {
	let message = `Current Temperature in ${weather.name} is ${
		weather.main.temp
	}°C`;

	console.log(message);
}

function printError(error) {
	console.error(error.message);
}

module.exports = {
	getWeather,
	printWeather
};

// to run this code , write : node index.js getWeather france ( or any name of city)