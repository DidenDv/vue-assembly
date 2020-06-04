import VueI18n from 'vue-i18n';
import Vue from 'vue';
import { DEFAULT_LANGUAGE, FALLBACK_LANGUAGE } from '@/constants/langs';
// Import default locale only
import ru from '@/translations/ru.json';

Vue.use(VueI18n);

const i18n = new VueI18n({
  locale: DEFAULT_LANGUAGE, // set locale
  fallbackLocale: FALLBACK_LANGUAGE,
  messages: { ru } // set locale messages
});

export default i18n;
