<template>
  <div class="container-md py-4">
    <div class="row">
      <div class="col-sm-12 col-md-4">
        <div class="tripDetails">
          <div class="coverImageContainer">
            <img :src="myTrip.image" alt="Immagine vacanza" class="coverImage" />
          </div>
          <div class="tripData">
            <h5>Titolo viaggio</h5>
            <h2>{{ myTrip.name }}</h2>
            <h5>Data di partenza</h5>
            {{ myTrip.start_date }}
            <h5>Data di ritorno</h5>
            {{ myTrip.end_date }}
            <h5>Durata</h5>
            {{ myTrip.days }}
          </div>
        </div>
      </div>
      <div class="col-sm-12 col-md-8 d-flex flex-column">
        <div id="mapContainer">
          <Map
            :key="myTrip"
            :locations="locations"
            :activities="myTrip.activities"
            :selectedMarker="selectedMarker"
            :selectedDay="selectedDay"
          ></Map>
          <Planner
            :days="myTrip.days"
            :myTrip="myTrip"
            @fetchTrips="this.fetchTrips()"
            @locationZoom="handleLocationZoom"
            @selectDay="handleSelectDay"
          ></Planner>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { store } from '../store'
import Planner from '../components/Planner.vue'
import Map from '../components/Map.vue'

import tt from '@tomtom-international/web-sdk-maps'
import axios from 'axios'

export default {
  data() {
    return {
      store,
      myTrip: [],
      locations: [],
      selectedMarker: [],
      selectedDay: null
    }
  },

  methods: {
    handleSelectDay(n) {
      this.selectDay(n)
    },
    selectDay(n) {
      console.log(n)
      if (this.selectedDay == n - 1) {
        console.log('annullato')

        this.selectedDay = null
      } else {
        this.selectedDay = n - 1
        console.log('giorno selezionato: ', this.selectedDay)
      }
    },

    handleLocationZoom(n, index) {
      this.getCurrentMarker(n, index)
    },
    getCurrentMarker(n, index) {
      this.selectedMarker = this.myTrip.activities[n - 1][index].locationCoordinates
    },
    fetchTrips() {
      this.locations = []
      let trips = localStorage.getItem('trips')

      if (trips) {
        const myTrips = JSON.parse(trips)
        let currentUrl = window.location.href
        let tripId = currentUrl.substring(currentUrl.lastIndexOf('/') + 1)
        console.log(tripId)
        this.myTrip = myTrips[tripId]
        this.retrieveMarkers(this.myTrip.activities)
      }
    },
    retrieveMarkers(activities) {
      activities.forEach((subArray) => {
        subArray.forEach((item) => {
          if (item.locationCoordinates) {
            this.locations.push(item.locationCoordinates)
          }
        })
      })
    }
  },
  components: { Planner, Map },

  mounted() {
    this.fetchTrips()
  }
}
</script>

<style lang="scss" scoped>
.container-md {
  width: 100%;
}
.coverImageContainer {
  width: 100%;
  max-height: 300px;
  overflow: hidden;
  .coverImage {
    width: 100%;
    height: auto;
    object-fit: cover;
    border-radius: 5px;
  }
}

.tripDetails {
  background-color: rgba(59, 78, 66, 0.7);
  .tripData {
    padding: 20px;
    color: white;
  }
}
</style>
