<template>
  <div>
    <b-container>
      <b-row>
        <b-col><h1>Result</h1></b-col>
      </b-row>
      <div v-if="getMethod !== 3">
        <b-row>
          <b-col>
            <p v-for="(item, index) in alternative" :key="index">
              {{ `${item.name}: ${result[index]}`}}
            </p>
          </b-col>
        </b-row>
      </div>
      <div v-else>
        <b-row>
          <b-col cols=6>
            <table class="mb-5">
              <thead style="text-align: center">
                <th scope="col"></th>
                <th scope="col" style="text-align: right">Bel</th>
                <th scope="col" style="text-align: right">Pl</th>
              </thead>
              <tbody>
                <tr v-for="(row, index) in alternative" :key="index">
                  <th scope="row" >{{row.name}}</th>
                  <td scope="row" style="text-align: right">{{roundTo3Decimal(result[0][index])}}</td>
                  <td scope="row" style="text-align: right">{{roundTo3Decimal(result[1][index])}}</td>
                </tr>
              </tbody>
            </table>
          </b-col>
        </b-row>
        
      </div>      
      <router-link :to="{ name: 'AlternativeMatrix'}" class="mr-2">
        <b-button variant="secondary">
          Back
        </b-button>
      </router-link>
      <router-link :to="{ name: 'Criteria'}" class="mr-2">
        <b-button variant="primary">
          Home
        </b-button>
      </router-link>
    </b-container>
  </div>
</template>
<script>
import {mapGetters, mapActions} from 'vuex'
export default {
  name: 'Result',
  data: () => {
    return {
      result: [],
      alternative: []
    }
  },
  mounted () {
    this.result = this.getPriorities
    if (this.getMethod !== 3) {
      this.alternative = this.getAlternative
    } else {
      this.alternative = this.getSubsetAlternative.map(item => {
        return {name: item.join()}
      })
    }
  },
  computed: {
    ...mapGetters([
      'getPriorities',
      'getAlternative',
      'getMethod',
      'getSubsetAlternative'
    ]),
  },
  methods: {
    ...mapActions(['calculateEigenValue']),    
    roundTo3Decimal: (number) => {
      return Math.round(number * 1000) / 1000.0;
    }
  }
}
</script>
<style scoped>
th, td {
  width: 100px;
}
</style>