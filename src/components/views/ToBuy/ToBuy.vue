<template>
  <div> 
    <div>
      ToBuy view
    </div>

    <div>
      <router-link :to="'/invite'">Invite</router-link>
      <router-link :to="'/history'">History</router-link>
      <router-link :to="'/scan'" replace>Scan</router-link>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>
