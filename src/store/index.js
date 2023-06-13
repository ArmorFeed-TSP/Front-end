import { createStore } from "vuex";
import { auth } from "./auth.module";
const store = createStore({
  state: {
    darkMode: false,
  },
  mutations: {
    setDarkMode(state, isDark) {
      state.darkMode = isDark;
    },
  },
  modules: {
    auth,
  },
});
export default store;
