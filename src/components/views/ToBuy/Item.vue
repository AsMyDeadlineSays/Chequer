<template>
  <div onClick="$emit('click')">
    {{value}} ({{amount}}-{{measure}})
  </div>  
</template>

<script>
export default {
  props: ['value', 'amount', 'measure']
}
</script>

<style>

</style>
