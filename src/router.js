import { createRouter, createWebHistory } from 'vue-router';
import { isValidLocation } from '@/utils';
import store from './store/index.js';

import NotFound from './pages/NotFound.vue';

const SearchForm = () => import('./components/SearchForm.vue');
const CityList = () => import('./components/CityList.vue');
const WeatherViewer = () => import('./components/WeatherViewer.vue');

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{ path: '/', redirect: '/weather', component: SearchForm }, // baseRoute
		{
			path: '/weather',
			name: 'Weather',
			component: SearchForm,
			meta: { canonicalUrl: 'https://weatherAppTest.netlify.app/Home' },
		},
		{
			path: '/weather/:location',
			name: 'WeatherViewer',
			component: WeatherViewer,
			props: true,
			meta: {
				canonicalUrl(to) {
					const canonicalUrl = `https://weatherAppTest.netlify.app/weather/${to.params.location.replaceAll(' ', '')}`;
					return canonicalUrl;
				},
			},
			beforeEnter: async (to, from, next) => {
				let location = to.params.location;
				let response = await store.dispatch('weather/fetchWeatherData', location);

				if (response && isValidLocation(location, response.name) && response.name !== null) {
					next();
				} else {
					next({ name: 'NotFound', params: { notFound: 'not-found' } });
				}
			},
		},
		{ path: '/cities', component: CityList, meta: { canonicalUrl: 'https://weatherAppTest.netlify.app/cities' } },
		{
			path: '/:notFound(.*)',
			name: 'NotFound',
			component: NotFound,
			meta: {
				canonicalUrl: 'https://weatherAppTest.netlify.app/not-found',
			},
			props: { notFound: `404` },
		}, // not found route
	],
});

router.beforeEach((to, from, next) => {
	const meta = to.meta || {};
	const canonicalUrl =
		typeof meta.canonicalUrl === 'function'
			? meta.canonicalUrl(to)
			: meta.canonicalUrl || 'https://ordinacijabistrica.netlify.app/';
	document.querySelector('link[rel="canonical"]').setAttribute('href', canonicalUrl);
	next();
});

export default router;
