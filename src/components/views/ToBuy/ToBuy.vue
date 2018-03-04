<template>
  <ui-view class="view">
    <div>
      <to-buy-item v-for="item in items" :key="item.value"
                   v-bind="item"
                   @click="bought(item)" />
      
      <div class="new-item">
        <input type="text" placeholder="Молоко" class="new-item__value"
              @keyup.enter="add" v-model="newItem" />
        <ui-button icon class="new-item__add" @click="add">
          <icon-add class="svg" />
        </ui-button>
      </div>
    </div>

    <div class="gap" />

    <div class="bottom-nav">
      <router-link :to="'/invite'">
        <ui-button icon>
          <icon-invite class="svg"/><icon-add class="svg" />
        </ui-button>
      </router-link>
      
      <router-link :to="'/history'">
        <ui-button icon>
          <icon-history class="svg" />
        </ui-button>
      </router-link>
      
      <router-link :to="'/scan'" replace>
        <ui-button icon>
          <icon-scan class="svg" /><icon-receipt class="svg" /> 
        </ui-button>
      </router-link>
    </div>
  </ui-view>
</template>

<script>
import { mapActions, mapState } from 'vuex'

import UiButton from '@/src/components/core/Button/Button.vue'
import UiView from '@/src/components/core/View/View.vue'
import ToBuyItem from './Item.vue'
import IconAdd from 'vue-material-design-icons/plus.vue'
import IconInvite from 'vue-material-design-icons/account.vue'
import IconHistory from 'vue-material-design-icons/book.vue'
import IconScan from 'vue-material-design-icons/camera.vue'
import IconReceipt from 'vue-material-design-icons/receipt.vue'


export default {
  created() {
    this.$store.dispatch('toBuy/get')
  },
  
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
    UiButton,
    UiView,

    IconInvite,
    IconHistory,
    IconScan,
    IconAdd,
    IconReceipt
  },
}
</script>

<style scoped lang="sass">
@import "~@/src/utils/vars.sass"

.svg
  fill: $color--accent

.view
  max-width: 960px

.gap
  flex: 1

.bottom-nav
  display: flex
  justify-content: space-between

.new-item
  display: flex
  width: 100%
  margin-bottom: $space--m
  background: $darken
  border-radius: $border-radius--m

.new-item__add
  border-radius: $border-radius--m

.new-item__value
  flex: 1
  padding: $space--s
  padding-left: $space--m
  font-size: $font-size--m
  border: $border-width--m solid transparent
  border-radius: $border-radius--m
  background: transparent
  transition: $transition--m
  min-width: 0
  width: 100%

  &::placeholder
    color: rgba(0, 0, 0, .5)

  &:focus
    outline: 0
    // border-color: $color--accent
    background: rbga($color--accent, .1)

@media all and (min-width: 600px)
  .bottom-nav
    justify-content: center
    & > * + *
      margin-left: $space--l
</style>
