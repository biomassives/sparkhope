<template>
  <div>
    <header>
      <nav>
        <LanguageSwitcher />
        <!-- Other navigation items can go here -->
      </nav>
    </header>
    <Content />
  </div>
</template>

<script>
import LanguageSwitcher from './components/LanguageSwitcher.vue';

export default {
  components: {
    LanguageSwitcher,
  },
};
</script>

