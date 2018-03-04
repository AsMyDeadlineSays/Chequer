<template>
  <ui-view class="view">
    <div class="expense-col">
      <div v-for="cat in categories" :key="cat"
           :class="['color-desc', toClass(cat)]"
           @click="setCurrent(cat)" />
    
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
      categories: [
        0, 1, 7, 8,
        3, 4, 6, 2,
        9, 5, 10
      ],
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