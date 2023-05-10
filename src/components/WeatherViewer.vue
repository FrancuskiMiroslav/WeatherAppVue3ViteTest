<template>
    <div class="container">
        <div class="weather-viewer">
            <base-card v-if="weather" class="browser-location">
                <div class="card-title">
                    <h1>{{ weather.name }}, {{ weather.sys.country }}, your location right now</h1>
                    <p>{{ today }}</p>
                </div>
                <div class="card-content">
                    <div class="current-weather">
                        <div class="current-weather-left">
                            <div class="current-weather-left-image-wrapper">
                                <img :src="`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`"
                                    alt="weather icon">
                            </div>
                            <div class="current-weather-left-content-wrapper">
                                <p>{{ Math.round(weather.main.temp) }} &deg;</p>
                                <span>{{ description }}</span>
                            </div>
                        </div>

                        <div class="current-weather-right">
                            <ul class="current-weather-right-list">
                                <li class="current-weather-right-list-item">
                                    {{ Math.round(weather.main.temp_max) }} &deg; <span>High</span>
                                </li>
                                <li class="current-weather-right-list-item">
                                    {{ Math.round(weather.main.temp_min) }} &deg; <span>low</span>
                                </li>
                                <li class="current-weather-right-list-item">
                                    {{ weather.wind.speed }} m/s <span>Wind</span>
                                </li>
                                <li class="current-weather-right-list-item">
                                    {{ weather.main.humidity }} % <span>Humidity</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </base-card>

            <base-card v-else>
                <div class="card-title">
                    <h1>{{ location }}, {{ country }}</h1>
                    <p>{{ today }}</p>
                </div>
                <div class="card-content">
                    <div class="current-weather">
                        <div class="current-weather-left">
                            <div class="current-weather-left-image-wrapper">
                                <img :src="`https://openweathermap.org/img/wn/${weatherIcon}@2x.png`" alt="weather icon">
                            </div>
                            <div class="current-weather-left-content-wrapper">
                                <p>{{ temperature }} &deg;{{ unit }}</p>
                                <span>{{ description }}</span>
                            </div>
                        </div>

                        <div class="current-weather-right">
                            <ul class="current-weather-right-list">
                                <li class="current-weather-right-list-item">
                                    {{ tempMax }} &deg;{{ unit }} <span>High</span>
                                </li>
                                <li class="current-weather-right-list-item">
                                    {{ tempMin }} &deg;{{ unit }} <span>low</span>
                                </li>
                                <li class="current-weather-right-list-item">
                                    {{ windSpeed }} m/s <span>Wind</span>
                                </li>
                                <li class="current-weather-right-list-item">
                                    {{ humidity }} % <span>Humidity</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <base-button class="button-secondary" @click="saveLocation">Save Location</base-button>

                <div v-if="forecastToday" class="forecast-data-today">
                    <h2>Today's weather</h2>
                    <ul class="forecast-list-today">
                        <li class="forecast-list-item-today" v-for="item in Object.values(forecastToday)[0]" :key="item">
                            <div>{{ formattedTime(item.datetime) }}</div>
                            <div> <img :src="`https://openweathermap.org/img/wn/${item.weatherIcon}@2x.png`"
                                    alt="weather icon">
                            </div>
                            <div>{{ item.temperature }}&deg;</div>
                        </li>


                    </ul>

                    <ul class="forecast-list-next-days">
                        <h2>Next 3 days</h2>
                        <li class="forecast-list-item-next-days">
                            <div class="forecast-list-item-next-days-date">
                                <p>
                                    {{ formattedFirstDay }}
                                    <span>
                                        {{ formattedFirstDate }}
                                    </span>
                                </p>
                            </div>
                            <div>
                                <img :src="`https://openweathermap.org/img/wn/${forecastValuesExceptFirst[0][0].weatherIcon}@2x.png`"
                                    alt="weather icon">
                            </div>
                            <p>
                                {{ forecastValuesExceptFirst[0][0].tempMax }}&deg;
                                <span>
                                    High
                                </span>
                            </p>

                            <p>
                                {{ forecastValuesExceptFirst[0][0].tempMin }}&deg;
                                <span>
                                    Low
                                </span>
                            </p>
                            <p>
                                {{ Math.round(forecastValuesExceptFirst[0][0].windSpeed) }}
                                <span>
                                    m/s
                                </span>
                            </p>

                            <p>
                                {{ forecastValuesExceptFirst[0][0].humidity }}
                                <span>
                                    %
                                </span>
                            </p>
                        </li>
                        <li class="forecast-list-item-next-days">
                            <div class="forecast-list-item-next-days-date">
                                <p>{{ formattedSecondDay }}
                                    <span>
                                        {{ formattedSecondDate }}
                                    </span>
                                </p>
                            </div>
                            <div> <img
                                    :src="`https://openweathermap.org/img/wn/${forecastValuesExceptFirst[1][0].weatherIcon}@2x.png`"
                                    alt="weather icon">
                            </div>
                            <p>
                                {{ forecastValuesExceptFirst[1][0].tempMax }}&deg;
                                <span>
                                    High
                                </span>
                            </p>

                            <p>
                                {{ forecastValuesExceptFirst[1][0].tempMin }}&deg;
                                <span>
                                    Low
                                </span>
                            </p>

                            <p>
                                {{ Math.round(forecastValuesExceptFirst[1][0].windSpeed) }}
                                <span>
                                    m/s
                                </span>
                            </p>

                            <p>
                                {{ forecastValuesExceptFirst[1][0].humidity }}
                                <span>
                                    %
                                </span>
                            </p>
                        </li>

                        <li class="forecast-list-item-next-days">
                            <div class="forecast-list-item-next-days-date">
                                <p>{{ formattedThirdDay }}
                                    <span>
                                        {{ formattedThirdDate }}
                                    </span>
                                </p>
                            </div>
                            <div> <img
                                    :src="`https://openweathermap.org/img/wn/${forecastValuesExceptFirst[2][0].weatherIcon}@2x.png`"
                                    alt="weather icon">
                            </div>
                            <p>
                                {{ forecastValuesExceptFirst[2][0].tempMax }}&deg;
                                <span>
                                    High
                                </span>
                            </p>

                            <p>
                                {{ forecastValuesExceptFirst[2][0].tempMin }}&deg;
                                <span>
                                    Low
                                </span>
                            </p>

                            <p>
                                {{ Math.round(forecastValuesExceptFirst[2][0].windSpeed) }}
                                <span>
                                    m/s
                                </span>
                            </p>

                            <p>
                                {{ forecastValuesExceptFirst[2][0].humidity }}
                                <span>
                                    %
                                </span>
                            </p>
                        </li>
                    </ul>
                </div>
            </base-card>
        </div>
    </div>
