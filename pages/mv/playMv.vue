<template>
	<view class="playmv">
		<!-- mv播放模块 -->
		<video 
			:enable-play-gesture="true"
			codec="hardware" 
			class="playmv-mv" 
			:custom-cache="false" 
			:src="MvUrl.url">
		</video>
		<!-- mv评论模块 -->
		<view class="container">
			<scroll-view scroll-y="true">
				<view class="mv-CommentMv">热门评论</view>
				<view class="detail-comment">
					<view class="detail-comment-item" v-for="(item,index) in CommentMv" :key="index">
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
									{{item.likedCount | formatCount}}<text class="iconfont icon-haoping"></text>
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
	</view>
</template>

<script>
	export default {
		data() {
			return {
				MvUrl:{}, // mv播放地址
				CommentMv:[], // mv评论
			}
		},
		onLoad(option) {
			// console.log(option);
			// 页面加载前调用网络请求函数，并把mv id传递进去
			this.getData(option.id)
		},
		methods: {
			// 请求mv的播放地址和mv评论
			async getData(id){
				// 请求mv的播放地址 
				const res = await this.$u.api.MvUrl(id)
				this.MvUrl = res.data.data
				// console.log(this.MvUrl);
				// mv评论
				const resmv = await this.$u.api.CommentMv(id)
				// console.log(resmv);
				// 判断热门评论是否有内容，没有就渲染最新评论
				if(resmv.data.hotComments.length > 0){
					this.CommentMv = resmv.data.hotComments
				}else{
					this.CommentMv = resmv.data.comments
				}
				
			},
		}
	}
</script>

<style lang="scss" scoped>
	.container{
		width: 100%;
		height: calc(100vh - 150px);
		overflow: hidden;
		scroll-view{
			height: 100%;
		}
	}
	
	.playmv-mv{
		width: 100%;
	}
	
	.mv-CommentMv{
		font-size: 34rpx;
		font-weight: 600;
		margin-top:30rpx;
		margin-left: 20rpx;
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
						}
						view:nth-child(2){
							color: #a5a4a7;
							font-size: 20rpx;
						}
					}
					.detail-comment-link{
						font-size: 28rpx;
						color: #a5a4a7;
					}
				}
				.detail-comment-text{
					font-size: 28rpx;
					line-height: 48rpx;
					margin-top: 20rpx;
					border-bottom: 1px #e0e0e0 solid;
					padding-bottom: 40rpx;
				}
			}
		}
	}
</style>
