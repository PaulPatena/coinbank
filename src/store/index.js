import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    coinChoices: ['BTC', 'ETH', 'XRP'],
    preferredCoin: localStorage.getItem('preferredCoin') !== null ? localStorage.getItem('preferredCoin') : 'BTC',
    percentChange: null,
    percentChangeSince: null,
  },
  getters: {
    getCoinChoices: state => (state.coinChoices),
    getPreferredCoin: state => (state.preferredCoin),
    getPercentChange: state => (state.percentChange),
    getPercentChangeSince: state => (state.percentChangeSince),
  },
  mutations: {
    setPreferredCoin(state, coin) {
      state.preferredCoin = coin;
      localStorage.setItem('preferredCoin', coin);
    },
    setPreferredCoinFromLocalStorage(state) {
      const coin = localStorage.getItem('preferredCoin') !== null ? localStorage.getItem('preferredCoin') : 'BTC';
      state.preferredCoin = coin;
      localStorage.setItem('preferredCoin', coin);
    },
    saveCoinPrice(state, payload) {
      // payload format: {coin: <3 letter str>, price: <float>, timestamp: <utc str> }

      const oldPrice = localStorage.getItem(`${payload.coin}-price`);
      const oldTimestamp = localStorage.getItem(`${payload.coin}-timestamp`);

      // an existing previous price for given coin exists in localStorage
      if ((oldPrice !== null) && (oldTimestamp !== null)) {
        
        // % change = (newPrice - oldPrice) / oldPrice * 100;
        const change = (payload.price - oldPrice ) / oldPrice * 100;
        const since = new Date(Date.parse(oldTimestamp));

        state.percentChange = `${Number.parseFloat(change).toFixed(5)}%`;
        state.percentChangeSince = since;
      } else {
        state.percentChange = null;
        state.percentChangeSince = null;
      }

      localStorage.setItem(`${payload.coin}-price`, payload.price);
      localStorage.setItem(`${payload.coin}-timestamp`, payload.timestamp);
    }
  },
  actions: {
    fetchCoinDetails({commit}, coin) {
      commit('setPreferredCoin', coin);

      fetch(`https://trade.cointree.com/api/prices/aud/${coin}`)
      .then(response => {
        response.json().then( text => {
          commit('saveCoinPrice', {coin: text.buy, price: text.ask, timestamp: text.timestamp})
        });
      })
      .catch(error => {
        console.log(`Something went wrong, do not modify anything ${error}`);
      })
    }
  },
  modules: {
  }
})
