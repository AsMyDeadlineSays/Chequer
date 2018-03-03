<template>
  <ui-view class="view">
    <div class="expense-col">
      <div class="color-desc meat" />
      <div class="color-desc milk" />
      <div class="color-desc sweet" />
      <div class="color-desc alko" /> 
      <div class="color-desc fish" />
      <div class="color-desc semi" />
      <div class="color-desc conserve" />
      <div class="color-desc veget" />
      <div class="color-desc grocery" />
      <div class="color-desc rest" />
    
      <div class="gap" />
      
      <router-link :to="'/'" replace>
        <ui-button icon> <icon-back class='back-icon' /> </ui-button>
      </router-link>

    </div>

    <div class="main">
      <ui-heading level="2" class="title"> 
        Топ трат
        <span v-if="currentCategory !== undefined" 
              :class="[toClass(currentCategory), 'current']">
          на {{toRus(currentCategory)}}
        </span>
      </ui-heading>
      
      <ol class="top">
        <li v-for="item in expenses" :key="item.value"
            class="top__item">
          {{item.value}}

          <span class="top__item__spent">
            {{item.spent}} ₽
          </span>
        </li>
      </ol>
    </div>
  </ui-view>
</template>

<script>
import UiHeading from '@/src/components/core/Heading/Heading.vue'
import UiButton from '@/src/components/core/Button/Button.vue'
import UiView from '@/src/components/core/View/View.vue'
import IconBack from 'vue-material-design-icons/arrow-left.vue'



export default {

  data() {
    return {
      currentCategory: 0
    }
  },

  computed: {
    expenses() {
      const items = this.$store.state.history.items
      
      if(this.currentCategory !== undefined) {
        // return items.filter(x => x.category === this.currentCategory)
      }

      return items
    }
  },

  methods: {
    toRus(categoryNumber) {
      return {
        0: 'Мясо',
        1: 'Молочку',
      }[categoryNumber]
    },
    toClass(categoryNumber) {
      return {
        0: 'meat',
        1: 'milk',
      }[categoryNumber]
    }
  },

  components: {
    UiHeading,
    UiButton,
    UiView,
    IconBack
  }
}
</script>

<style scoped lang="sass">
@import "~@/src/utils/vars.sass"

// layout
.view
  flex-direction: row

.main
  flex: 1
  overflow-y: scroll
  margin-left: $space--m

.expense-col
  display: flex
  flex-direction: column

.back-icon
  fill: $color--accent

// chart
.color-desc
  width: $space--l
  height: $space--l

.meat
  color: $color--meat
  background: $color--meat

.milk
  color: $color--milk
  background: $color--milk

.alko
  color: $color--alko
  background: $color--alko

.fish
  color: $color--fish
  background: $color--fish

.veget
  color: $color--veget
  background: $color--veget

.conserve
  color: $color--conserve
  background: $color--conserve

.rest
  color: $color--rest
  background: $color--rest

.semi
  color: $color--semi
  background: $color--semi

.sweet
  color: $color--sweet
  background: $color--sweet

.grocery
  color: $color--grocery
  background: $color--grocery

.gap
  flex: 1

// top
.current
  background: transparent

.top
  margin: $space--s 0
  padding-left: $space--m

.top__item
  padding: $space--s

.top__item__spent
  float: right
</style>