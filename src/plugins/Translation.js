import axios from 'axios';
import { SUPPORTED_LANGUAGES, DEFAULT_LANGUAGE } from '@/constants/langs';
import i18n from '@/plugins/i18n';

const TranslationsHelper = {
  get defaultLanguage() {
    return DEFAULT_LANGUAGE;
  },
  get supportedLanguages() {
    return SUPPORTED_LANGUAGES;
  },
  get currentLanguage() {
    return i18n.locale;
  },
  set currentLanguage(lang) {
    i18n.locale = lang;
  },
  /**
   * Gets the first supported language that matches the user's
   * @return {String}
   */
  getUserSupportedLang() {
    const userPreferredLang = TranslationsHelper.getUserLang();

    // Check if user preferred browser lang is supported
    if (TranslationsHelper.isLangSupported(userPreferredLang.lang)) {
      return userPreferredLang.lang;
    }
    // Check if user preferred lang without the ISO is supported
    if (TranslationsHelper.isLangSupported(userPreferredLang.langNoISO)) {
      return userPreferredLang.langNoISO;
    }
    return TranslationsHelper.defaultLanguage;
  },
  /**
   * Returns the users preferred language
   */
  getUserLang() {
    const { navigator = {} } = window || {};
    const lang = navigator.language || navigator.userLanguage || TranslationsHelper.defaultLanguage;
    return {
      lang,
      langNoISO: lang.split('-')[0],
    };
  },
  /**
   * Sets the language to various services (axios, the html tag etc)
   * @param {String} lang
   * @return {String} lang
   */
  setI18nLanguageInServices(lang) {
    TranslationsHelper.currentLanguage = lang;
    axios.defaults.headers.common['Accept-Language'] = lang;
    document.querySelector('html').setAttribute('lang', lang);
    return lang;
  },
  /**
   * Loads new translation messages and changes the language when finished
   * @param lang
   * @return {Promise<any>}
   */
  changeLanguage(lang) {
    if (!TranslationsHelper.isLangSupported(lang)) return Promise.reject(new Error('Language not supported'));
    if (i18n.locale === lang) return Promise.resolve(lang); // has been loaded prior
    return TranslationsHelper.loadLanguageFile(lang).then((msgs) => {
      i18n.setLocaleMessage(lang, msgs.default || msgs);
      return TranslationsHelper.setI18nLanguageInServices(lang);
    });
  },
  /**
   * Async loads a translation file
   * @param lang
   * @return {Promise<*>|*}
   */
  loadLanguageFile(lang) {
    return import(/* webpackChunkName: "lang-[request]" */ `@/translations/${lang}.json`);
  },
  /**
   * Checks if a lang is supported
   * @param {String} lang
   * @return {boolean}
   */
  isLangSupported(lang) {
    return TranslationsHelper.supportedLanguages.includes(lang);
  },
  /**
   * Checks if the route's param is supported, if not, redirects to the first supported one.
   * @param {Route} to
   * @param {Route} from
   * @param {Function} next
   * @return {*}
   */
  routeMiddleware(to, from, next) {
    // Load async message files here
    const { lang = DEFAULT_LANGUAGE } = to.params; // TODO Get user preferred lang
    if (!TranslationsHelper.isLangSupported(lang)) {
      return next(TranslationsHelper.getUserSupportedLang());
    }
    return TranslationsHelper.changeLanguage(lang).then(() => next());
  },
  /**
   * Returns a new route object that has the current language already defined
   * To be used on pages and components, outside of the main \ route, like on Headers and Footers.
   * @example <router-link :to="$i18nRoute({ name: 'someRoute'})">Click Me </router-link>
   * @param {Object} to - route object to construct
   */
  i18nRoute(to) {
    return {
      ...to,
      params: { lang: this.currentLanguage, ...to.params },
    };
  },
};

export default TranslationsHelper;
