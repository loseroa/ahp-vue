<template>
    <div>
    <b-container>
      <b-row>
        <b-col><h1>Alternative matrix</h1></b-col>
      </b-row>
      <div v-if="getMethod !== 3">
        <div v-for="(value, name, index0) in matrices" :key="index0">
          <h5>{{ name }}</h5>
          <table class="mb-5">
            <thead style="text-align: center">
              <th scope="col"></th>
              <th v-for="(alternative, index) in alternatives" :key="index">{{alternative.name}}</th>
            </thead>
            <tbody style="text-align: center">
              <tr v-for="(row, index) in value" :key="index">
                <th scope="row">{{ alternatives[index].name }}</th>
                <td v-for="(cell, index2) in row" :key="index2">
                  <b-form-input
                    style="width: 5rem"
                    type="number"
                    v-model="cell.value"
                    min="0"
                    @change="updateTable(name)"
                    :disabled="isInputDisabled(index, index2)"
                  ></b-form-input>  
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div> 
      <div v-else>
        <table class="mb-5">
          <thead style="text-align: center">
            <th scope="col"></th>
            <th scope="col" v-for="(alternative, index) in alternatives" :key="index">{{alternative.name}}</th>
          </thead>
          <tbody>
            <tr v-for="(row, index) in DSmatrix" :key="index">
              <th scope="row">{{criterias[index].name}}</th>
              <td v-for="(cell, index2) in row" :key="index2" scope="row">
                <b-form-input
                  style="width: 5rem"
                  type="number"
                  v-model="cell.value"
                  min="0"
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
      criterias: [],
      matrices: {},
      DSmatrix: []
    }
  },
  created () {  
    if (this.getMethod !== 3) {
      Object.assign(this.matrices, this.getAlternativeMatrix)
      Object.assign(this.alternatives, this.getAlternative)
    } else {
      Object.assign(this.DSmatrix, this.getDSAlternativeMatrix)
      Object.assign(this.alternatives, this.getSubsetAlternative.map(item => {
        return {name: item.join()}
      }))
      Object.assign(this.criterias, this.getCriteria)
    }
  },
  computed: {
    ...mapGetters([
      'getAlternativeMatrix',
      'getAlternative',
      'getMethod',
      'getSubsetAlternative',
      'getDSAlternativeMatrix',
      'getCriteria'
    ]) 
  },
  methods: {
    ...mapActions([
      'setAlternativeMatrix',
      'setDSAlternativeMatrix'
    ]),
    async btnNextHandleClick () {
      await new Promise((resolve) => {
        if (this.getMethod !== 3) {
          this.setAlternativeMatrix(this.matrices)    
        } else {
          this.setDSAlternativeMatrix(this.DSmatrix)
        }
        resolve()
      }).then(() => {
        this.$router.push({name: 'Result'})
      })
    },
    isInputDisabled (index, index2) {
      switch (this.getMethod) {
        case 1:
          return !(index == 0 && index !== index2)
        case 2:
          return !(index + 1 == index2)
      }
      return true
    },
    updateTable(name) {
      if (this.getMethod == 1) {
        for (let index = 1; index < this.matrices[name].length; index++) {
          let relatedRow = 0
          while (relatedRow < index) {
            this.matrices[name][relatedRow][index].value = this.matrices[name][0][index].value * this.matrices[name][relatedRow][0].value
            this.matrices[name][index][relatedRow].value = 1/this.matrices[name][relatedRow][index].value
            relatedRow++
          }            
        }
      } else if (this.getMethod == 2) {
        for (let index = 1; index < this.matrices[name].length; index++) {
          let relatedRow = 0
          while (relatedRow < index) {
            this.matrices[name][relatedRow][index].value = this.matrices[name][relatedRow][index - 1].value * this.matrices[name][index - 1][index].value
            this.matrices[name][index][relatedRow].value = 1/this.matrices[name][relatedRow][index].value
            relatedRow++
          }
        }
      } 
    } 
  }
}
</script>