<template>
  <div>
    <b-container>
      <b-row>
        <b-col><h1>Alternatives</h1></b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-form inline @submit.stop.prevent class="my-3">
          <label class="mr-2" for="input-alternative">Enter number of alternatives:</label>
          <b-input
            id="input-alternative"
            type="number"
            class="mr-2"
            required
            v-model="numberOfAlternative"></b-input>
            <b-button variant="primary" @click="createAlternativeForm()">Add</b-button>
        </b-form>
        </b-col>
      </b-row>
      <div v-for="(alternative, index) in alternatives" :key="index">
        <b-row>
          <b-col cols="4">
            <b-form-group>
              <label>alternative {{index + 1}}:</label>
              <b-input
              v-model="alternative.name"
              placeholder="Enter name"></b-input>  
            </b-form-group>
          </b-col>
        </b-row>
      </div>
      <router-link :to="{ name: 'Criteria'}" class="mr-2">
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
import {mapGetters, mapActions} from 'vuex' 
export default {
  name: "alternativeView",
  data: () => {
    return {
      numberOfAlternative: null,
      alternatives: []
    }
  },
  mounted () {
    Object.assign(this.alternatives, this.getAlternative)
    this.numberOfAlternative  = this.getAlternative.length
  },
  computed: {
    ...mapGetters({
      getAlternative: 'getAlternative',
    })
  },
  methods: {
    ...mapActions({
      setAlternative: 'setAlternative',
    }),
    createAlternativeForm() {
      this.alternatives = []
      for (let index = 0; index < this.numberOfAlternative; index++) {
        this.alternatives.push({name: ""})
      }
    },
    btnNextHandleClick () {
      // await new Promise((resolve) => {
      //   this.setAlternative(this.alternatives)
      //   resolve()        
      // }).then(() => {
      //   this.$router.push({name: 'CriteriaMatrix'})
      // })
      this.setAlternative(this.alternatives)
      this.$router.push({name: 'CriteriaMatrix'})
    }
  }
}
</script>