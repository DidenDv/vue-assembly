<template>
  <select
    class="languageSwitcher"
    name="language"
    @change="changeLanguage"
  >
    <option
      v-for="lang in supportedLanguages"
      :key="lang"
      :selected="isCurrentLanguage(lang)"
      :class="{ 'is-selected': isCurrentLanguage(lang) }"
      :value="lang"
    >
      {{lang}}
    </option>
  </select>
</template>
<script>
import TranslationsHelper from '@/plugins/Translation';

export default {
  computed: {
    supportedLanguages() {
      return TranslationsHelper.supportedLanguages;
    },
    currentLanguage() {
      return TranslationsHelper.currentLanguage;
    }
  },
  methods: {
    changeLanguage(e) {
      const lang = e.target.value;
      return TranslationsHelper.changeLanguage(lang);
    },
    isCurrentLanguage(lang) {
      return lang === this.currentLanguage;
    }
  }
};
</script>

<style>
  .languageSwitcher {
    margin-bottom: 1rem;
  }
</style>
