import VueTimeago from 'vue-timeago'
import Vue from 'vue'

Vue.use(VueTimeago, {
  name: 'Timeago', // Component name, `Timeago` by default
  locale: 'pt-BR', // Default locale
  locales: {
    'pt-BR': require('date-fns/locale/pt')
  },
  converter(date, locale, { includeSeconds, addSuffix = true }) {
    const distanceInWordsStrict = require('date-fns/distance_in_words_strict')
    return distanceInWordsStrict(Date.now(), date, {
      locale,
      addSuffix,
      includeSeconds
    })
  }
})
