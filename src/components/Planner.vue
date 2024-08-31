<template>
  <!-- ACCORDION -->
  <div class="accordion accordion-flush" id="accordionFlushExample">
    <div v-for="(n, index) in days" class="accordion-item">
      <h2 class="accordion-header">
        <button
          class="accordion-button collapsed"
          type="button"
          data-bs-toggle="collapse"
          :data-bs-target="`#flush-collapseOne-` + n"
          aria-expanded="false"
          :aria-controls="`flush-collapseOne-` + n"
          @click="this.$emit('selectDay', n)"
        >
          GIORNO {{ n }}
        </button>
      </h2>
      <div
        :id="`flush-collapseOne-` + n"
        class="accordion-collapse collapse"
        data-bs-parent="#accordionFlushExample"
      >
        <div class="accordion-body">
          <template v-if="myTrip.activities">
            <div class="row">
              <div class="col-12 d-flex">
                <!-- TITLES -->
                <div class="col-3">
                  <h5 class="subtitle">Nome</h5>
                </div>
                <div class="col-3">
                  <h5 class="subtitle">Orario</h5>
                </div>
                <div class="col-4">
                  <h5 class="subtitle">Note</h5>
                </div>
              </div>
              <!-- ACTIVITY DATA -->
              <div class="col-12 d-flex" v-for="(activity, index) in myTrip.activities[n - 1]">
                <div class="col-12 d-flex" @click="this.$emit('locationZoom', n, index)">
                  <div class="col-3">{{ activity.name }}</div>
                  <div class="col-3">{{ activity.time }}</div>
                  <div class="col-4 tripNotes">{{ activity.note }}</div>
                  <div class="col-2 text-end">
                    <button
                      type="button"
                      class="btn btn-success ms-1 tripButtons"
                      @click="editActivity(n, index)"
                    >
                      <i class="bi bi-pencil-fill"></i>
                    </button>
                    <button
                      type="button"
                      class="btn btn-danger ms-1 tripButtons"
                      @click="deleteActivity(n, index)"
                    >
                      <i class="bi bi-trash-fill"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-1 text-center mx-auto mt-4">
              <button
                type="button"
                class="btn btn-primary rounded-pill mx-auto"
                @click="openModal(n)"
              >
                <i class="bi bi-plus"></i>
              </button>
            </div>
          </template>
        </div>
      </div>
      <!-- MODAL -->
    </div>
    <Modal
      v-if="modalShow"
      :activity="activity"
      :n="currentN"
      :myTrip="myTrip"
      @fetchTrips="this.$emit('fetchTrips')"
    >
    </Modal>
  </div>
</template>

<script>
import axios from 'axios'
import Modal from '../components/Modal.vue'

export default {
  data() {
    return {
      activity: {
        id: null,
        name: '',
        time: '',
        note: '',
        locationName: '',
        locationCoordinates: []
      },
      modalShow: false,
      currentN: null
    }
  },
  emits: ['fetchTrips', 'locationZoom', 'selectDay'],
  props: { days: Number, myTrip: Object },
  components: {
    Modal
  },

  methods: {
    openModal(day) {
      let modal = document.getElementById('activity-modal-' + day)
      this.modalShow = true
      this.currentN = day
    },

    editActivity(n, here) {
      let index = n - 1
      let activity = this.myTrip.activities[index][here]
      this.activity = { ...activity }
      this.openModal(n)
    },
    deleteActivity(n, activity) {
      console.log(activity)
      let index = n - 1
      this.myTrip.activities[index].splice(activity, 1)
      let trips = localStorage.getItem('trips')
      const myTrips = JSON.parse(trips)
      let currentUrl = window.location.href
      let tripId = currentUrl.substring(currentUrl.lastIndexOf('/') + 1)
      myTrips[tripId] = this.myTrip
      localStorage.setItem('trips', JSON.stringify(myTrips))
      this.$emit('fetchTrips')
    }
  },

  mounted() {}
}
</script>

<style lang="scss" scoped>
.subtitle {
  color: rgba(0, 0, 0, 0.692);
}

.tripNotes {
  text-wrap: wrap;
  word-break: break-all;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
