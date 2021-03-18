<template>
  <v-container fluid class="pa-8">
    <v-row class="text-center" justify="center">
      <v-col cols="8">
        <v-sheet min-height="50vh" rounded="lg" class="py-4" color="teal lighten-5">
          <v-container>
            <v-row justify="center">
              <v-col class="cols-auto">
                <div class="radio--center" style="width: 50%;">
                  <v-radio-group v-model="preferredCoin" @change="coinChangedHandler(preferredCoin)">
                    <v-radio
                      v-for="choice in getCoinChoices"
                      :key="choice"
                      :label="choice"
                      :value="choice"
                      
                    ></v-radio>
                  </v-radio-group>
                </div>
                <h2 v-if="getPercentChange">
                  Change:
                  <span :class="{'red--text': getPercentChange.startsWith('-')}">
                    {{getPercentChange}}
                  </span>
                </h2>
                <p>Since: {{getPercentChangeSince}}</p>
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
  name: "Implementation2",

  data: () => ({
    preferredCoin: null,
  }),

  computed: {
    ...mapGetters(['getCoinChoices', 'getPreferredCoin', 'getPercentChange', 'getPercentChangeSince']),
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
.radio--center {
  margin: 0 auto;
}
</style>
