import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate"
import * as util from '../store/calculate'
// import {eigs} from 'mathjs'

Vue.use(Vuex)

const defaultState = () => {
  return {
    method: 1,
    criterias: [],
    alternatives: [],
    criteriaMatrix: [],
    alternativeMatrix: {},
    DSmethod: {
      subsetCriteria: [],
      subsetAlternative: [],
      criteriaMatrix: [],
      alternativeMatrix: []
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
    return state.criteriaMatrix
  },
  getAlternativeMatrix (state) {
    return state.alternativeMatrix
  },
  calculateMatrix (state) {
    if (state.method !== 3) {
      return util.estimate(state.criteriaMatrix)
    } else {
      return []
    }
  },
  getPriorities (state) {
    if (state.method !== 3) {
      const weightCriteria = util.estimate(state.criteriaMatrix)
      const weightAlternative = {}
      Object.assign(weightAlternative, state.alternativeMatrix)
      let i = 0
      let tmp = []
      for (let key in weightAlternative) {
        weightAlternative[key] = util.estimate(weightAlternative[key])
        weightAlternative[key] = weightAlternative[key].map(item => item * weightCriteria[i])
        tmp.push(weightAlternative[key])
      }
      const add = (x,y) => parseFloat(x) + parseFloat(y)    
      const sum = xs => xs.reduce(add, 0)
      tmp = tmp[0].map((val, index) => tmp.map(row => row[index]).reverse()).map(sum)
      return tmp
    } else {
      const criteriaFreq = util.getFrequency(state.DSmethod.criteriaMatrix)
      const criteriaBel = util.getBlScore(state.DSmethod.subsetCriteria, criteriaFreq)
      const criteriaPl = util.getPlScore(state.DSmethod.subsetCriteria, criteriaFreq)
      const p = [criteriaBel[0], criteriaPl[1]]
      let bel = util.initArrayZeros(state.DSmethod.subsetAlternative.length)
      let pl = util.initArrayZeros(state.DSmethod.subsetAlternative.length)
      for (let i = 0; i < state.DSmethod.alternativeMatrix.length; i++) {
        const criteriaFreq = util.getFrequency(state.DSmethod.alternativeMatrix[i])
        const criteriaBel = util.getBlScore(state.DSmethod.subsetAlternative, criteriaFreq)
        const criteriaPl = util.getPlScore(state.DSmethod.subsetAlternative, criteriaFreq)
        
        bel = bel.map((num, index) => {
          return num + criteriaBel[index] * p[i]
        })

        pl = pl.map((num, index) => {
          return num + criteriaPl[index] * p[i]
        })
      }
      return [bel, pl]
    }
  },
  getMethod (state) {
    return state.method
  },
  getSubsetCriteria (state) {
    return state.DSmethod.subsetCriteria
  },
  getSubsetAlternative (state) {
    return state.DSmethod.subsetAlternative
  },
  getDSCriteriaMatrix (state) {
    return state.DSmethod.criteriaMatrix
  },
  getDSAlternativeMatrix (state) {
    return state.DSmethod.alternativeMatrix
  },
}

const mutations = {
  setMethod (state, method) {
    state.method = method
  },
  setCriteria (state, criterias) {
    if (state.method == 3) {
      const allSubsetCriteria = util.getAllSubset(criterias).slice(1)
      Object.assign(state.DSmethod.subsetCriteria, allSubsetCriteria)
    }
    Object.assign(state.criterias, criterias)
  },
  initCriteriaMatrix (state, size) {
    if (state.method !== 3) {
      state.criteriaMatrix = []
      for (let index = 0; index < size; index++) {
        let row = []
        for (let index2 = 0; index2 < size; index2++) {
          let initValue = {value: 1}
          row.push(initValue)
        }
        state.criteriaMatrix.push(row)
      }
    } else {
      state.DSmethod.criteriaMatrix = []
      for (let index = 0; index < state.DSmethod.subsetCriteria.length; index++) {
        state.DSmethod.criteriaMatrix.push({value: 0})
      }
    }
  },
  setCriteriaMatrix (state, matrix) {
    Object.assign(state.criteriaMatrix, matrix)
  },
  setDSCriteriaMatrix(state, matrix) {
    Object.assign(state.DSmethod.criteriaMatrix, matrix)
  },
  initAlternativeMatrix (state, {getters, alternatives}) {
    if (state.method !== 3) {
      state.alternativeMatrix = {}
      for (let i = 0; i < getters['getCriteria'].length; i++) {
        const criteria = getters['getCriteria'][i].name;
        let matrix = Array()
        for (let j = 0; j < alternatives.length; j++) {
          let row = Array()
          for (let k = 0; k < alternatives.length; k++) {
            let initValue = {value: 1}
            row.push(initValue)
          }
          matrix.push(row)
        }
        Vue.set(state.alternativeMatrix, criteria, matrix)
      }
    } else {
      state.DSmethod.alternativeMatrix = []
      for (let i = 0; i < state.criterias.length; i++) {
        let row = []  
        for (let j = 0; j < state.DSmethod.subsetAlternative.length; j++) {
          row.push({value: 0})
        }
        state.DSmethod.alternativeMatrix.push(row)
      }
    }    
  },
  setAlternative (state, alternatives) {
    if (state.method === 3) {
      const allSubsetAlternative = util.getAllSubset(alternatives).slice(1)
      Object.assign(state.DSmethod.subsetAlternative, allSubsetAlternative)
    }
    state.alternatives = Object.assign(state.alternatives, alternatives)
  },
  setAlternativeMatrix (state, matrix) {
    Object.assign(state.alternativeMatrix, matrix)
  },
  setDSAlternativeMatrix (state, matrix) {
    Object.assign(state.DSmethod.alternativeMatrix, matrix)
  },
  resetState (state) {
    Object.assign(state, defaultState())
  }
}

const actions = {
  setMethod (state, method) {
    state.commit('setMethod', method)
  },
  initCriteriaMatrix (state, size) {
    state.commit('initCriteriaMatrix', size)
  },
  initAlternativeMatrix ({commit, getters}, alternatives) {
    commit('initAlternativeMatrix', {alternatives, getters})
  },
  setCriteria ({commit, dispatch}, criterias) {
    dispatch('initCriteriaMatrix', criterias.length)
    commit('setCriteria', criterias)
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
  setDSCriteriaMatrix (state, matrix) {
    state.commit('setDSCriteriaMatrix', matrix)
  },
  setDSAlternativeMatrix (state, matrix) {
    state.commit('setDSAlternativeMatrix', matrix)
  },  
  resetState (state) {
    state.commit('resetState')
  },
  calculateEigenValue ({getters}) {
    let alternativeValueMatrix = JSON.parse(JSON.stringify(getters['getAlternativeMatrix']))
    
    for (let key in alternativeValueMatrix) {
      alternativeValueMatrix[key] = util.estimate(alternativeValueMatrix[key])
      alternativeValueMatrix[key].map()
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
