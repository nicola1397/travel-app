<script>
export default {
  data() {
    return {}
  },
  emits: ['deleteTrip'],
  props: { trip: Object, index: Number },
  methods: {}
}
</script>

<template>
  <div class="myCard p-2">
    <router-link :to="{ name: 'trip.show', params: { index: index } }" class="router-link">
      <div class="coverImage">
        <img
          v-if="trip.image"
          :src="trip.image"
          alt="Immagine vacanza"
          width="300px"
          max-heigth="150px"
        />
        <img
          v-else
          src="https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg?w=900"
          alt="Immagine vacanza"
          width="300px"
          max-heigth="150px"
        />
      </div>
      <div class="tripDetails">
        <h3 class="detailCap">{{ trip.name }}</h3>
        <h5>
          🟢 <span>{{ trip.start_date }}</span>
        </h5>
        <h5>
          🔴 <span>{{ trip.end_date }}</span>
        </h5>
      </div>
    </router-link>
    <div>
      <button type="button" class="btn btn-danger ms-1" @click="this.$emit('deleteTrip', index)">
        <i class="bi bi-trash-fill"></i>
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '../style/partials/mixins' as *;
@use '../style/partials/variables' as *;

a {
  color: white;
}

.myCard {
  position: relative;
  background-color: rgba(59, 78, 66, 0.7);
  height: 100%;
  z-index: 2;
  color: white;
  border-radius: 5px;
  border: 1px solid $shade5;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: center;
  // overflow: hidden;
  // white-space: nowrap;

  .restaurantDetails {
    padding: 0px 15px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    flex-grow: 1;
  }
  &:hover {
    box-shadow: 0 0 7px black;
    transform: scale(1.02);
    transition: all 0.1s ease-in-out 0.1s;
  }

  .coverImage {
    width: 100%;
    overflow: hidden;
    margin-bottom: 15px;
    aspect-ratio: 16 / 9;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      width: 100%;
      height: auto;
    }
  }
}

h3.detailCap {
  font-size: 30px;
  font-weight: 800;
}
.detailCap {
  text-transform: capitalize;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: block;
  width: 100%;
}

.router-link {
  text-decoration: none;
}

.rightColumn {
  padding: 0;
  // height: calc(100vh - $headerHeight - $footerHeight);
  overflow: auto;
  // background-color: $primary;
  display: flex;
  justify-content: start;
  flex-wrap: wrap;
  align-content: flex-start;
}

.detailCap {
  text-transform: capitalize;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: block;
  width: 100%;
}
</style>
