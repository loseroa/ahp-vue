<template>
  <div>
    <b-container>
      <b-row>
        <b-col><h1>Criteria</h1></b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-form inline @submit.stop.prevent class="my-3">
          <label class="mr-2" for="input-criteria">Enter number of criteria:</label>
          <b-input
            id="input-criteria"
            type="number"
            class="mr-2"
            required
            min="2"
            v-model="numberOfCriteria"></b-input>
            <b-button variant="primary" @click="createCriteariaForm()" :disabled="numberOfCriteria < 2">Add</b-button>
        </b-form>
        </b-col>
      </b-row>
      <b-row class="mb-2">
        <b-col cols="3">
          <label>Select method</label>
          <b-form-select v-model="method" :options="options"></b-form-select>
        </b-col>
      </b-row>
      <div v-for="(criteria, index) in criterias" :key="index">
        <b-row>
          <b-col cols="4">
            <b-form-group>
              <label>Criteria {{index + 1}}:</label>
              <b-input
              v-model="criteria.name"
              placeholder="Enter name"
              required></b-input>  
            </b-form-group>
          </b-col>
        </b-row>
      </div>
      <b-button variant="primary" @click="handleClick()">
        Next
      </b-button>
    </b-container>
  </div>
</template>
<script>
import {mapGetters, mapActions} from 'vuex' 
export default {
  name: "CriteriaView",
  data: () => {
    return {
      numberOfCriteria: null,
      criterias: [],
      options: [
          { value: 1, text: 'method 01' },
          { value: 2, text: 'method 02' },
          { value: 3, text: 'Dempster Shafer' },
        ],
      method: null
    }
  },
  mounted () {
    Object.assign(this.criterias, this.getCriteria)
    this.method = this.getMethod
    this.numberOfCriteria = this.criterias.length
  },
  computed: {
    ...mapGetters({
      getCriteria: 'getCriteria',
      getMethod: 'getMethod'
    })
  },
  methods: {
    ...mapActions({
      setCriteria: 'setCriteria',
      resetState: 'resetState',
      setMethod: 'setMethod'
    }),
    createCriteariaForm() {
      this.resetState()
      this.criterias = []
      for (let index = 0; index < this.numberOfCriteria; index++) {
        this.criterias.push({name: ""})
      }
    },
    handleClick () {      
      this.setMethod(this.method)
      this.setCriteria(this.criterias)
      this.$router.push({name: 'Alternative'})
    }
  }
}
</script>