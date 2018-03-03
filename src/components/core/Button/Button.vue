<template>
  <button :class="['btn', {icon}]" @click="$emit('click')"> 
    <slot /> 
  </button>
</template>

<script>
  export default {
    props: {
      icon: Boolean
    }
  }
</script>

<style lang="sass" scoped>
@import "~@/src/utils/vars.sass" 

.btn
  display: block
  padding: $space--s $space--m 
  font-family: $font--main
  font-weight: 700
  font-size: $font-size--m
  color: $font-color--main
  background: $color--main
  border-radius: $border-radius--m
  transition: $transition--m
  
  // reset
  box-shadow: none
  margin: 0
  border: $border-width--m solid transparent

  &:focus
    outline: 0

  &:active
    transition: 0.15s ease

.icon
  background: $darken
  // border-radius: 50%
  padding: $space--s
  height: $space--xl

  &:hover
    border-color: $color--accent
    background: $lighten
  // width: $space--l * 2
</style>
