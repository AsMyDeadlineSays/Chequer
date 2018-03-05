<template>
  <ui-view black style="padding: 0" class="view">
    <router-link :to="'/'" replace>
      <ui-button icon class="back__btn">
        <IconBack class="back__icon" />
      </ui-button>
    </router-link>
    <ui-spinner class="spinner" v-if="parsed" />

    <qrcode-reader @decode="decode" :paused="parsed" :class=" {'video--paused': parsed}">
    </qrcode-reader>
  </ui-view>  
</template>

<script>
import { QrcodeReader } from 'vue-qrcode-reader'
import { mapActions, mapState } from 'vuex'

import UiButton from '@/src/components/core/Button/Button.vue'
import UiView from '@/src/components/core/View/View.vue'
import UiSpinner from '@/src/components/core/Spinner/Spinner.vue'
import IconBack from 'vue-material-design-icons/arrow-left.vue'


export default {
  created() {
    this.$store.dispatch('scan/reset')
  },

  computed: {
    ...mapState({
      parsed: state => state.scan.parsed,
      hydrated: state => state.scan.hydrated
    })
    // parsed: () => true
  },

  methods: mapActions({
    decode: 'scan/hydrate'
  }),

  watch: {
    hydrated: function() {
      if(this.hydrated) this.$router.replace('/')
    }
  },

  components: {
    QrcodeReader,
    UiButton,
    UiView,
    UiSpinner,
    IconBack
  },
}
</script>

<style scoped lang="sass">
@import "~@/src/utils/vars.sass"

.spinner
  position: absolute
  top: 50%
  left: 50%
  width: $space--l * 2
  height: $space--l * 2
  margin-left: -$space--l
  margin-top: -$space--l
  background: $color--accent

.view
  align-items: center
  justify-content: center
  overflow: hidden

.back__btn
  position: fixed
  bottom: $space--m
  left: 50%
  transform: translateX(-50%)
  z-index: 10

.back__icon
  fill: white

.video--paused
  opacity: .5
</style>
