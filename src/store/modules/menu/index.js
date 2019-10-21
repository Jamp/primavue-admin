import main from './main'
import auth from './auth'
import others from './others'

// The profiles are a tribute to Matrix(architect[Me], agent, battery)
const state = {
  items: [
    main,
    auth,
    others
  ]
}

const getters = {
  getItems: state => state.items
}

export default {
  state,
  getters
}
