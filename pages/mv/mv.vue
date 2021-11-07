<template>
	<view class="container">
		<scroll-view scroll-y="true">
			<!-- 每日推荐mv模块 -->
			<view class="mv-recommend">
				<view class="mv-title">每日推荐</view>
					<u-row gutter="16">
						<u-col span="6" v-for="(item,index) in recommendMv" :key="index">
							<mv-list :item="item"></mv-list>
						</u-col>
					</u-row>
			</view>
			<!-- 最新MV模块 -->
			<view class="mv-recommend">
				<view class="mv-title">最新MV</view>
					<u-row gutter="16">
						<u-col span="6" class="mv-item-col" v-for="(item,index) in FirstLimitMv" :key="index">
							<mv-list :item="item"></mv-list>
						</u-col>
					</u-row>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				recommendMv:[], // 每日推荐mv
				FirstLimitMv:[], // 最新mv
			}
		},
		onLoad() {
			this.getData()
		},
		methods: {
			async getData(){
				// 每日推荐MV
				const res = await this.$u.api.PersonalizedMv()
				// console.log(res);
				this.recommendMv = res.data.result
				// 最新MV
				const resmv = await this.$u.api.FirstLimit(20)
				// console.log(resmv);
				this.FirstLimitMv = resmv.data.data
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container{
		width: 100%;
		height: calc(100vh - 10px);
		overflow: hidden;
		scroll-view{
			height: 100%;
		}
	}
	
	.mv-recommend{
		margin: 0 20rpx;
		.mv-title{
			font-size: 34rpx;
			margin-top: 30rpx;
			font-weight: 600;
		}
		
	}
</style>
