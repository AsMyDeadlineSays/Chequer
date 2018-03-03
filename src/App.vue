<template>
  <div id="app">
    App goes here
  </div>
</template>

<script>
export default {
  components: {
    
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
