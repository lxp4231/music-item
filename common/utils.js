const install = (Vue, vm) => {
	// 自定义工具
	
	// 自定义工具 是否登入
	const isLogin = () => {
		// 如果没有token，跳转到登入页面
		const token = vm.vuex_token
		if (!token) {
			// 来自哪个页面
			// getCurrentPages 官方api 最后一个元素是离开的页面 pop取最后一个元素
			const currentPage = getCurrentPages().pop()
			// 获取页面路径，和请求参数
			const {options,route} = currentPage
			// 参数的key Object.keys返回一个所有元素为字符串的数组
			const optionsKeys = Object.keys(options)
			let params = ''
			if(optionsKeys !== 0){
				params = optionsKeys.reduce((pre,current) => {
					return pre + current + '=' + options[current] + '&'
				},'?').slice(0,-1)
			}
			// console.log(currentPage.route);
			// 缓存当前页，用于登录或者注册之后的跳转
			uni.setStorageSync('back_url',route)
			
			vm.$u.toast('请登录!!!')
			setTimeout(() => {
				vm.$u.route({
					type:'navigateTo',
					url: 'pages/auth/login',
				})
			}, 1500)
			return false
		}
		return true
	}
	
	
	// 得到下一个id
	const SongListId = () => {
		// 得到下一个id 循环所有id 
		for(var i =0; i < vm.vuex_SongList.length;i++){
			// 和当前id判断，如果相等，就当前id加1就是下一个id
			if(vm.vuex_SongList[i].id == vm.vuex_currentId){
				vm.$u.vuex('vuex_nextId',vm.vuex_SongList[i+1].id)
			}
		}
	}
	
	// 得到上一个id
	const LastSongId = () => {
		// 得到下一个id 循环所有id 
		for(var i =0; i < vm.vuex_SongList.length;i++){
			// 和当前id判断，如果相等，就当前id加1就是下一个id
			if(vm.vuex_SongList[i].id == vm.vuex_currentId){
				vm.$u.vuex('vuex_upperId',vm.vuex_SongList[i-1].id)
			}
		}
	}
	
	vm.$u.utils = {
		SongListId,
		isLogin,
		LastSongId
	}
}

export default {
	install
}