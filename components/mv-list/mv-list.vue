<template>
	<navigator class="mv-item-col" :url="'/pages/mv/playMv?id=' + item.id">
		<view class="mv-item-img">
			<!-- 因为我们传递过来的变量名称不一样 判断一下 -->
			<image :src="item.picUrl || item.cover"></image>
			<!-- 所有全局过滤器方法  formatCount-->
			<text class="iconfont icon-icon-">{{item.duration || item.playCount | formatCount}}</text>
		</view>
		<view class="mv-item-title">{{item.name}}</view>
		<view class="mv-item-name">{{item.artistName}}</view>
	</navigator>
</template>

<script>
	export default {
		name:"mv-list",
		props:{
			item:{
				type:Object,
				default(){
					return {}
				}
			}
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss" scoped>
	.mv-item-col{
		height: 390rpx;
		margin: 20rpx 0;
		margin-bottom: 20rpx;
	}
	.mv-item-img{
		position: relative;
		width: 100%;
		height: 300rpx;
		image{
			width: 100%;
			height: 100%;
			border-radius: 20rpx;
		}
		text{
			position: absolute;
			right: 8rpx;
			top: 8rpx;
			color: white;
			font-size: 26rpx;
		}
	}
	.mv-item-title{
		width: 100%;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		font-size: 26rpx;
		margin-top: 15rpx;
	}
	.mv-item-name{
		font-size: 26rpx;
		width: 100%;
		margin-top: 10rpx;
		color: #9a9c9f;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
</style>
