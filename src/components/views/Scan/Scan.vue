<template>
  <div>
    <qrcode-reader @decode="decode" :paused="parsed">
      <router-link :to="'/'" replace>
        <ui-button> Back </ui-button>
      </router-link>
    </qrcode-reader>  
  </div>  
</template>

<script>
import { QrcodeReader } from 'vue-qrcode-reader'
import { mapActions, mapState } from 'vuex'

import UiButton from '@/src/components/core/Button/Button.vue'


export default {
  // mounted() {
  //   this.$store.dispatch('scan/hydrate', 's=594.00&fp=2081083634&n=1')
  // },

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
    UiButton
  },
}
</script>

<style>

</style>