</template>
  
<script>
export default {
    name: "WeatherViewer",

    props: {
        weather: {
            type: Object,
        }
    },

    data() {
        return {
            forecastMockDataToday: {
                "cod": "200",
                "message": 0,
                "cnt": 40,
                "list": [
                    {
                        "dt": 1661871600,
                        "main": {
                            "temp": 296.76,
                            "feels_like": 296.98,
                            "temp_min": 296.76,
                            "temp_max": 297.87,
                            "pressure": 1015,
                            "sea_level": 1015,
                            "grnd_level": 933,
                            "humidity": 69,
                            "temp_kf": -1.11
                        },
                        "weather": [
                            {
                                "id": 500,
                                "main": "Rain",
                                "description": "light rain",
                                "icon": "10d"
                            }
                        ],
                        "clouds": {
                            "all": 100
                        },
                        "wind": {
                            "speed": 0.62,
                            "deg": 349,
                            "gust": 1.18
                        },
                        "visibility": 10000,
                        "pop": 0.32,
                        "rain": {
                            "3h": 0.26
                        },
                        "sys": {
                            "pod": "d"
                        },
                        "dt_txt": "2022-08-30 09:00:00"
                    },
                    {
                        "dt": 1661871600,
                        "main": {
                            "temp": 296.76,
                            "feels_like": 296.98,
                            "temp_min": 296.76,
                            "temp_max": 297.87,
                            "pressure": 1015,
                            "sea_level": 1015,
                            "grnd_level": 933,
                            "humidity": 69,
                            "temp_kf": -1.11
                        },
                        "weather": [
                            {
                                "id": 500,
                                "main": "Rain",
                                "description": "light rain",
                                "icon": "10d"
                            }
                        ],
                        "clouds": {
                            "all": 100
                        },
                        "wind": {
                            "speed": 0.62,
                            "deg": 349,
                            "gust": 1.18
                        },
                        "visibility": 10000,
                        "pop": 0.32,
                        "rain": {
                            "3h": 0.26
                        },
                        "sys": {
                            "pod": "d"
                        },
                        "dt_txt": "2022-08-30 12:00:00"
                    },
                    {
                        "dt": 1661871600,
                        "main": {
                            "temp": 296.76,
                            "feels_like": 296.98,
                            "temp_min": 296.76,
                            "temp_max": 297.87,
                            "pressure": 1015,
                            "sea_level": 1015,
                            "grnd_level": 933,
                            "humidity": 69,
                            "temp_kf": -1.11
                        },
                        "weather": [
                            {
                                "id": 500,
                                "main": "Rain",
                                "description": "light rain",
                                "icon": "10d"
                            }
                        ],
                        "clouds": {
                            "all": 100
                        },
                        "wind": {
                            "speed": 0.62,
                            "deg": 349,
                            "gust": 1.18
                        },
                        "visibility": 10000,
                        "pop": 0.32,
                        "rain": {
                            "3h": 0.26
                        },
                        "sys": {
                            "pod": "d"
                        },
                        "dt_txt": "2022-08-30 15:00:00"
                    },
                    {
                        "dt": 1661882400,
                        "main": {
                            "temp": 295.45,
                            "feels_like": 295.59,
                            "temp_min": 292.84,
                            "temp_max": 295.45,
                            "pressure": 1015,
                            "sea_level": 1015,
                            "grnd_level": 931,
                            "humidity": 71,
                            "temp_kf": 2.61
                        },
                        "weather": [
                            {
                                "id": 500,
                                "main": "Rain",
                                "description": "light rain",
                                "icon": "10n"
                            }
                        ],
                        "clouds": {
                            "all": 96
                        },
                        "wind": {
                            "speed": 1.97,
                            "deg": 157,
                            "gust": 3.39
                        },
                        "visibility": 10000,
                        "pop": 0.33,
                        "rain": {
                            "3h": 0.57
                        },
                        "sys": {
                            "pod": "n"
                        },
                        "dt_txt": "2022-08-30 18:00:00"
                    },
                    {
                        "dt": 1661893200,
                        "main": {
                            "temp": 292.46,
                            "feels_like": 292.54,
                            "temp_min": 290.31,
                            "temp_max": 292.46,
                            "pressure": 1015,
                            "sea_level": 1015,
                            "grnd_level": 931,
                            "humidity": 80,
                            "temp_kf": 2.15
                        },
                        "weather": [
                            {
                                "id": 500,
                                "main": "Rain",
                                "description": "light rain",
                                "icon": "10n"
                            }
                        ],
                        "clouds": {
                            "all": 68
                        },
                        "wind": {
                            "speed": 2.66,
                            "deg": 210,
                            "gust": 3.58
                        },
                        "visibility": 10000,
                        "pop": 0.7,
                        "rain": {
                            "3h": 0.49
                        },
                        "sys": {
                            "pod": "n"
                        },
                        "dt_txt": "2022-08-30 21:00:00"
                    },

                    {
                        "dt": 1662292800,
                        "main": {
                            "temp": 294.93,
                            "feels_like": 294.83,
                            "temp_min": 294.93,
                            "temp_max": 294.93,
                            "pressure": 1018,
                            "sea_level": 1018,
                            "grnd_level": 935,
                            "humidity": 64,
                            "temp_kf": 0
                        },
                        "weather": [
                            {
                                "id": 804,
                                "main": "Clouds",
                                "description": "overcast clouds",
                                "icon": "04d"
                            }
                        ],
                        "clouds": {
                            "all": 88
                        },
                        "wind": {
                            "speed": 1.14,
                            "deg": 17,
                            "gust": 1.57
                        },
                        "visibility": 10000,
                        "pop": 0,
                        "sys": {
                            "pod": "d"
                        },
                        "dt_txt": "2022-09-04 12:00:00"
                    }
                ],
                "city": {
                    "id": 3163858,
                    "name": "Zocca",
                    "coord": {
                        "lat": 44.34,
                        "lon": 10.99
                    },
                    "country": "IT",
                    "population": 4593,
                    "timezone": 7200,
                    "sunrise": 1661834187,
                    "sunset": 1661882248
                }
            }
        }
    },
    computed: {
        formattedFirstDay() {
            const firstDay = this.forecastValuesExceptFirst[0][0].datetime;
            const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
            const date = new Date(firstDay);
            const dayOfWeek = weekdays[date.getDay()];
            return dayOfWeek;
        },

        formattedFirstDate() {
            const date = new Date(this.forecastValuesExceptFirst[0][0].datetime);
            const day = date.getDate().toString().padStart(2, '0');
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            return `${day}/${month}`;
        },

        formattedSecondDay() {
            const firstDay = this.forecastValuesExceptFirst[1][0].datetime;
            const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
            const date = new Date(firstDay);
            const dayOfWeek = weekdays[date.getDay()];
            return dayOfWeek;
        },

        formattedSecondDate() {
            const date = new Date(this.forecastValuesExceptFirst[1][0].datetime);
            const day = date.getDate().toString().padStart(2, '0');
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            return `${day}/${month}`;
        },

        formattedThirdDay() {
            const firstDay = this.forecastValuesExceptFirst[2][0].datetime;
            const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
            const date = new Date(firstDay);
            const dayOfWeek = weekdays[date.getDay()];
            return dayOfWeek;
        },

        formattedThirdDate() {
            const date = new Date(this.forecastValuesExceptFirst[2][0].datetime);
            const day = date.getDate().toString().padStart(2, '0');
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            return `${day}/${month}`;
        },

        forecastToday() {
            const forecastObject = this.$store.state.weather.forecast;
            return forecastObject
        },

        forecastValuesExceptFirst() {
            const forecastValues = Object.values(this.forecastToday);
            return forecastValues.slice(1);
        },

        location() {
            return this.$store.state.weather.location;
        },
        temperature() {
            return this.$store.state.weather.temperature;
        },
        unit() {
            return this.$store.state.weather.unit;
        },
        description() {
            return this.$store.state.weather.description;
        },
        clouds() {
            return this.$store.state.weather.clouds.all;
        },
        country() {
            return this.$store.state.weather.country;
        },
        lat() {
            return this.$store.state.weather.lat;
        },
        lon() {
            return this.$store.state.weather.lon;
        },
        humidity() {
            return this.$store.state.weather.humidity;
        },
        windSpeed() {
            return this.$store.state.weather.windSpeed;
        },
        tempMax() {
            return this.$store.state.weather.tempMax;
        },
        tempMin() {
            return this.$store.state.weather.tempMin;
        },
        weatherIcon() {
            return this.$store.state.weather.weatherIcon;
        },
        today() {
            const dateOptions = {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            };
            const today = new Date();
            return today.toLocaleDateString(undefined, dateOptions);
        },
        formattedTime() {
            return (dateString) => {
                const date = new Date(dateString);
                const hours = date.getHours();
                const minutes = date.getMinutes().toString().padStart(2, '0');
                const ampm = hours >= 12 ? 'pm' : 'am';
                const formattedHours = hours % 12 === 0 ? '12' : (hours % 12).toString();
                return `${formattedHours}:${minutes} ${ampm}`;
            };
        },
    },

    methods: {
        saveLocation() {
            const savedCities = JSON.parse(localStorage.getItem("savedCities")) || [];
            const location = this.$store.state.weather.location;
            const temperature = this.$store.state.weather.temperature;
            const unit = this.$store.state.weather.unit;
            const description = this.$store.state.weather.description;
            const clouds = this.$store.state.weather.clouds.all;
            const country = this.$store.state.weather.country;
            const lat = this.$store.state.weather.lat;
            const lon = this.$store.state.weather.lon;
            const humidity = this.$store.state.weather.humidity;
            const windSpeed = this.$store.state.weather.windSpeed;
            const tempMax = this.$store.state.weather.tempMax;
            const tempMin = this.$store.state.weather.tempMin;
            const weatherIcon = this.$store.state.weather.weatherIcon;
            const forecast = this.$store.state.weather.forecast;

            const cityData = { location, temperature, unit, description, clouds, country, lat, lon, humidity, windSpeed, tempMax, tempMin, weatherIcon, forecast };

            if (!savedCities.some(city => city.location === location)) {
                savedCities.push(cityData);
                localStorage.setItem("savedCities", JSON.stringify(savedCities));
            }
            this.$router.push("/");
        },
    },

    mounted() {
        this.$nextTick(() => {
            this.$store.dispatch('weather/fetchForecastData', this.location)
        });
    }
};
</script>
  
