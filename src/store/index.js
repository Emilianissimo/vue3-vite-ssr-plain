import { createStore } from 'vuex'
import { auth } from "../modules/auth_module";

const store = createStore({
  modules: {
    auth,
  },
})


export default store;