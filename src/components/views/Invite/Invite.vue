<template>
  <ui-view class="view"> 
    <ui-heading level="2" class="title"> 
      Добавить девайс \ члена семьи 
    </ui-heading>
    
    <div class="qr-card">
      <qr-code :text="link" class="qr-card__code" :size="256" />
    </div>

    <div class="tip">
      Или отправьте им ссылку
    </div>
    <div class="link-manual">
      {{ link }}
    </div>

    <div class="gap" />

    <router-link :to="'/'" replace>
      <ui-button icon> <icon-back /> </ui-button>
    </router-link>
  </ui-view>
</template>

<script>
import QrCode from 'vue-qrcode-component'
import { mapState } from 'vuex'

import UiHeading from '@/src/components/core/Heading/Heading.vue'
import UiButton from '@/src/components/core/Button/Button.vue'
import UiView from '@/src/components/core/View/View.vue'
import IconBack from 'vue-material-design-icons/arrow-left.vue'


export default {
  computed: { 
    ...mapState({
      link: state => state.family
    })
  },
  
  components: {
    UiHeading,
    UiButton,
    QrCode,
    UiView,
    IconBack
  }
}
</script>

<style scoped lang="sass">
@import "~@/src/utils/vars.sass"

.view
  align-items: center

.title
  margin-bottom: $space--l

.qr-card
  align-self: center
  box-sizing: border-box
  padding: $space--m
  margin-bottom: $space--l
  background: $color--white
  box-shadow: $box-shadow--m
  border-radius: $border-radius--m

.tip
  // color: $color--white
  opacity: 1
  margin-bottom: $space--s

.link-manual
  box-sizing: border-box
  width: 100%
  max-width: 296px
  padding: $space--s
  background: rgba(0, 0, 0, .05)
  border-radius: $border-radius--m

.gap
  flex: 1
</style>
