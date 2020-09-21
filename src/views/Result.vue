<template>
  <div>
    <b-container>
      <b-row>
        <b-col><h1>Result</h1></b-col>
      </b-row>
      <b-row>
        <b-col>
          <p>{{getPriorities}}</p>
        </b-col>
      </b-row>

    </b-container>
  </div>
</template>
<script>
import {mapGetters, mapActions} from 'vuex'
export default {
  name: 'Result',
  computed: {
    ...mapGetters(['getPriorities'])
  },
  methods: {
    ...mapActions(['calculateEigenValue'])
  },
  mounted () {
    // this.calculateEigenValue()
  }
}
</script>