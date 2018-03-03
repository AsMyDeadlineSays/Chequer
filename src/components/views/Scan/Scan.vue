<template>
  <ui-view black style="padding: 0">
    <qrcode-reader @decode="decode" :paused="parsed">
      
      <router-link :to="'/'" replace> <ui-button>
        <IconBack />
      </ui-button> </router-link>
    </qrcode-reader>
  </ui-view>  
</template>

<script>
import { QrcodeReader } from 'vue-qrcode-reader'
import { mapActions, mapState } from 'vuex'

import UiButton from '@/src/components/core/Button/Button.vue'
import UiView from '@/src/components/core/View/View.vue'
import IconBack from 'vue-material-design-icons/menu.vue'


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

<style>
</style>
