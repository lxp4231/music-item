<template>
	<view class="list">
		<!-- 背景 -->
		<view class="fixbg" :style="{'background-image': 'url('+ playlist.coverImgUrl + ')'}"></view>
		<!-- 头部组件 -->
		<musicHead title="歌单" :isShow="true" color="white"></musicHead>
		<!-- 滑块模块 -->
		<view class="container" v-if="!isLoading">
			<scroll-view scroll-y="true">
				<!-- 头部模块 -->
				<view class="list-head">
					<!-- 左侧 -->
					<view class="list-head-img">
						<image :src="playlist.coverImgUrl"></image>
						<text class="iconfont icon-icon-">
							<!-- 所有全局过滤器 formatCount-->
							{{playlist.playCount | formatCount}}
						</text>
					</view>
					<!-- 右侧 -->
					<view class="list-head-text">
						<view>网抑云{{playlist.name}}</view>
						<view>
							<image :src="playlist.creator.avatarUrl"></image>
							{{playlist.creator.nickname}}
						</view>
						<view>
							{{playlist.description}}
						</view>
					</view>
				</view>
				<!-- 分享模块  条件编译-->
				<!-- #ifdef MP-WEIXIN -->
				<button class="list-share" open-type="share">
					<text class="iconfont icon-fenxiang1"></text>
					分享给微信好友
				</button>
				<!-- #endif -->
				<!-- 歌曲列表 -->
				<view class="list-music">
					<!-- 顶部模块 -->
					<view class="list-music-head">
						<text class="iconfont icon-bofang1"></text>
						<text>播放全部</text>
						<text>(共{{playlist.trackCount}}首)</text>
					</view>
					<!-- 列表模块 -->
					<view @click="ToPlay(item.id)" class="list-music-item" v-for="(item,index) in playlist.tracks" :key="index">
						<view class="list-music-top">{{index + 1}}</view>
						<view class="list-music-song">
							<view>{{item.name}}</view>
							<view>
								<image 
								v-if="privileges[index].flag > 60 && privileges[index].flag < 70"
								src="~@/static/dujia.png"></image>
								<image 
								v-if="privileges[index].maxbr == 999000"
								src="~@/static/sq.png"></image>
								{{item.ar[0].name}} - {{item.name}}
							</view>
						</view>
						<text class="iconfont icon-bofang"></text>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id:null, // 首页传递过来的id
				playlist:{ // 顶部数据
				// 防止微信刚开始渲染找不到
					coverImgUrl:'',
					creator:{
						avatarUrl:''
					}
				},
				privileges:[],
				isLoading:true, // 设置显示隐藏，避免页面刷新先显示文字
			}
		},
		onLoad(option) {
			// 显示提示内容
			uni.showLoading({
				title:'页面加载中...'
			})
			// console.log(option);
			this.id = option.id
			// 调用网络请求函数
			this.getData()
		},
		methods: {
			// 网络请求数据
			async getData(){
				const res = await this.$u.api.indexList(this.id)
				// console.log(res);
				this.playlist = res.data.playlist
				this.privileges = res.data.privileges
				// 使用vuex存储歌曲列表所有歌曲的id
				this.$u.vuex('vuex_SongList',res.data.playlist.trackIds)
				this.isLoading = false
				// 隐藏提示内容
				uni.hideLoading();
			},
			// 点击列表歌曲跳转到歌曲页事件
			ToPlay(id){
				uni.navigateTo({
					url:'/pages/detail/detail?id=' + id
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.fixbg{
		width: 100%;
		height: 100vh;
		position: fixed;
		left: 0;
		top: 0;
		background-size: cover;
		background-position: center 0;
		filter: blur(10px); // 模糊度
		transform: scale(1.2); // 放大
	}
	.container{
		width: 100%;
		height: calc(100vh - 70px);
		overflow: hidden;
		scroll-view{
			height: 100%;
		}
	}
	
	.list-head{
		display: flex;
		margin: 30rpx;
		.list-head-img{
			width: 264rpx;
			height: 264rpx;
			border-radius: 30rpx;
			overflow: hidden;
			position: relative;
			margin-right: 42rpx;
			image{
				width: 100%;
				height: 100%;
			}
			text{
				position: absolute;
				right: 8rpx;
				top: 8rpx;
				color: white;
				font-size: 26rpx;
			}
		}
		.list-head-text{
			flex: 1;
			color: #f0f2f7;
			view:nth-child(1){
				color: white;
				font-size: 34rpx;
			}
			view:nth-child(2){
				display: flex;
				margin: 20rpx 0;
				align-items: center;
				font-size: 24rpx;
				image{
					width: 54rpx;
					height: 54rpx;
					border-radius: 50%;
					margin-right: 14rpx;
				}
			}
			view:nth-child(3){
				line-height: 34rpx;
				font-size: 22rpx;
				
			}
		}
	}
	.list-share{
		width: 330rpx;
		height: 74rpx;
		line-height: 74rpx;
		margin:  0 auto;
		text-align: center;
		background: rgba(0,0,0,.4);
		border-radius: 37rpx;
		color: white;
		font-size: 28rpx;
		text{
			margin-right: 12rpx;
		}
	}
	
	.list-music{
		background: white;
		border-radius: 50rpx;
		margin-top: 40rpx;
		overflow: hidden;
		.list-music-head{
			height: 50rpx;
			margin: 30rpx 0 70rpx 22rpx;
			text:nth-child(1){
				height: 50rpx;
				font-size: 50rpx;
			}
			text:nth-child(2){
				font-size: 30rpx;
				margin: 0 10rpx 0 26rpx;
			}
			text:nth-child(3){
				font-size: 26rpx;
				color: #b2b2b2;
			}
		}
		.list-music-item{
			display: flex;
			margin: 0 32rpx 66rpx 42rpx;
			align-items: center;
			color: #959595;
			.list-music-top{
				width: 58rpx;
				font-size: 36rpx;
				line-height: 50rpx;
			}
			.list-music-song{
				flex: 1;
				view:nth-child(1){
					font-size: 28rpx;
					color: black;
					width: 70vw;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
				}
				view:nth-child(2){
					font-size: 20rpx;
					align-items: center;
					width: 70vw;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
					image{
						width: 32rpx;
						height: 20rpx;
						margin-right: 10rpx;
					}
				}
			}
			text{
				font-size: 50rpx;
				color: #c7c7c7;
			}
		}
	}
</style>
