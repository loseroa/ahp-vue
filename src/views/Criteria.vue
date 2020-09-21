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
            v-model="numberOfCriteria"></b-input>
            <b-button variant="primary" @click="createCriteariaForm()">Add</b-button>
        </b-form>
        </b-col>
      </b-row>
      <div v-for="(criteria, index) in criterias" :key="index">
        <b-row>
          <b-col cols="4">
            <b-form-group>
              <label>Criteria {{index + 1}}:</label>
              <b-input
              v-model="criteria.name"
              placeholder="Enter name"></b-input>  
            </b-form-group>
          </b-col>
        </b-row>
      </div>
      <!-- <router-link :to="{ name: 'Alternative'}"> -->
        <!-- <b-button variant="primary" @click="handleClick()" :disabled="criterias.length >= 2"> -->
        <b-button variant="primary" @click="handleClick()">
          Next
        </b-button>
      <!-- </router-link> -->
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
      criterias: []
    }
  },
  mounted () {
    Object.assign(this.criterias, this.getCriteria)
    this.numberOfCriteria = this.criterias.length
  },
  computed: {
    ...mapGetters({
      getCriteria: 'getCriteria'
    })
  },
  methods: {
    ...mapActions({
      setCriteria: 'setCriteria',
      resetState: 'resetState'
    }),
    createCriteariaForm() {
      this.resetState()
      this.criterias = []
      for (let index = 0; index < this.numberOfCriteria; index++) {
        this.criterias.push({name: ""})
      }
    },
    handleClick () {
      this.setCriteria(this.criterias)
      this.$router.push({name: 'Alternative'})
    }
  }
}
</script>