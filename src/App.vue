<script>
import { RouterLink, RouterView } from 'vue-router'
import Header from './components/Header.vue'
export default {
  data() {
    return {
      images: [`url('@assets/jungle.jpg')`, `url('@assets/castle.jpg')`, `url('@assets/sea.jpg')`],
      currentIndex: 0
    }
  },
  methods: {
    changeBackground() {
      console.log('BACKGROUND')
      const background = document.getElementById('appBackground')
      background.style.setProperty('--background-image', this.images[this.currentIndex])
      this.currentIndex = (this.currentIndex + 1) % this.images.length
    }
  },

  components: {
    Header
  },
  mounted() {
    this.changeBackground()
    setInterval(this.changeBackground, 15000)
  }
}
</script>

<template>
  <Header> </Header>
  <RouterView />
</template>

<style lang="scss">
@use './style/general.scss';
#appBackground {
  position: fixed;
  top: 0;
  left: 0;
  background-size: cover;
  height: 100vh;
  width: 100vw;
  --background-image: url('src/assets/castle.jpg');
}
#appBackground::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  background-image: var(--background-image);
  filter: brightness(0.6);
  z-index: -1;
  transition: background-image 0.5s ease-in-out;
}
</style>
