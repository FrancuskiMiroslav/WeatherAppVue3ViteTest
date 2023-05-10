<template>
    <div class="city-list">
        <h1 class="city-list-title">Saved Cities:</h1>
        <ul>
            <li v-for="search in savedCities" :key="search.location">
                <router-link :to="'/weather/' + search.location">
                    <base-button class="button" @click="selectSearch(search)">
                        {{ search.location }}, {{ search.country }}
                    </base-button>
                </router-link>
            </li>
        </ul>
    </div>
</template>
  
<script>
export default {
    name: "CityList",
    computed: {
        savedCities() {
            return JSON.parse(localStorage.getItem("savedCities")) || [];
        },
    },
    methods: {
        selectSearch(search) {
            this.$router.push(`/weather/${search.location}`);
        },
    },
};
</script>
  
<style scoped lang="scss">
.city-list {
    text-align: center;

    &-title {
        font-size: 32px;
    }

    ul {
        list-style: none;
        padding: 0;

        li {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin: 0.5rem 0;
        }
    }
}
</style>