<style scoped lang="scss">
.card {
    min-height: 100vh;
    min-height: 100svh;
    border-radius: 3px;
}

.card {
    padding: 10px;

    &.browser-location {
        min-height: fit-content;
    }

    &-title {
        h1 {
            @include breakpoint-max(600) {
                font-size: 20px;
            }
        }

        p {
            @include breakpoint-max(600) {
                font-size: 14px !important;
            }
        }
    }
}

.weather-viewer {
    position: relative;

    .button-secondary {
        position: absolute;
        right: 0;
        top: 0;

        @include breakpoint-max(600) {
            font-size: 14px !important;
        }
    }

    .current-weather {
        display: flex;

        @include breakpoint-max(800) {
            flex-direction: column;
        }

        &>div {
            flex-grow: 1;
            flex-basis: 1;
            padding: 20px;
        }

        &-left {
            display: flex;
            justify-content: space-between;
            border-right: 1px solid #dddddd;

            @include breakpoint-max(800) {
                border-right: none;
                border-bottom: 1px solid #dddddd;
            }

            &-content-wrapper {
                p {
                    font-size: 50px !important
                }

                span {
                    font-size: 24px;
                    text-transform: capitalize;
                }
            }
        }

        &-right {
            &-list {
                display: flex;
                justify-content: space-between;
                align-items: center;
                flex-wrap: wrap;
                gap: 40px;

                &-item {
                    text-align: center;
                    font-size: 22px;

                    span {
                        display: block;
                        color: #CDCDCD;
                        font-weight: 400;
                        font-size: 18px;
                    }
                }
            }
        }
    }

    .forecast-data-today {
        h2 {
            margin-bottom: 20px;
        }
    }

    .forecast-list-today {
        display: flex;
        justify-content: center;
        gap: 20px;
        flex-wrap: wrap;
        margin-bottom: 20px;

        .forecast-list-item-today {
            background-color: rgba($color: #000000, $alpha: 0.3);
            border-radius: 3px;
            padding: 10px;
            text-align: center;
            min-width: 100px;
        }
    }

    .forecast-list-item-next-days {
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        background-color: rgba($color: #000000, $alpha: 0.3);
        gap: 20px;
        margin-bottom: 20px;
        border-radius: 3px;
        padding: 10px;
        flex-wrap: wrap;

        &>* {
            flex: 1;
            flex-basis: 0;
            min-width: 100px;
        }

        img {
            margin: 0 auto;
        }

        p {
            display: block;
            font-size: 22px;
            font-weight: 700;

            span {
                color: #CDCDCD;
                display: block;
                font-weight: 400;
            }
        }
    }
}
</style>