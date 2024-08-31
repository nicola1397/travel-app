<template>
  <div class="container-sm">
    <div class="row">
      <div class="col-6 text-end text-uppercase mt-3 selectContainer" @click="this.setPage(0)">
        <h5 class="pageSelector" id="page-selector-1">NUOVO VIAGGIO</h5>
      </div>
      <div class="col-6 text-uppercase mt-3 selectContainer" @click="this.setPage(1)">
        <h5 class="pageSelector" id="page-selector-2">I TUOI VIAGGI</h5>
      </div>
    </div>
  </div>
  <div class="componentContainer" @mousedown="startDrag" @mousemove="onDrag" @mouseup="endDrag">
    <div class="slider" :style="{ transform: `translateX(${translateX}px)` }">
      <div class="component" v-for="(componentName, index) in componentNames" :key="index">
        <component
          :is="componentName"
          @changePage="handlePageChange()"
          @updateStatus="handleUpdate"
          :key="this.myTrips"
          :updated="this.updated"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue'

export default {
  data() {
    return {
      myTrips: [],
      componentNames: ['TripCreate', 'TripList'],
      startX: 0,
      translateX: 0,
      currentIndex: 0,
      isMouseDown: false,
      updated: true
    }
  },
  watch: {
    currentIndex: {
      handler() {
        this.toggleActive()
      },
      deep: true
    }
  },

  components: {
    TripList: defineAsyncComponent(() => import('../components/TripList.vue')),
    TripCreate: defineAsyncComponent(() => import('../components/TripCreate.vue'))
  },

  methods: {
    handleUpdate(status) {
      console.log(status)

      this.updatedList(status)
    },
    updatedList(status) {
      this.updated = status
    },
    handlePageChange() {
      setTimeout(() => {
        this.setPage(1)
      }, 500)
    },
    toggleActive() {
      const selectors = ['page-selector-1', 'page-selector-2']
      selectors.forEach((selector, index) => {
        document
          .getElementById(selector)
          .classList.toggle('text-decoration-underline', index === this.currentIndex)
      })
    },
    setPage(page) {
      this.translateX = -page * window.innerWidth
      this.currentIndex = page
    },

    startDrag(event) {
      this.startX = event.clientX
      this.isMouseDown = true
    },
    onDrag(event) {
      if (this.isMouseDown) {
        event.preventDefault()
        const deltaX = event.clientX - this.startX
        const newTranslateX = -this.currentIndex * window.innerWidth + deltaX

        if (deltaX > 0) {
          this.translateX = Math.min(newTranslateX, 0)
          this.currentIndex = this.calculateCurrentIndex(this.translateX)
        } else if (deltaX < 0) {
          this.translateX = Math.max(
            newTranslateX,
            -window.innerWidth * (this.componentNames.length - 1)
          )
          this.currentIndex = this.calculateCurrentIndex(this.translateX)
        }
      }
    },
    endDrag(event) {
      if (this.isMouseDown) {
        this.isMouseDown = false
      }
    },
    calculateCurrentIndex(translateX) {
      const componentWidth = window.innerWidth
      const visiblePercentage = Math.abs(translateX / componentWidth)

      let currentIndex = Math.floor(-translateX / componentWidth)

      if (visiblePercentage < 0.5) {
        currentIndex = Math.max(currentIndex - 1, 0)
      } else if (visiblePercentage > 0.5) {
        currentIndex = Math.min(currentIndex + 1, this.componentNames.length - 1)
      }

      return currentIndex
    }
  },
  mounted() {
    window.addEventListener('mouseup', this.endDrag)
    this.toggleActive()
  },
  beforeUnmount() {
    window.removeEventListener('mouseup', this.endDrag)
  }
}
</script>

<style lang="scss">
@use '../style/general' as *;
@use '../style/partials/mixins' as *;
@use '../style/partials/variables' as *;

.selectContainer {
  cursor: pointer;
  .pageSelector {
    color: white;
    display: inline-block;
    font-size: 1.3rem;
    font-weight: 700;
  }
}

.componentContainer {
  overflow: hidden;
  width: 100vw;
  min-height: calc(100vh - $headerHeight);
  position: relative;
  flex-wrap: nowrap;
  touch-action: none;
}

.slider {
  display: flex;
  transition: transform 0.3s ease;
  width: 200vw;
}

.component {
  width: 100vw;
  flex-shrink: 0;
  min-height: calc(100vh - $headerHeight);
}
</style>
