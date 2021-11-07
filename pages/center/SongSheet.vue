<template>
	<view>
		<!-- 滑块模块 -->
		<view class="container">
			<scroll-view scroll-y="true">
				<navigator :url="'/pages/center/SongList?id=' + item.id"  class="fans-item" v-for="(item,index) in PlaylistUid" :key="index">
					<view class="fans-item-img">
						<image :src="item.coverImgUrl"></image>
					</view>
					<view class="fans-item-title">
						<view class="item">{{item.name}}</view>
						<view class="item-item">{{item.tags[0]}}</view>
					</view>
				</navigator>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				PlaylistUid:[], // 我的歌单
			}
		},
		onLoad() {
			this.getData()
		},
		methods: {
			async getData(){
				const res = await this.$u.api.PlaylistUid(this.vuex_userId)
				// console.log(res);
				this.PlaylistUid = res.data.playlist
			}
		}
	}
</script>

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
	
	page {
		background-color: #ededed;
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
				width: 400rpx;
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
