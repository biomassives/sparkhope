<template>
  <div>
    <select @change="changeLanguage" v-model="currentLang">
      <option v-for="(lang, index) in languages" :key="index" :value="lang.path">
        {{ lang.name }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentLang: this.$localePath,
      languages: [
        { name: 'English', path: '/' },
        { name: 'Español', path: '/nl/' },
        { name: 'Français', path: '/ar/' },
      ],
    };
  },
  methods: {
    changeLanguage() {
      // Change the language and navigate to the corresponding path
      this.$router.push(this.currentLang);
      // Optionally, you can also refresh the page to ensure all content is loaded
       window.location.reload();
    },
  },
};
</script>

