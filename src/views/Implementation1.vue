<template>
  <v-container fluid class="pa-8">
    <v-row class="text-center" justify="center">
      <v-col cols="8">
        <v-sheet min-height="50vh" rounded="lg" class="py-4" color="blue-grey lighten-4">
          <v-container>
            <v-row justify="center">
              <v-col class="col-auto">
                <v-select
                  :items="getCoinChoices"
                  label="Set preferred coin:"
                  outlined
                  v-model="preferredCoin"
                  @change="coinChangedHandler(preferredCoin)"
                ></v-select>
                <h1 v-if="getAskValue">Price: {{getAskValue}}</h1>
                <h2 v-if="getPercentChange">
                  Change:
                  <span :class="{'red--text': getPercentChange.startsWith('-')}">
                    {{getPercentChange}}
                  </span>
                </h2>
                <p v-if="getPercentChangeSince">Since: {{getPercentChangeSince}}</p>
              </v-col>
            </v-row>
          </v-container>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";

export default {
  name: "Implementation1",

  data: () => ({
    preferredCoin: null,
  }),

  computed: {
    ...mapGetters(['getCoinChoices', 'getPreferredCoin', 'getPercentChange', 'getPercentChangeSince', 'getAskValue']),
  },

  methods: {
    ...mapMutations(['setPreferredCoin']),
    ...mapActions(['fetchCoinDetails']),
    coinChangedHandler(coin) {
      this.fetchCoinDetails(coin);  
    }
  },

  activated() {
    const coin = this.getPreferredCoin;
    this.preferredCoin = coin;
    this.fetchCoinDetails(coin);
  }
};
</script>

<style scoped>

</style>
