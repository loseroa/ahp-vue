<template>
    <div>
    <b-container>
      <b-row>
        <b-col><h1>Criteria matrix</h1></b-col>
      </b-row>
      <div v-if="getMethod !== 3">
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
                  @change="updateTable()"
                  type="number"
                  min="0"
                  :disabled="isInputDisabled(index, index2)"
                ></b-form-input>  
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else>
        <table class="mb-5">
          <thead>
            <th v-for="(item, index) in criterias" :key="index" style="text-align: center">{{item.name}}</th>
          </thead>
          <tbody>
            <tr scope="row">
              <td v-for="(cell, index2) in matrix" :key="index2">
                <b-form-input
                  style="width: 5rem"
                  v-model="cell.value"
                  type="number"
                  min="0"
                >
                </b-form-input>
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
  created () {
    if (this.getMethod !== 3) {      
      Object.assign(this.matrix, this.getCriteriaMatrix)
      Object.assign(this.criterias, this.getCriteria)
    } else {
      Object.assign(this.matrix, this.getDSCriteriaMatrix)
      Object.assign(this.criterias, this.getSubsetCriteria.map(item => {
        return {name: item.join()}
      }))
    }    
  },
  computed: {
    ...mapGetters([
    'getCriteria',
    'getCriteriaMatrix',
    'getMethod',
    'getSubsetCriteria',
    'getDSCriteriaMatrix'
    ]),
  },
  methods: {
    ...mapActions([
      'setCriteriaMatrix',
      'setDSCriteriaMatrix'
    ]),
    async btnNextHandleClick () {
      await new Promise((resolve) => {
        if (this.getMethod !== 3) {
          this.setCriteriaMatrix(this.matrix)
        } else {
          this.setDSCriteriaMatrix(this.matrix)
        }
        resolve()
      }).then(() => {
        this.$router.push({name: 'AlternativeMatrix'})
      })
    },    
    isInputDisabled (index, index2) {
      switch (this.getMethod) {
        case 1:
          return !(index == 0 && index !== index2)
        case 2:
          return !(index + 1 == index2)
      }
      return false
    },
    updateTable() {
      if (this.getMethod == 1) {
        for (let index = 1; index < this.matrix.length; index++) {
          let relatedRow = 0
          while (relatedRow < index) {
            this.matrix[relatedRow][index].value = this.matrix[0][index].value * this.matrix[relatedRow][0].value
            this.matrix[index][relatedRow].value = 1/this.matrix[relatedRow][index].value
            relatedRow++
          }            
        }
      } else if (this.getMethod == 2) {
        for (let index = 1; index < this.matrix.length; index++) {
          let relatedRow = 0
          while (relatedRow < index) {
            this.matrix[relatedRow][index].value = this.matrix[relatedRow][index - 1].value * this.matrix[index - 1][index].value
            this.matrix[index][relatedRow].value = 1/this.matrix[relatedRow][index].value
            relatedRow++
          }
        }
      } 
    } 
  }
}
</script>