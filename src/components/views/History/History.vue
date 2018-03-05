<template>
  <ui-view class="view">
    <div class="main">
      <ol class="top">
        <ui-heading level="2" class="title">
          Топ трат
          <span v-if="currentCategory !== undefined"
                :class="[toClass(currentCategory), 'current']">
            на {{toRus(currentCategory)}}
          </span>
        </ui-heading>
        <li v-for="item in expenses" :key="item.value"
            class="top__item">
          {{item.value}}

          <span class="top__item__spent">
            {{item.spent}} ₽
          </span>
        </li>
      </ol>
    </div>

    <div class="expense-col">
      <div v-for="cat in categoriesOrder" :key="cat"
           :class="['color-desc', toClass(cat), {
             'color-desc--active': cat === currentCategory
           }]"
           :style="{flex: categories[cat]}"
           @click="setCurrent(cat)" />

      <div class="gap" />

      <router-link :to="'/'" replace>
        <ui-button icon> <icon-back class='back-icon' /> </ui-button>
      </router-link>

    </div>
  </ui-view>
</template>

<script>
import { mapState } from 'vuex'

import UiHeading from '@/src/components/core/Heading/Heading.vue'
import UiButton from '@/src/components/core/Button/Button.vue'
import UiView from '@/src/components/core/View/View.vue'
import IconBack from 'vue-material-design-icons/arrow-left.vue'


const testData = [{
  value: 'some 1',
  tag: 0,
  price: 1500
}, {
  value: 'some 2',
  tag: 8,
  price: 500
}, {
  value: 'some 3',
  tag: 0,
  price: 99
}, {
  value: 'some 1',
  tag: 0,
  price: 220
}]


export default {

  created() {
    this.$store.dispatch('history/get')
  },

  data() {
    return {
      categoriesOrder: [
        0, 1, 7, 8,
        3, 4, 6, 2,
        9, 5, 10
      ],
      currentCategory: undefined
    }
  },

  computed: {
    ...mapState({
      categories: state => state.history.categories
    }),
    expenses() {
      const items = this.$store.state.history.items

      if(this.currentCategory !== undefined) {
        return items.filter(x => x.tag === this.currentCategory)
      }

      return items
    }
  },

  methods: {
    toRus(categoryNumber) {
      return {
        0: 'мясо',
        1: 'молочные продукты',
        2: 'фрукты и овощи',
        3: 'морепродукты',
        4: 'полуфабрикаты',
        5: 'бакалею',
        6: 'консервы, масло, соусы',
        7: 'сладости и хлеб',
        8: 'алкоголь',
        9: 'соки и напитки',
        10: 'остальное'
      }[categoryNumber]
    },
    toClass(categoryNumber) {
      return {
        0: 'meat',
        1: 'milk',
        2: 'grow',
        3: 'fish',
        4: 'semi',
        5: 'grocery',
        6: 'conserve',
        7: 'sweet',
        8: 'alko',
        9: 'juice',
        10: 'rest',
      }[categoryNumber]
    },
    setCurrent(categoryNumber) {
      if(categoryNumber === this.currentCategory) {
        return this.currentCategory = undefined
      }
      this.currentCategory = categoryNumber
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

.title
  padding-left: $space--s

// layout
.view
  flex-direction: row

.main
  flex: 1
  overflow-y: scroll
  margin-left: $space--m

.expense-col
  height: 100%
  display: flex
  flex-direction: column

.back-icon
  fill: $color--accent

// chart
.color-desc
  width: $space--l
  height: $space--l

  transition: $transition--l
  &--active
    box-shadow: inset 0 0 0 4px $color--white

.meat
  color: $color--meat
  background: $color--meat

.milk
  color: darken($color--milk, 40%)
  background: $color--milk

.alko
  color: $color--alko
  background: $color--alko

.fish
  color: $color--fish
  background: $color--fish

.grow
  color: $color--grow
  background: $color--grow

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

.juice
  color: $color--juice
  background: $color--juice

.gap
  margin-bottom: $space--m

// top
.current
  background: transparent

.top
  margin: $space--s 0
  // padding-left: $space--l

.top__item
  padding: $space--s

.top__item__spent
  float: right
</style>
