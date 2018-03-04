<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  created() {
    this.$store.dispatch('getFamily')
  }
}
</script>

<style lang="sass">
@import "~@/src/utils/vars.sass"
@import "~@/src/utils/animations.sass"

body, html
  padding: 0
  margin: 0
  height: 100%

#app
  display: flex
  align-items: center
  justify-content: center
  
  height: 100%
  width: 100vw
  
  background: $color--main

  font-family: $font--main
  font-size: $font-size--m

  overflow-y: scroll

@include fade-animation("route-change")
</style>
