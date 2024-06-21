// 页面路径：store/index.js 
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);//vue的插件机制

//Vuex.Store 构造器选项
const store = new Vuex.Store({
	state:{//存放状态
		wordInfoList:[],
		secret_key:uni.getStorageSync("secret_key") ||  ""
	},
	mutations:{
		// 恢复历史背诵
		recoverWordList(state,wordList){
			state.wordInfoList = wordList
		},
		ListPush(state,wordInfo){
			// 为列表数据赋值
			state.wordInfoList.push(wordInfo)
		},
		deleteWordList(state){
			// 删除列表数据
			state.wordInfoList = []
		},
		setSecretKey(state,key){
			state.secret_key = key
			uni.setStorageSync("secret_key",key)
		}
	}
})
export default store