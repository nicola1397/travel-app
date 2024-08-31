<template>
  <div class="container-sm">
    <template v-if="myTrips.length > 0">
      <div class="row">
        <div class="col-12 d-flex flex-wrap">
          <div class="tripCard p-2 col-xs-12 col-md-6 col-lg-4" v-for="(trip, index) in myTrips">
            <Card :trip="trip" :index="index" @deleteTrip="handleDelete" class="" />
          </div>
          <!-- <div class="col-xs-12 col-md-6 col-lg-4 d-flex justify-content-center align-items-center">
            <button class="btn btn-warning" id="addTrip">
              <i class="bi bi-calendar-plus"></i>
            </button>
          </div> -->
        </div>
      </div>
    </template>
    <template v-else>
      <div class="d-flex align-items-center">
        <h1>Nessuna vacanza programmata</h1>
      </div>
    </template>
  </div>
</template>

<script>
import Card from '../components/Card.vue'

export default {
  data() {
    return {
      myTrips: []
    }
  },
  components: {
    Card
  },

  methods: {
    handleDelete(index) {
      this.deleteTrip(index)
    },
    deleteTrip(index) {
      this.myTrips.splice(index, 1)
      localStorage.setItem('trips', JSON.stringify(this.myTrips))
      this.fetchTrips
    },
    fetchTrips() {
      let trips = localStorage.getItem('trips')

      if (trips) {
        this.myTrips = JSON.parse(trips)
      }
    }
  },
  mounted() {
    this.fetchTrips()
  }
}
</script>

<style lang="scss">
@use '../style/partials/mixins' as *;
@use '../style/partials/variables' as *;

#addTrip {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;

  i {
    font-size: 2rem;
    font-weight: 900;
    color: white;
    text-align: center;
  }
}
</style>
