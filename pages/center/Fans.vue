<template>
	<view class="container">
		<scroll-view scroll-y="true">
			<view class="fans">
				<view class="fans-item" v-for="(item,index) in FollowedsUid" :key="index">
					<view class="fans-item-img">
						<image :src="item.avatarUrl"></image>
					</view>
					<view class="fans-item-title">
						<view class="item">{{item.nickname}}</view>
						<view class="item-item">{{item.signature}}</view>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				FollowedsUid: [], // 用户粉丝列表
			}
		},
		onLoad() {
			// 调用网络请求函数、
			this.getData()
		},
		methods: {
			// 请求用户关注列表和粉丝列表
			async getData() {
				// 请求粉丝列表
				const ress = await this.$u.api.FollowedsUid(this.vuex_userId)
				this.FollowedsUid = ress.data.followeds
				// console.log(this.FollowedsUid);
			},
		}
	}
</script>

<style>
	
	
</style>

<style scoped lang="scss">
	.container{
		width: 100%;
		background-color: #ededed;
		height: calc(100vh - 10px);
		overflow: hidden;
		scroll-view{
			height: 100%;
		}
	}
	.fans-item{
		margin: 20rpx 20rpx;
		background: #ffffff;
		height: 200rpx;
		display: flex;
		border-radius: 20rpx;
		align-items: center;
		.fans-item-img{
			width: 140rpx;
			height: 140rpx;
			border-radius: 50%;
			margin-left: 20rpx;
			margin-right: 30rpx;
			image{
				width: 100%;
				height: 100%;
				border-radius: 50%;
			}
		}
		.fans-item-title{
			.item{
				margin-bottom: 15rpx;
				font-size: 30rpx;
				font-weight: 600;
				width: 200rpx;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
			.item-item{
				width: 400rpx;
				font-size: 26rpx;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
		}
	}
</style>
