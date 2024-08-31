<script>
export default {
  data() {
    return {}
  },

  computed: {},
  methods: {},
  mounted() {}
}
</script>

<template>
  <nav class="navbar navbar-expand-lg sticky-sm-top">
    <div class="container-sm flex-nowrap justify-content-center">
      <router-link :to="{ name: 'home' }" class="nav-link navbar-brand" aria-current="page">
        <div class="d-flex align-items-center">
          <img src="../assets/icon.svg" alt="logo" class="logo" />
          <h3 class="">TravelNotes</h3>
        </div></router-link
      >
    </div>
  </nav>
</template>

<style lang="scss" scoped>
@use '../style/partials/mixins' as *;
@use '../style/partials/variables' as *;

.navbar {
  height: $headerHeight;
  background-color: $shade3;
  .nav-link {
    padding: 0 5px;
  }
}
.logo {
  height: 50px;
  margin-right: 10px;
  filter: brightness(100);
}

h3 {
  font-size: 2rem;
  margin-left: 10px;
  font-family: 'Oleo Script', system-ui;
  color: white;
  margin: 0;
}

.active {
  // color: $tertiary !important;
  box-shadow: inset 0 -7px 0;
}

ul {
  width: 100%;
  li {
    font-size: 1.2rem;
    margin-right: 30px;
    line-height: $headerHeight;
  }
}
</style>

<!-- <ul class="navbar-nav d-flex align-items-center flex-nowrap flex-row">
  <li class="nav-item">
    <router-link
      :to="{ name: 'home' }"
      class="nav-link"
      aria-current="page"
      exact-active-class="active"
      >Home</router-link
    >
  </li>
  <li class="nav-item">
    <router-link
      :to="{ name: 'trip.create' }"
      class="nav-link"
      aria-current="page"
      exact-active-class="active"
      >Aggiungi viaggio</router-link
    >
  </li>
</ul> -->
