<template>
  <div onClick="$emit('click')">
    {{value}}
    <span v-if="amount > 1"> x {{amount}} </span>
  </div>  
</template>

<script>
export default {
  props: ['value', 'amount', 'measure']
}
</script>

<style>

</style>
