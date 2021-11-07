// 如果没有通过拦截器配置域名的话，可以在这里写上完整的URL(加上域名部分)
// 此处第二个参数vm，就是我们在页面使用的this，你可以通过vm获取vuex等操作，更多内容详见uView对拦截器的介绍部分：
// https://uviewui.com/js/http.html#%E4%BD%95%E8%B0%93%E8%AF%B7%E6%B1%82%E6%8B%A6%E6%88%AA%EF%BC%9F
const install = (Vue, vm) => {
	// 定义api属性 挂载api空对象
	vm.$u.api = {}
	// 首页数据
	vm.$u.api.index = () => vm.$u.get('/toplist/detail');
	// 首页数据的详情页
	vm.$u.api.indexList = id => vm.$u.get(`/playlist/detail?id=${id}`);
	// 歌曲详情信息
	vm.$u.api.SongDetail = id => vm.$u.get(`/song/detail?ids=${id}`);
	// 相似歌曲信息
	vm.$u.api.SimiSong = id => vm.$u.get(`/simi/song?id=${id}`);
	// 歌曲评论信息
	vm.$u.api.CommentMusic = id => vm.$u.get(`/comment/music?id=${id}`);
	// 歌词信息
	vm.$u.api.lyric = id => vm.$u.get(`/lyric?id=${id}`);
	// 歌曲播放地址
	vm.$u.api.SongUrl = id => vm.$u.get(`/song/url?id=${id}`);
	// 热搜列表(详细)
	vm.$u.api.SearchHotDefault = id => vm.$u.get('/search/hot/detail');
	// 搜索关键词
	vm.$u.api.SearchKeywords = key => vm.$u.get(`/search?keywords=${key}`);
	// 搜索提示
	vm.$u.api.SearchSuggest = key => vm.$u.get(`/search/suggest?keywords=${key}&type=mobile`);
	// 验证手机号是否注册
	vm.$u.api.CheckPhone = id => vm.$u.get(`/cellphone/existence/check?phone=${id}`);
	// 获取验证码
	vm.$u.api.SentPhone = id => vm.$u.get(`/captcha/sent?phone=${id}`);
	// 注册
	vm.$u.api.CellphonePhone = (phone,mima,yzm,names) => vm.$u.get(`/register/cellphone?phone=${phone}&password=${mima}&captcha=${yzm}&nickname=${names}`);
	// 账号密码登入
	vm.$u.api.CellphonePhone = (phone,mima) => vm.$u.get(`/login/cellphone?phone=${phone}&password=${mima}`);
	// 验证码登入
	vm.$u.api.CellphonePhoneCaptcha = (phone,yzm) => vm.$u.get(`/login/cellphone?phone=${phone}&captcha=${yzm}`);
	// 用户退出登入
	vm.$u.api.logOut = () => vm.$u.get('/logout'); // 退出登录
	// 用户关注列表
	vm.$u.api.FollowsUid = id => vm.$u.get(`/user/follows?uid=${id}`);
	// 用户关注列表
	vm.$u.api.FollowedsUid = id => vm.$u.get(`/user/followeds?uid=${id}`);
	// 用户歌单
	vm.$u.api.PlaylistUid = id => vm.$u.get(`/user/playlist?uid=${id}`);
	// 推荐mv
	vm.$u.api.PersonalizedMv = () => vm.$u.get('/personalized/mv'); 
	// 最新MV
	vm.$u.api.FirstLimit = num => vm.$u.get(`/mv/first?limit=${num}`); 
	// MV播放地址
	vm.$u.api.MvUrl = id => vm.$u.get(`/mv/url?id=${id}`);
	// MV评论
	vm.$u.api.CommentMv = id => vm.$u.get(`/comment/mv?id=${id}`);
	// 歌曲评论点赞
	vm.$u.api.CommentLike = (id,cid,flag,cookie) => vm.$u.get(`/comment/like?id=${id}&cid=${cid}&t=${flag}&type=0&cookie=${cookie}`);
	// 获取歌单详情
	vm.$u.api.SongList = (id,cookie) => vm.$u.get(`/playlist/detail?id=${id}&cookie=${cookie}`);
	
	// 将各个定义的接口名称，统一放进对象挂载到vm.$u.api(因为vm就是this，也即this.$u.api)下
	// vm.$u.api = {
	// 	index
	// };
}

export default {
	install
}