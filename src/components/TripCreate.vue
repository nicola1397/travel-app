<template>
  <div class="container-md">
    <div class="row align-items-center justify-content-between">
      <div class="col-sm-12 col-md-6">
        <h1 class="text-white">ORGANIZZA IL TUO VAGGIO CON</h1>

        <div class="logoContainer">
          <img src="../assets/icon.svg" alt="LOGO" />
          <span class="logoText">TravelNotes</span>
        </div>
      </div>
      <!-- FORM COLUMN -->
      <div class="col-sm-12 col-md-4 createForm">
        <div class="mb-2">
          <label for="thumbnail">Immagine di copertina</label>
          <input
            type="file"
            id="thumbnail"
            name="thumbnail"
            accept="image/png, image/jpeg"
            @change="uploadImage()"
            style="display: none"
          />
          <div class="thumbnailContainer">
            <img
              :src="
                newTrip.image ||
                `https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg?w=900`
              "
              class="thumbnailImage"
              @click="triggerInputClick()"
            />
          </div>
        </div>
        <div class="mb-2">
          <label for="name">Nome <span class="text-danger">*</span></label>
          <input
            type="text"
            placeholder="Nome"
            id="name"
            name="name"
            v-model="this.newTrip.name"
            required
          />
        </div>
        <div class="mb-2">
          <label for="start_date">Data di inizio <span class="text-danger">*</span></label>
          <input
            type="date"
            id="start_date"
            name="start_date"
            v-model="newTrip.start_date"
            required
          />
          <div
            v-if="newTrip.start_date !== '' && newTrip.start_date > newTrip.end_date"
            class="text-danger"
          >
            La data inserita non è valida
          </div>
        </div>
        <div class="mb-2">
          <label for="end_date">Data di fine <span class="text-danger">*</span></label>
          <input
            type="date"
            id="end_date"
            name="end_date"
            v-model="newTrip.end_date"
            required
            @blur="valiDate()"
          />
          <div
            v-if="newTrip.start_date !== '' && newTrip.end_date < newTrip.start_date"
            class="text-danger"
          >
            La data inserita non è valida
          </div>
        </div>
        <div class="mb-2"></div>
        <div>
          <button
            :disabled="unchecked() ? true : false"
            class="rounded-pill"
            value="Invia"
            @click="addTrip()"
          >
            Invia
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import router from '../router/index'
export default {
  data() {
    return {
      newTrip: {
        name: '',
        start_date: null,
        end_date: null,
        image: null,
        days: null,
        activities: []
      },
      modalShow: false,
      validated: false,
      myTrips: [],
      formattedDate: ''
    }
  },
  props: { updated: Boolean },
  emits: ['changePage', 'updateStatus'],
  methods: {
    triggerInputClick() {
      document.getElementById('thumbnail').click()
    },
    unchecked() {
      if (this.validated === false || this.newTrip.name == '') {
        return true
      } else {
        return false
      }
    },
    valiDate() {
      console.log('Date Validation')

      if (new Date(this.newTrip.start_date) <= new Date(this.newTrip.end_date)) {
        this.validated = true
        this.calculateDays()
      } else {
        this.validated = false
      }
    },
    generateDays() {
      for (let i = 0; i < this.newTrip.days; i++) {
        const dayActivities = []
        this.newTrip.activities.push(dayActivities)
      }
    },
    addTrip() {
      if (this.validated == false) {
        alert('La data di inizio non può essere successiva alla data di fine')
        return
      }
      this.generateDays()
      this.myTrips.push(this.newTrip)
      localStorage.setItem('trips', JSON.stringify(this.myTrips))
      const inputs = document.querySelectorAll('input')
      inputs.forEach((input) => {
        console.log(input.value)

        input.value = ''
      })
      this.$emit('updateStatus', false)

      this.$emit('changePage')
    },
    fetchTrips() {
      let trips = localStorage.getItem('trips')

      if (trips) {
        this.myTrips = JSON.parse(trips)
      }
    },
    calculateDays() {
      const start = new Date(this.newTrip.start_date)
      const end = new Date(this.newTrip.end_date)
      const timeDifference = end.getTime() - start.getTime()
      this.newTrip.days = Math.floor(timeDifference / (1000 * 3600 * 24)) + 1
    },
    uploadImage() {
      const file = document.querySelector('input[type=file]').files[0]
      const reader = new FileReader()

      reader.onloadend = () => {
        const rawImg = reader.result
        this.newTrip.image = rawImg // Base64-encoded image
        console.log(rawImg) // Base64-encoded image
      }

      reader.readAsDataURL(file)
    }
  },

  mounted() {
    this.fetchTrips()
    // this.getCurrentDateTime()
  }
}
</script>

<style lang="scss" scoped>
@use '../style/general.scss' as *;
@use '../style/partials/mixins' as *;
@use '../style/partials/variables' as *;

.logoContainer {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  img {
    height: 200px;
  }
  span {
    font-size: 6rem;
    margin-left: 10px;
    font-family: 'Oleo Script', system-ui;
    color: white;
  }
}

.createForm {
  background-color: rgba(59, 78, 66, 0.7);
  border-radius: 20px;
  margin-top: 30px;
  margin-bottom: 30px;
  color: white;
  padding: 20px;
}

.thumbnailContainer {
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    box-shadow: 0 0 0 2px $shade2;
  }

  .thumbnailImage {
    height: 300px;
    width: auto;
  }
}

* {
  text-align: center;
}

h1 {
  margin: 20px 0 30px 0;
}

label {
  display: block;
  font-size: 1.4rem;
  font-weight: bold;
  margin-bottom: 7px;
}

input {
  border-radius: 500px;
  border: none;
  padding: 10px;
  width: 100%;
  &:hover {
    box-shadow: 0 0 0 2px $shade2;
  }
}
button {
  background-color: $shade2;
  color: white;
  font-weight: bold;
  padding: 10px 30px;
  border: none;
  margin: 20px 0;
  &:hover {
    background-color: $shade3;
  }

  &:disabled {
    background-color: $shade3;
    box-shadow: 0 0 0 2px $shade0;
    opacity: 0.6;
    cursor: not-allowed;
  }
}
</style>
