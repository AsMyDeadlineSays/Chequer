<template>
  <ui-view black style="padding: 0" class="view">
    <qrcode-reader @decode="decode" :paused="parsed">
      
      <router-link :to="'/'" replace>
        <ui-button icon class="back__btn">
          <IconBack class="back__icon" />
        </ui-button>
      </router-link>
    </qrcode-reader>
  </ui-view>  
</template>

<script>
import { QrcodeReader } from 'vue-qrcode-reader'
import { mapActions, mapState } from 'vuex'

import UiButton from '@/src/components/core/Button/Button.vue'
import UiView from '@/src/components/core/View/View.vue'
import IconBack from 'vue-material-design-icons/arrow-left.vue'


export default {
  computed: {
    ...mapState({
      parsed: state => state.scan.parsed
    })
  },

  methods: mapActions({
    decode: 'scan/hydrate'
  }),

  components: {
    QrcodeReader,
    UiButton,
    UiView,
    IconBack
  },
}
</script>

<style scoped lang="sass">
@import "~@/src/utils/vars.sass"

.view
  align-items: center
  justify-content: center

.back__btn
  position: absolute
  bottom: $space--s
  left: $space--s

.back__icon
  fill: white
</style>
