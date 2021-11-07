<template>
	<view>
		<musicHead title="深夜网抑云" :isShow="false"></musicHead>
		<!-- 搜索框 -->
		<view class="u-m-30">
			<u-search
				placeholder="请输入你要搜索的歌曲/歌手" 
				animation
				height="70"
				:disabled="true"
				@click="ToSearch">
			</u-search>
		</view>
		<!-- 滑块内容模块 -->
		<view class="container ">
			<scroll-view scroll-y="true">
				<view class="list">
					<view @click="ToGodsList(item.id)" class="list-item" v-for="(item,index) in goodsList" :key="index">
						<!-- 左侧 -->
						<view class="list-item-img">
							<image :src="item.coverImgUrl"></image>
							<text>{{item.updateFrequency}}</text>
						</view>
						<!-- 右侧 -->
						<view class="list-item-text">
							<view v-for="(item2,index) in item.tracks" :key="index">
								{{index + 1}}.{{item2.first}} - {{item2.second}}
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
				goodsList:[], // 首页数据
			}
		},
		onLoad() {
			this.getData()
		},
		methods: {
			// 请求首页数据
			async getData(){
				const res = await this.$u.api.index()
				// console.log(res);
				let list = res.data.list
				list.length = 4
				this.goodsList = list
				// console.log(this.goodsList);
			},
			// 点击输入框跳转页面事件
			ToSearch(){
				uni.switchTab({
					url:'/pages/search/search'
				})
			},
			// 跳转详情页
			ToGodsList(id){
				uni.navigateTo({
					url:'/components/goodsList/goodsList?id=' + id
				})
			}
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
			.list{
				margin: 0 30rpx;
				.list-item{
					display: flex;
					margin-bottom: 34rpx;
					.list-item-img{
						width: 212rpx;
						height: 212rpx;
						position: relative;
						border-radius: 30rpx;
						overflow: hidden;
						image{
							width: 100%;
							height: 100%;
						}
						text{
							position: absolute;
							bottom: 16rpx;
							left: 12rpx;
							color: white;
							font-size: 24rpx;
						}
					}
					.list-item-text{
						margin-left: 22rpx;
						view{
							height: 68rpx;
							line-height: 68rpx;
							width: 400rpx;
							white-space: nowrap;
							overflow: hidden;
							text-overflow: ellipsis;
						}
					}
				}
			}
		}
	}
</style>
