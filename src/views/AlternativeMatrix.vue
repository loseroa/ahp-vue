<template>
    <div>
    <b-container>
      <b-row>
        <b-col><h1>Alternative matrix</h1></b-col>
      </b-row>
      <div v-for="(matrix, name, index0) in matrices" :key="index0">
        <h5>{{ name }}</h5>
        <table class="mb-5">
          <thead style="text-align: center">
            <th scope="col"></th>
            <th v-for="(alternative, index) in alternatives" :key="index">{{alternative.name}}</th>
          </thead>
          <tbody style="text-align: center">
            <tr v-for="(row, index) in matrix" :key="index" style="text-align: center">
              <th scope="row">{{ alternatives[index].name }}</th>
              <td v-for="(cell, index2) in row" :key="index2">
                <b-form-input
                  style="width: 5rem"
                  type="number"
                  v-model="cell.value"
                  :disabled="index == index2"
                ></b-form-input>  
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <router-link :to="{ name: 'CriteriaMatrix'}" class="mr-2">
        <b-button variant="secondary">
          Back
        </b-button>
      </router-link>
      <!-- <b-button variant="primary" @click="btnNextHandleClick()" :disabled="alternatives.length <= 2"> -->
      <b-button variant="primary" @click="btnNextHandleClick()">
        Next
      </b-button>
    </b-container>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'AlternativeMatrix',
  data: () => {
    return {
      alternatives: [],
      matrices: {}
    }
  },
  beforeMount () {
    Object.assign(this.alternatives, this.getAlternative)
    Object.assign(this.matrices, this.getAlternativeMatrix)
  },
  computed: {
    ...mapGetters([
    'getAlternative',
    'getAlternativeMatrix'
    ]) 
  },
  methods: {
    ...mapActions([
      'setAlternativeMatrix'
    ]),
    btnNextHandleClick () {
      this.setAlternativeMatrix(this.matrices)
      this.$router.push({name: 'Result'})
    }
  }
}
</script>