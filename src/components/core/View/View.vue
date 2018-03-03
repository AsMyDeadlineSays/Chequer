<template>
  <div :class="['view', {black, white}]">
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    black: Boolean,
    white: Boolean
  }
}
</script>

<style scoped lang="sass">
@import "~@/src/utils/vars.sass"

.view
  box-sizing: border-box
  display: flex
  flex-direction: column
  width: 100%
  min-height: 100vh
  padding: $space--l
  background: $color--main

.black
  background: $color--black

.white
  background: $color--white
</style>
