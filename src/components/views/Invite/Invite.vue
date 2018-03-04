<template>
  <ui-view class="view"> 
    <ui-heading level="2" class="title"> 
      Добавить девайс \ члена семьи 
    </ui-heading>
    
    <div class="qr-card">
      <qr-code :text="link" class="qr-card__code" :size="200" />
    </div>

    <div class="tip">
      Или отправьте им ссылку
    </div>
    <div class="link-manual">
      {{ link }}
    </div>

    <div class="gap" />

    <router-link :to="'/'" replace>
      <ui-button icon> <icon-back class='back-icon' /> </ui-button>
    </router-link>
  </ui-view>
</template>

<script>
import QrCode from 'vue-qrcode-component'
import { mapGetters } from 'vuex'

import UiHeading from '@/src/components/core/Heading/Heading.vue'
import UiButton from '@/src/components/core/Button/Button.vue'
import UiView from '@/src/components/core/View/View.vue'
import IconBack from 'vue-material-design-icons/arrow-left.vue'


export default {
  computed: { 
    ...mapGetters({
      link: 'familyLink'
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

div.view
  align-items: center
  padding: $space--l

.title
  margin-bottom: $space--l

.qr-card
  align-self: center
  box-sizing: border-box
  padding: $space--m
  margin-bottom: $space--l
  background: $color--white
  box-shadow: $box-shadow--m
  border-radius: $border-radius--s

.tip
  // color: $color--white
  opacity: 1
  margin-bottom: $space--s

.link-manual
  box-sizing: border-box
  width: 100%
  max-width: 600px
  height: $space--xl
  line-height: $space--xl
  padding: 0 $space--m
  white-space: nowrap
  background: $darken
  border-radius: $border-radius--m
  text-align: center

.gap
  flex: 1

.back-icon
  fill: $color--accent

@media (max-width: 600px)
  .link-manual
    overflow-x: scroll
</style>
