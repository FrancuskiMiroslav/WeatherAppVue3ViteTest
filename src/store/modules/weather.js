const state = {
	location: '',
	country: '',
	temperature: 0,
	unit: '',
	description: '',
	clouds: 0,
	lat: 0,
	lon: 0,
	humidity: 0,
	windSpeed: 0,
	tempMax: 0,
	tempMin: 0,
	forecast: [],
};

const mutations = {
	setWeatherData(state, payload) {
		state.location = payload.location;
		state.country = payload.country;
		state.temperature = payload.temperature;
		state.unit = payload.unit;
		state.description = payload.description;
		state.weatherIcon = payload.weatherIcon;
		state.clouds = payload.clouds;
		state.lat = payload.lat;
		state.lon = payload.lon;
		state.humidity = payload.humidity;
		state.windSpeed = payload.windSpeed;
		state.tempMax = payload.tempMax;
		state.tempMin = payload.tempMin;
		state.forecast = payload.forecast;
	},

	setForecastData(state, payload) {
		state.forecast = payload;
	},
};

const actions = {
	async fetchWeatherData({ commit }, location) {
		const apiKey = import.meta.env.VITE_OPENWEATHERMAP_SECRET_KEY;
		const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`;

		try {
			const response = await fetch(url);

			if (!response.ok) {
				throw new Error('Failed to fetch weather data');
			}
			const data = await response.json();

			if (!data || !data.name) {
				throw new Error('Invalid response data');
			}

			const locationName = `${data.name}`;
			const temperature = Math.round(data.main.temp - 273.15);
			const unit = 'C';
			const description = data.weather[0].description;
			const weatherIcon = data.weather[0].icon;
			const clouds = data.clouds;
			const country = data.sys.country;
			const lat = data.coord.lat;
			const lon = data.coord.lon;
			const humidity = data.main.humidity;
			const windSpeed = data.wind.speed;
			const tempMax = Math.round(data.main.temp_max - 273.15);
			const tempMin = Math.round(data.main.temp_min - 273.15);

			commit('setWeatherData', {
				location: locationName,
				temperature: temperature,
				unit: unit,
				description: description,
				weatherIcon: weatherIcon,
				clouds: clouds,
				country: country,
				lat: lat,
				lon: lon,
				humidity: humidity,
				windSpeed: windSpeed,
				tempMax: tempMax,
				tempMin: tempMin,
			});

			return data;
		} catch (error) {
			console.log(error);
			return null;
		}
	},

	async fetchForecastData({ commit }, location) {
		if (!location) {
			return;
		}

		try {
			const apiKey = import.meta.env.VITE_OPENWEATHERMAP_SECRET_KEY;
			const url = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${apiKey}`;
			const response = await fetch(url);
			if (!response.ok) {
				throw new Error('Failed to fetch forecast data');
			}
			const data = await response.json();

			if (!data || !data.list) {
				throw new Error('Invalid response data');
			}

			const forecast = data.list.reduce((groupedData, item) => {
				const datetime = item.dt_txt;
				const date = datetime.slice(0, 10);
				const temperature = Math.round(item.main.temp - 273.15);
				const unit = 'C';
				const description = item.weather[0].description;
				const weatherIcon = item.weather[0].icon;
				const clouds = item.clouds;
				const country = item.sys.country;
				const humidity = item.main.humidity;
				const windSpeed = item.wind.speed;
				const tempMax = Math.round(item.main.temp_max - 273.15);
				const tempMin = Math.round(item.main.temp_min - 273.15);

				if (!groupedData[date]) {
					groupedData[date] = [];
				}

				groupedData[date].push({
					datetime: datetime,
					temperature: temperature,
					unit: unit,
					description: description,
					weatherIcon: weatherIcon,
					clouds: clouds,
					country: country,
					humidity: humidity,
					windSpeed: windSpeed,
					tempMax: tempMax,
					tempMin: tempMin,
				});

				return groupedData;
			}, {});

			commit('setForecastData', forecast);

			return data;
		} catch (error) {
			console.log(error);
			return null;
		}
	},
};

export default {
	namespaced: true,
	state,
	mutations,
	actions,
};
