<template>
  <div class="backgroundModal" :id="'activity-modal-' + n">
    <div class="customModal">
      <div class="close" @click="closeModal(n)">X</div>
      <div>
        <h3>GIORNO {{ n }}</h3>
        <div class="row justify-space-around">
          <div class="col-6">
            <div class="mb-2">
              <label class="form-label">Nome</label>
              <input type="text" class="form-control" placeholder="Nome" v-model="activity.name" />
            </div>

            <div class="mb-2">
              <label class="form-label">Ora</label>
              <input type="time" class="form-control" v-model="activity.time" />
            </div>

            <div class="mb-2">
              <label class="form-label">Note</label>
              <textarea class="form-control" v-model="activity.note"></textarea>
            </div>

            <button :disabled="emptyFields() ? true : false" @click="pushActivity(n)">
              Aggiungi
            </button>
          </div>
          <div class="col-6">
            <label class="form-label">Luogo</label>
            <div :id="'searchbox-' + n"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { services } from '@tomtom-international/web-sdk-services'
import SearchBox from '@tomtom-international/web-sdk-plugin-searchbox'
export default {
  data() {
    return {}
  },
  emits: ['fetchTrips'],
  props: { n: Number, myTrip: Object, activity: Object },
  methods: {
    emptyFields() {
      if (this.activity.locationCoordinates.length === 0 || this.activity.name === '') {
        return true
      } else {
        return false
      }
    },
    closeModal(day) {
      let modal = document.getElementById('activity-modal-' + day)
      this.activity.id = null
      this.activity.name = ''
      this.activity.time = ''
      this.activity.note = ''
      this.activity.locationCoordinates = []
      this.$parent.modalShow = false
    },
    searchBar() {
      var options = {
        searchOptions: {
          key: 'qicXsxpR2GuZBNAJUJA0XBi1PHp4OzgD',
          language: 'it-IT',
          limit: 5
        },
        autocompleteOptions: {
          key: 'qicXsxpR2GuZBNAJUJA0XBi1PHp4OzgD',
          language: 'it-IT',
          resultSet: 'category'
        },
        labels: {
          placeholder: this.activity.locationName || 'Inserisci la località'
        }
      }
      setTimeout(() => {
        const searchBox = document.querySelectorAll('[id^="searchbox-"]')
        console.log(searchBox)
        searchBox.forEach((element) => {
          var ttSearchBox = new SearchBox(services, options)
          var searchBoxHTML = ttSearchBox.getSearchBoxHTML()
          element.append(searchBoxHTML)
          ttSearchBox.on('tomtom.searchbox.resultselected', this.handleResultSelection)
        })
      }, '50')
    },
    handleResultSelection(event) {
      var result = event.data.result
      console.log(result)
      if (result.type == 'Geography') {
        this.activity.locationName = result.address.municipality
      } else if (result.type == 'POI') {
        this.activity.locationName = result.poi.name
      }
      let lat = result.position.lat
      let lon = result.position.lng

      this.activity.locationCoordinates = [lon, lat]
      console.log('activity name', this.activity.name)
    },
    pushActivity(day) {
      let index = day - 1
      let activityIndex = -1
      // let inputLocation = document.getElementsByClassName('tt-search-box-input')
      // console.log(inputLocation)
      // this.activity.locationName = inputLocation
      if (this.activity.id !== null) {
        for (let i = 0; i < this.myTrip.activities[index].length; i++) {
          if (this.myTrip.activities[index][i].id === this.activity.id) {
            activityIndex = i
            break
          }
        }

        if (activityIndex !== -1) {
          this.activity.id = this.activity.name + '-' + day
          this.myTrip.activities[index][activityIndex] = this.activity
        } else {
          this.activity.id = this.activity.name + '-' + day

          this.myTrip.activities[index].push(this.activity)
        }
      } else {
        this.activity.id = this.activity.name + '-' + day
        this.myTrip.activities[index].push(this.activity)
      }

      let trips = localStorage.getItem('trips')
      const myTrips = JSON.parse(trips)
      let currentUrl = window.location.href
      let tripId = currentUrl.substring(currentUrl.lastIndexOf('/') + 1)
      myTrips[tripId] = this.myTrip
      localStorage.setItem('trips', JSON.stringify(myTrips))

      this.closeModal(day)
      this.activity.id = null
      this.activity.name = ''
      this.activity.time = ''
      this.activity.note = ''
      this.activity.locationName = ''

      this.activity.locationCoordinates = []

      const divId = 'searchbox-' + day
      const searchBoxInput = document.querySelector(`#${divId} .tt-search-box-input`)
      searchBoxInput.value = ''

      this.$emit('fetchTrips')
    }
  },
  mounted() {
    this.searchBar()
  }
}
</script>

<style lang="scss" scoped>
.customModal {
  background-color: white;
  z-index: 5;
  width: 800px;
  overflow: hidden;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 10px 5px 0 rgba(black, 0.2);

  .close {
    position: absolute;
    right: 30px;
    top: 20px;

    &:hover {
      transform: scale(1.1);
    }
  }

  [id^='searchbox-'] > * {
    margin-top: 0 !important;
  }
}

.backgroundModal {
  background: rgba(0, 0, 0, 0.24);
  z-index: 5;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
