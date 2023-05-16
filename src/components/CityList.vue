<template>
    <div class="city-list">
        <h1 class="city-list-title">Saved Cities:</h1>
        <ul>
            <li v-for="(search, searchIndex) in savedSearches" :key="search.location">
                <font-awesome-icon :icon="['fas', 'trash']" class="input-icon delete-search"
                    @click="deleteSearch(searchIndex)" />
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
    data() {
        return {
            savedSearches: [],
        };
    },
    computed: {
        savedCities() {
            return JSON.parse(localStorage.getItem("savedCities")) || [];
        },
    },
    mounted() {
        this.savedSearches = this.savedCities;
    },
    methods: {
        selectSearch(search) {
            this.$router.push(`/weather/${search.location}`);
        },
        deleteSearch(searchIndex) {
            const savedCities = JSON.parse(localStorage.getItem("savedCities")) || [];

            savedCities.splice(searchIndex, 1);

            localStorage.setItem("savedCities", JSON.stringify(savedCities));

            this.savedSearches = [...savedCities];
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
            justify-content: center;
            align-items: center;
            margin: 0.5rem 0;
            position: relative;


            .button {
                position: relative;
            }

            .delete-search {
                cursor: pointer;
                right: 0;
                top: 0;
            }
        }
    }
}
</style>