<template>
  <div> 
    <div>
      <to-buy-item v-for="item in items" :key="item.value"
                   v-bind="item"
                   @click="bought(item)" />
      
      <div class="new-item">
        <input type="text" placeholder="яйца"
              @keyup.enter="add" v-model="newItem" />

        <input type="text" placeholder="5 шт."
              @keyup.enter="add" v-model="newItemAmount" />
      </div>
    </div>

    <div class="bottom_nav">
      <router-link :to="'/invite'">Invite</router-link>
      <router-link :to="'/history'">History</router-link>
      <router-link :to="'/scan'" replace>Scan</router-link>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

import UiButton from '@/src/components/core/Button/Button.vue'
import ToBuyItem from './Item.vue'


export default {
  data() {
    return {
      newItem: '',
      newItemAmount: ''
    }
  },

  computed: {
    ...mapState({
      items: state => state.toBuy.items
    })
  },

  methods: {
    add() {
      if( ! this.newItem) return
      
      const split = this.newItemAmount.split(' ')
      const value = this.newItem
      const amount = parseInt(split[0]) || 1
      const measure = (amount === 1 ? split[0] : split[1]) || ''

      this.$store.dispatch('toBuy/add', {
        value,
        amount,
        measure
      })

      this.newItem = ''
      this.newItemAmount = ''
    },

    ...mapActions({
      bought: 'toBuy/bought'
    })
  },

  components: {
    ToBuyItem,
    UiButton
  },
}
</script>

<style>

</style>
