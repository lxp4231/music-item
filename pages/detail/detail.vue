<template>
	<view class="detail">
		<!-- 背景 -->
		<view class="fixbg" :style="{'background-image': 'url(' + songs.al.picUrl + ')'}"></view>
		<!-- 遮罩层 更好的显示文字内容 -->
		<view class="shade"></view>
		<!-- 头部组件 -->
		<musicHead :title="songs.name" :isShow="true" color="white"></musicHead>
		<!-- 播放模块 -->
		<view class="container" v-if="!isLoading">
			<scroll-view scroll-y="true">
				<!-- 播放器模块 -->
				<view class="detail-play" @click="ToPlayMusic">
					<image 
						:class="{'detail-play-run' : isPlayRotate}"
						:src="songs.al.picUrl">
					</image>
					<text class="iconfont" :class="iconPlay"></text>
					<view></view>
				</view>
				<!-- 歌曲模块 -->
				<view class="detail-lyric">
					<!-- 让歌词滚动  transform动画函数 translateY y轴滚动 滚动位置是当前歌曲的索引-1 然后*行高 -->
					<view class="detail-lyric-wrap" :style="{transform:'translateY('+ -(lyricIndex - 1) * 82 +'rpx)'}">
						<view class="detail-lyric-item" 
							:class="{active:lyricIndex == index}"
							v-for="(item,index) in lyric" :key="index">
							{{item.lyric}}
						</view>
					</view>
				</view>
				<!-- 选择标签模块 -->
				<u-tabs 
					bar-width="100"
					bg-color=''
					inactive-color="white"
					:list="list" 
					:is-scroll="false" 
					:current="current" 
					@change="change"></u-tabs>
				<!-- 喜欢推荐模块 -->
				<view v-if="current === 0" class="detail-link">
					<!-- <view class="detail-link-head">喜欢这首歌的人也听</view> -->
					<view class="detail-link-item" @click="Tomiusc(item.id)" v-for="(item,index) in SimiSong" :key="index">
						<view class="detail-link-img">
							<image :src="item.album.picUrl"></image>
						</view>
						<view class="detail-link-song">
							<view>{{item.name}}</view>
							<view>
								<image v-if="item.privilege.flag > 60 && item.privilege.flag < 70" src="~@/static/dujia.png"></image>
								<image v-if="item.privilege.maxbr == 999000" src="~@/static/sq.png"></image>
								{{item.album.artists[0].name}} - {{item.name}}
							</view>
						</view>
						<text class="iconfont icon-bofang"></text>
					</view>
				</view>
				<!-- 网抑热评模块 -->
				<view v-if="current === 1" class="detail-comment">
					<view class="detail-comment-item" v-for="(item,index) in CommentMusic" :key="index">
						<!-- 头像模块 -->
						<view class="detail-comment-img">
							<image :src="item.user.avatarUrl"></image>
						</view>
						<!-- 名字模块 -->
						<view class="detail-comment-content">
							<view class="detail-comment-title">
								<view class="detail-comment-name">
									<view>{{item.user.nickname}}</view>
									<!-- 使用全局过滤器 formatime-->
									<view>{{item.time | formatime}}</view>
								</view>
								<!-- 点赞模块 -->
								<view class="detail-comment-link">
									<!-- 使用全局过滤器 formatCount-->
									{{item.likedCount | formatCount}}
									<!-- 点赞事件 把当前评论id传递过去 判断存储点赞评论的数组的当前索引项没有用1这个值 有就改变颜色 -->
									<text 
										@click="Tags(item.commentId)"
										:class="likes[index]==1 ?  'iconcolor' :''" 
										class="iconfont icon-haoping">
									</text>
								</view>
							</view>
							<view class="detail-comment-text">
								{{item.content}}
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
		<!-- 底部内容撑开盒子 -->
		<view class="box"></view>
		<!-- 底部播放状态栏模块 -->
		<view class="btn-bar">
			<!-- 上一首 -->
			<view class="btn-bar-left" @click="LastSong">
				<u-icon name="rewind-left" color="#ffffff" size="56"></u-icon>
			</view>
			<!-- 播放暂停 -->
			<view class="btn-bar-center" @click="ToPlayMusic">
				<text class="iconfont" :class="iconPlay"></text>
			</view>
			<!-- 下一首 -->
			<view class="btn-bar-right" @click="NextSong">
				<u-icon name="rewind-right" color="#ffffff" size="56"></u-icon>
			</view>
		</view>
	</view>
</template>

