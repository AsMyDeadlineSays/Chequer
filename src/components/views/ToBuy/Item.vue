<template>
  <div @click="$emit('click')" class="to-buy-item">
    {{value}}
    <span v-if="amount > 1"> x {{amount}} </span>
  </div>  
</template>

<script>
export default {
  props: ['value', 'amount', 'measure']
}
</script>

<style lang="sass" scoped>
@import "~@/src/utils/vars.sass" 


.to-buy-item
  box-sizing: border-box
  height: $space--xl
  width: 100%

  position: relative

  padding-left: $space--m
  line-height: $space--xl 

  &:after
    display: block
    content: ''
    height: $space--s
    width: $space--s
    border-radius: 50%

    position: absolute
    top: ($space--xl - $space--s)/2
    left: 0

    background: rgba(0, 0, 0, .1)
</style>