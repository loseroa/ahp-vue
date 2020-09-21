import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate"
import {estimate} from '../store/calculate'
// import {eigs} from 'mathjs'

Vue.use(Vuex)

const defaultState = () => {
  return {
    criterias: [],
    alternatives: [],
    matrices: {
      criterias: [],
      alternatives: {}
    }
  }
}

const state = defaultState()

const getters = {
  getAlternative (state) {
    return state.alternatives
  },
  getCriteria (state) {
    return state.criterias
  },
  getCriteriaMatrix (state) {
    return state.matrices.criterias
  },
  getAlternativeMatrix (state) {
    return state.matrices.alternatives
  },
  calculateMatrix (state) {
    return estimate(state.matrices.criterias)
  },
  getPriorities (state) {
    const weightCriteria = estimate(state.matrices.criterias)
    console.log(weightCriteria)
    const weightAlternative = state.matrices.alternatives
    let i = 0
    let tmp = []
    for (let key in weightAlternative) {
      weightAlternative[key] = estimate(weightAlternative[key])
      weightAlternative[key] = weightAlternative[key].map(item => item * weightCriteria[i])
      tmp.push(weightAlternative[key])
      // console.log(alternativeValueMatrix[key])  
    }
    const add = (x,y) => parseFloat(x) + parseFloat(y)    
    const sum = xs => xs.reduce(add, 0)
    tmp = tmp[0].map((val, index) => tmp.map(row => row[index]).reverse()).map(sum)
    return tmp
  } 
}

const mutations = {
  setCriteria (state, criterias) {
    Object.assign(state.criterias, criterias)
  },
  initCriteriaMatrix (state, size) {
    state.matrices.criterias = []
    for (let index = 0; index < size; index++) {
      let row = []
      for (let index2 = 0; index2 < size; index2++) {
        row.push({value: 1})
      }
      state.matrices.criterias.push(row)
    }
  },
  setCriteriaMatrix (state, matrix) {
    Object.assign(state.matrices.criterias, matrix)
  },
  initAlternativeMatrix (state, {getters, alternatives}) {
    state.matrices.alternatives = {}
    getters['getCriteria'].forEach(criteria => {
      Vue.set(state.matrices.alternatives, criteria.name, [])
      for (let index = 0; index < alternatives.length; index++) {
        let row = []
        for (let index2 = 0; index2 < alternatives.length; index2++) {
          row.push({value: 1})
        }
        state.matrices.alternatives[criteria.name].push(row)
      }
    });
  },
  setAlternative (state, alternatives) {
    state.alternatives = Object.assign(state.alternatives, alternatives)
  },
  setAlternativeMatrix (state, matrix) {
    Object.assign(state.matrices.alternatives, matrix)
  },
  resetState (state) {
    Object.assign(state, defaultState())
  }
}

const actions = {
  initCriteriaMatrix (state, size) {
    state.commit('initCriteriaMatrix', size)
  },
  initAlternativeMatrix ({commit, getters}, alternatives) {
    commit('initAlternativeMatrix', {alternatives, getters})
  },
  setCriteria ({commit, dispatch}, criterias) {
    commit('setCriteria', criterias)
    dispatch('initCriteriaMatrix', criterias.length)
  },
  setAlternative ({commit, dispatch}, alternatives) {
    commit('setAlternative', alternatives)
    dispatch('initAlternativeMatrix', alternatives)
  },
  setCriteriaMatrix (state, matrix) {
    state.commit('setCriteriaMatrix', matrix)
  },
  setAlternativeMatrix (state, matrix) {
    state.commit('setAlternativeMatrix', matrix)
  },
  resetState (state) {
    state.commit('resetState')
  },
  calculateEigenValue ({getters}) {
    let alternativeValueMatrix = JSON.parse(JSON.stringify(getters['getAlternativeMatrix']))
    
    for (let key in alternativeValueMatrix) {
      alternativeValueMatrix[key] = estimate(alternativeValueMatrix[key])
      alternativeValueMatrix[key].map()
      // console.log(alternativeValueMatrix[key])  
    }
  }
}

const store = new Vuex.Store({
  plugins: [createPersistedState()],
  state,
  getters,
  mutations,
  actions
})

export default store