<script>
	import Vue from 'vue'
	export default {
		data() {
			return {
				id:null, // 歌曲id
				list: [ // 标签选择器的名字
					{name:'猜你喜欢'},
					{name:'网抑热评'}
				],
				current: 0, // 标签选择器的索引号
				songs:{ // 歌曲信息 有些值要写出来，防止页面刷新，报未定义
					al:{
						picUrl:''
					}
				}, 
				SimiSong:[], // 猜你喜欢数据
				CommentMusic:[],  // 歌曲评论信息
				lyric:[], // 歌词 
				lyricIndex:0, // 歌词状态
				SongUrl:'', // 歌曲播放地址
				iconPlay:'icon-zanting', // 播放图标
				isPlayRotate:true, // 图片是否旋转
				timer:null, // 定时器名称
				isLoading:true, // 设置显示隐藏，避免页面刷新先显示文字
				// iconcolor:'#cbcacf',  // 点赞默认颜色
				likes:[], // 存储点赞的评论
			}
		},
		onLoad(option) {
			// console.log(option);
			this.id = option.id
			// 网络请求函数
			// console.log(option);
			this.getData(option.id)
			// #ifdef H5
			this.clearLyricIndex() // 移除定时器
			// #endif
		},
		// 页面卸载
		onUnload() {
			this.clearLyricIndex() // 移除定时器
			// #ifdef H5
			this.bgAudioManager.destroy(); // 销毁当前实例
			// #endif
		},
		// 页面隐藏
		onHide() {
			this.clearLyricIndex() // 移除定时器
			// #ifdef H5
			this.bgAudioManager.destroy(); // 销毁当前实例
			// #endif
		},
		methods: {
			// 标签选择器事件
			change(index){
				this.current = index;
			},
			// 页面所有网络请求事件
			async getData(id){
				// 显示提示内容
				uni.showLoading({
					title:'页面加载中...'
				})
				// 把当前id存储到vuex
				this.$u.vuex('vuex_currentId',id)
				// 调用我们下一首歌曲id的自定义工具
				this.$u.utils.SongListId()
				// 调用我们上一首歌曲id的自定义工具
				if(!(this.vuex_SongList[0].id == id)){
					this.$u.utils.LastSongId()
				}
				
				this.isLoading = true
				// 歌曲详情信息
				const res = await this.$u.api.SongDetail(id)
				this.songs = res.data.songs[0]
				// console.log(this.songs);
				// 相似歌曲信息
				const res1 = await this.$u.api.SimiSong(id)
				this.SimiSong = res1.data.songs
				// console.log(this.SimiSong);
				// 歌曲评论信息
				const CommentMusic = await this.$u.api.CommentMusic(id)
				this.CommentMusic = CommentMusic.data.hotComments
				// console.log(this.CommentMusic);
				// 歌词
				const lyrics = await this.$u.api.lyric(id)
				let lyric = lyrics.data.lrc.lyric
				// 利用正则筛选
				let re = /\[([^\]]+)\]([^\[]+)/g;
				var result = [];
				// $1 第一个正则的匹配结果 
				// $2 第一个正则的匹配结果 
				lyric.replace(re,($0,$1,$2) =>{
					result.push({"time":this.formatTimeToSec($1),"lyric":$2})
				})
				this.lyric = result
				// console.log(result);
				// 歌曲播放地址
				const SongUrl = await this.$u.api.SongUrl(id)
				this.SongUrl = SongUrl.data.data[0]
				// 条件编译 除了 H5 平台，其它平台均存在的代码
				// #ifndef H5
				// 获取全局唯一的背景音频管理器 backgroundAudioManager
				this.bgAudioManager = uni.getBackgroundAudioManager();
				this.bgAudioManager.title = this.songs.name;
				// #endif
				// 条件编译 仅出现在 H5平台下的代码
				// #ifdef H5
				if(!this.bgAudioManager){
					this.bgAudioManager = uni.createInnerAudioContext();
				}
				this.iconPlay = 'icon-bofang'  // 更换图标
				this.isPlayRotate = false // 图片停止旋转
				this.clearLyricIndex() // 移除定时器
				// #endif
				
				
				this.bgAudioManager.src = this.SongUrl.url || '';
				// 条件编译 除了 H5 平台，其它平台均存在的代码
				// #ifndef H5
				this.listenLyricIndex(); // 调用监听音乐进度条函数
				// #endif
				
				this.bgAudioManager.onPlay(() =>{ // onPlay 播放事件
					this.iconPlay = 'icon-zanting'  // 更换图标
					this.isPlayRotate = true // 图片旋转
					this.listenLyricIndex()  // 调用监听音乐进度条函数
				})
				this.bgAudioManager.onPause(() =>{ // onPause 暂停事件
					this.iconPlay = 'icon-bofang'  // 更换图标
					this.isPlayRotate = false // 图片停止旋转
					this.clearLyricIndex() // 移除定时器
				})
				this.bgAudioManager.onEnded(() => { // onEnded 播放事件结束
					this.getData(this.vuex_nextId)
				})
				// console.log(this.SongUrl);
				this.isLoading = false
				// 隐藏提示内容
				uni.hideLoading();
			},
			// 时间转换成毫秒
			formatTimeToSec(value){
				// 对我们的歌词时间进行切割
				let arr = value.split(':');
				// 分钟*60 =秒 + 秒
				return (parseFloat(arr[0] * 60) + parseFloat(arr[1])).toFixed(1);
			},
			// 点击播放音乐事件
			ToPlayMusic(){
				// 判断是否在播放
				// paused 当前是是否暂停或停止状态，true 表示暂停或停止，false 表示正在播放
				if(this.bgAudioManager.paused){
					this.bgAudioManager.play(); // 调用播放事件
				}else{
					this.bgAudioManager.pause();  // 调用暂停事件
				}
			},
			// 监听音乐进度条事件
			listenLyricIndex(){
				clearInterval(this.timer); // 移除定时器
				this.timer = setInterval(() => {
					// 循环遍历我们的歌词和歌词时间轴
					for(var i = 0;i < this.lyric.length;i++){
						// 判断播放时间事件的时间超出我们的歌曲时间
						if(this.bgAudioManager.currentTime > this.lyric[this.lyric.length -1].time){
							this.lyricIndex = this.lyric.length-1
							break;
						}
						// 对我们的歌词进行判断，如果当前时间轴大于当前歌词时间轴和小于下一个歌词时间轴
						if(this.bgAudioManager.currentTime > this.lyric[i].time && this.bgAudioManager.currentTime < this.lyric[i+1].time){
							// 当前时间轴歌词高亮状态
							this.lyricIndex = i;
						}
					}
					// console.log(this.lyricIndex);
				},500)
			},
			// 清除定时器
			clearLyricIndex(){
				clearInterval(this.timer); // 移除定时器
			},
			// 点击猜你喜欢列表事件
			Tomiusc(id){
				// 把我们的列表当前歌曲id传递给网络请求函数中，重新渲染
				this.getData(id)
			},
			// 点击评论点赞事件
			Tags(cid){
				this.CommentMusic.forEach((item,index)=>{
					// 遍历我们所有的评论 如果当前评论id和我们当前点击的id一样
					if(item.commentId == cid){
						// 再判断存储评论的数组的当前索引有没有1这个值
						if(this.likes[index] == 1){
							// 调用方法：Vue.set( target, key, value )
							// target：要更改的数据源(可以是对象或者数组)
							// key：要更改的具体数据
							// value ：重新赋的值
							// 如果有1 这个值 我们就把他变成0 取消点赞
							Vue.set(this.likes,index,0)
						}else{
							// 如果没有 1 这个值 我们就把他变成1  点赞
							Vue.set(this.likes,index,1)
						}
					}
				})
				
			},
			// 点击下一首歌曲事件
			NextSong(){
				// 因为页面刷新会自动调用我们的网络请求函数，我们之前封装过vuex_nextId，所以可以直接使用
				this.getData(this.vuex_nextId)
			},
			// 点击上一首歌曲事件
			LastSong(){
				// 因为页面刷新会自动调用我们的网络请求函数，我们之前封装过vuex_upperId，所以可以直接使用
				// 判断是不是第一首歌，如果是就不执行
				// this.vuex_SongList歌单所有歌曲id 
				// this.vuex_currentId 当前歌曲id
				if(this.vuex_SongList[0].id == this.vuex_currentId){
					this.$u.toast('已经是第一首啦！');
				}else{
					this.getData(this.vuex_upperId)
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	
	.iconcolor{
		color:red;
	}
	.fixbg{
		width: 100%;
		height: 100vh;
		position: fixed;
		left: 0;
		top: 0;
		background-size: cover;
		background-position: center 0;
		filter: blur(20px); // 模糊度
		transform: scale(1.2); // 放大
	}
	
	.container{
		width: 100%;
		height: calc(100vh - 150px);
		overflow: hidden;
		scroll-view{
			height: 100%;
		}
	}
	
	// 遮罩层
	.shade{
		 width: 100%;
		    height: 100vh;
		    position: fixed;
		    left: 0;
		    top: 0;
		    background-color: black;
		    -moz-opacity: 0.3;
		    opacity: .3;
		    filter: alpha(opacity=10);
	}
	.detail-play{
		width: 580rpx;
		height: 580rpx;
		background: url(~@/static/disc.png);
		background-size: cover;
		margin: 214rpx auto 0 auto;
		position:relative;
		image{
			width: 370rpx;
			height: 370rpx;
			border-radius: 50%;
			position: absolute;
			left: 0;
			top: 0;
			bottom: 0;
			right: 0;
			margin: auto;
			// 图片旋转
			animation: 10s linear move infinite; // 10秒 匀速 无限循环
			animation-play-state: paused; // 停止旋转
		}
		.detail-play-run{
			animation-play-state: running; // 开始旋转
		}
		// 自定义动画函数
		@keyframes move{
			from{transform: rotate(0deg);}
			to{transform: rotate(360deg);}
		}
		text{
			width: 100rpx;
			height: 100rpx;
			font-size: 100rpx;
			color: white;
			position: absolute;
			left: 0;
			top: 0;
			bottom: 0;
			right: 0;
			margin: auto;
		}
		view{
			width: 230rpx;
			height: 360rpx;
			background: url(~@/static/needle.png);
			background-size: cover;
			position: absolute;
			left: 130rpx;
			top: -580rpx;
			bottom: 0;
			right: 0;
			margin: auto;
		}
	}
	
	.detail-lyric{
		font-size: 32rpx;
		line-height: 82rpx;
		height: 246rpx;
		text-align: center;
		overflow: hidden;
		color: rgba(255,255,255,.6);
		.detail-lyric-wrap{
			
			.detail-lyric-item{
				height: 82rpx;
			}
			.active{
				color: white;
			}
		}
	}
	
	.detail-link{
		margin: 0 30rpx;
		.detail-link-head{
			font-size: 36rpx;
			color: white;
			margin: 50rpx 0;
		}
		.detail-link-item{
			display: flex;
			align-items: center;
			margin-bottom: 28rpx;
			margin-top: 30rpx;
			padding-bottom: 20rpx;
			.detail-link-img{
				width: 82rpx;
				height: 82rpx;
				border-radius: 20rpx;
				overflow: hidden;
				margin-right: 20rpx;
				image{
					width: 100%;
					height: 100%;
				}
			}
			.detail-link-song{
				flex: 1;
				view:nth-child(1){
					font-size: 28rpx;
					color: white;
					margin-bottom: 12rpx;
				}
				view:nth-child(2){
					font-size: 22rpx;;
					color: #c2c6bf;
					image{
						width: 26rpx;
						height: 20rpx;
						margin-right: 10rpx;
					}
				}
			}
			text{
				color: #c2c6bf;
				font-size: 50rpx;
			}
		}
	}
	
	.detail-comment{
		margin: 0 30rpx;
		.detail-comment-item{
			margin-top: 40rpx;
			margin-bottom: 28rpx;
			display: flex;
			.detail-comment-img{
				width: 64rpx;
				height: 64rpx;
				border-radius: 50%;
				overflow: hidden;
				margin-right: 18rpx;
				image{
					width: 100%;
					height: 100%;
				}
			}
			.detail-comment-content{
				flex: 1;
				.detail-comment-title{
					display: flex;
					justify-content: space-between; // 左右两端对齐
					.detail-comment-name{
						view:nth-child(1){
							font-size: 26rpx;
							color: white;
						}
						view:nth-child(2){
							color: #cbcacf;
							font-size: 20rpx;
						}
					}
					.detail-comment-link{
						font-size: 28rpx;
						color: #cbcacf;
					}
				}
				.detail-comment-text{
					font-size: 28rpx;
					line-height: 48rpx;
					color: white;
					margin-top: 20rpx;
					border-bottom: 1px #e0e0e0 solid;
					padding-bottom: 40rpx;
				}
			}
		}
	}

	.btn-bar{
		width: 100%;
		height: 120rpx;
		background: rgba(0,0,0,.5);
		position: fixed;
		bottom: 0;
		color: white;
		display: flex;
		text-align: center;
		align-items: center;
		.btn-bar-left{
			flex: 1;
		}
		.btn-bar-center{
			flex: 1;
			text{
				font-size: 70rpx;
			}
		}
		.btn-bar-right{
			flex: 1;
		}
	}
	
	// 撑开底部内容盒子
	.box{
		height: 120rpx;
		width: 100%;
	}
</style>
