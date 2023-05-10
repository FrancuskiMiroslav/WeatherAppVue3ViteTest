import { createApp } from 'vue';
import App from './App.vue';
import router from './router.js';
import store from './store/index.js';
import BaseButton from './components/ui/BaseButton.vue';
import BaseCard from './components/ui/BaseCard.vue';

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faTwitter, faInstagram, faLinkedin, faYoutube } from '@fortawesome/free-brands-svg-icons';

import './assets/scss/main.scss';

const app = createApp(App);

/* add icons to the library */
library.add(fas);
app.component('font-awesome-icon', FontAwesomeIcon);

app.use(router);
app.use(store);

app.component('base-card', BaseCard);
app.component('base-button', BaseButton);

router.isReady().then(() => {
	app.mount('#app');
});
