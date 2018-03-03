<template>
  <div id="app">
    <router-view></router-view>
    <router-link :to="'Scan'">Scan</router-link>
  </div>
</template>

<script>
import UiHeading from '@/src/components/core/Heading/Heading.vue'

export default {  
  components: {
    UiHeading
  }
}
</script>

<style lang="sass">
  @import "~@/src/utils/vars.sass"
  @import "~@/src/utils/animations.sass"

  body, html
    padding: 0
    margin: 0
  
  #app
    display: flex
    align-items: center
    justify-content: center
    
    min-height: 100vh
    width: 100vw
    
    background: $color__bg--main

    font-family: $font--main
    font-size: $font-size--m

  @include fade-animation("route-change")
</style>
