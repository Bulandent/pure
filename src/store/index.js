import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import getters from './getters'
import errorLog from './modules/errorLog'
import permission from './modules/permission'
import user from './modules/user'
import tagsView from './modules/tagsView'
import settings from './modules/settings'

Vue.use(Vuex)

const store = new Vuex.Store({
	modules: {
		app,
		user,
		permission,
		tagsView,
		settings,
		errorLog,
	},
	getters,
})

export default store
