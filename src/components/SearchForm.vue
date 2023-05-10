<template>
    <div class="section-wrapper">
        <div class="container">
            <div class="search-form">
                <div class="input-wrapper">
                    <font-awesome-icon class="input-icon search" :icon="['fas', 'magnifying-glass']" />
                    <input v-model="location" type="text" placeholder="Search for a city..." @keydown.enter="searchWeather">
                    <font-awesome-icon class="input-icon location" :icon="['fas', 'location-crosshairs']"
                        @click="searchWeather" />
                </div>

                <city-list></city-list>

            </div>
        </div>

        <weather-viewer v-if="!isFetching && weather" v-bind:weather="weather" v-cloak></weather-viewer>
    </div>
</template>
  
<script>
import CityList from './CityList.vue';
import WeatherViewer from './WeatherViewer.vue';

export default {
    name: 'SearchForm',
    data() {
        return {
            location: '',
            apiKey: import.meta.env.VITE_OPENWEATHERMAP_SECRET_KEY,
            urlBase: 'https://api.openweathermap.org/data/2.5/',
            weather: {},
            isFetching: true,
        };
    },
    components: {
        CityList,
        WeatherViewer
    },

    methods: {
        async searchWeather() {
            // Check if location field is empty
            if (this.location.trim() === '') {
                return;
            }

            // Dispatch action to fetch weather data
            await this.$store.dispatch('weather/fetchWeatherData', this.location);
            const data = this.$store.state.weather;

            if (data.location && this.location.toLowerCase() === data.location.toLowerCase()) {
                // Redirect to WeatherViewer route if location is found and location does not match the input
                const location = data.location;
                this.$router.push({
                    name: 'WeatherViewer',
                    params: {
                        location: location,
                    },
                });
            } else {
                // Show error message if no results are found
                console.log('Error: Location not found');
            }
        },

        fetchWeaterData() {
            navigator.geolocation.getCurrentPosition((success, error) => {
                let { latitude, longitude } = success.coords

                fetch(`${this.urlBase}/weather?lat=${latitude}&lon=${longitude}&appid=${this.apiKey}&units=metric`)
                    .then((resp) => {
                        if (!resp.ok) {
                            throw new Error(`${resp.statusText} - ${resp.url}`);
                        }
                        return resp.json();
                    })
                    .then(this.populateWeaterResults)
                    .catch((err) => console.log(`-- ${err} on getting API call --`));
            })
        },

        populateWeaterResults(results) {
            this.weather = results
            this.isFetching = false

        },
    },

    mounted() {
        this.fetchWeaterData()
    },
};
</script>
  
<style scoped lang="scss">
.input-wrapper {
    position: relative;
    display: inline-block;
    width: 100%;
    margin-bottom: 20px;
}

.input-icon {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    color: #999;
    font-size: 16px;
    margin-left: 10px;
    margin-right: 10px;

    &.location {
        right: 0;
        cursor: pointer;
        transition: 0.5s all ease;

        &:hover {
            color: #000000;
        }
    }
}

input {
    border: none;
    border-bottom: 1px solid #999;
    padding: 10px 40px;
    width: 100%;
    font-size: 16px;
    border-radius: 3px;
    height: 60px;
    line-height: 60px;

}
</style>
  