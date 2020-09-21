<template>
    <div>
    <b-container>
      <b-row>
        <b-col><h1>Criteria matrix</h1></b-col>
      </b-row>
      <div>
        <table class="mb-5">
          <thead>
            <th scope="col"></th>
            <th v-for="(item, index) in criterias" :key="index">{{item.name}}</th>
          </thead>
          <tbody>
            <tr v-for="(row, index) in matrix" :key="index" style="text-align: center">
              <th scope="row">{{ criterias[index].name }}</th>
              <td v-for="(cell, index2) in row" :key="index2">
                <b-form-input
                  style="width: 5rem"
                  v-model="cell.value"
                  type="number"
                  :disabled="index == index2"
                ></b-form-input>  
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <router-link :to="{ name: 'Alternative'}" class="mr-2">
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
  name: 'CriteriaMatrix',
  data: () => {
    return {
      criterias: [],
      matrix: []
    }
  },
  beforeMount () {
    Object.assign(this.criterias, this.getCriteria)
    Object.assign(this.matrix, this.getCriteriaMatrix)
  },
  computed: {
    ...mapGetters([
    'getCriteria',
    'getCriteriaMatrix'
    ]) 
  },
  methods: {
    ...mapActions([
      'setCriteriaMatrix'
    ]),
    btnNextHandleClick () {
      this.setCriteriaMatrix(this.matrix)
      this.$router.push({name: 'AlternativeMatrix'})
    }
  }
}
</script>