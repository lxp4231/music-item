<template>
	<view>
		<musicHead title="搜索" :isShow="true" :iconblack="true"></musicHead>
		<!-- 搜索框 -->
		<view class="u-m-30">
			<u-search
				@search="handleToSearch(keyword)"
				@custom="handleToSearch(keyword)"
				v-model="keyword"
				:clearabled="true"
				placeholder="搜索的歌曲/歌手"
				height="70"
				@change="ToChange"
				@clear="ClearClick">
			</u-search>
		</view>
		<!-- 滑块模块 -->
		<view class="container">
			<scroll-view scroll-y="true">
				<!-- 是否显示 -->
				<block v-if="searchType == 1">
					<!-- 搜索记录模块 -->
					<view class="search-history">
						<view class="search-history-head">
							<text>历史记录</text>
							<text @click="ClearSearch" class="iconfont icon-shanchu"></text>
						</view>
						<!-- 搜索记录列表 -->
						<view class="search-history-list">
							<view @click="handleToWord(item)" v-for="(item,index) in searchHistory" :key="index">{{item}}</view>
						</view>
					</view>
					<!-- 搜索列表 -->
					<view class="search-hot">
						<view class="search-hot-head">热搜榜</view>
						<view class="search-hot-item" @click="handleToWord(item.searchWord)" v-for="(item,index) in SearchHot" :key="index">
							<view class="search-hot-top">{{index + 1}}</view>
							<view class="search-hot-word">
								<view>
									{{item.searchWord}}<image :src="item.iconUrl" mode="aspectFit"></image>
								</view>
								<view>{{item.content}}</view>
							</view>
							<text class="search-hot-count">{{item.score}}</text>
						</view>
					</view>
				</block>
				<!-- 搜索结果显示 -->
				<block v-else-if="searchType == 2">
					<!-- 搜索结列表 -->
					<view class="search-result">
						<view class="search-result-item" @click="ToDetail(item.id)" v-for="(item,index) in searchList" :key="index">
							<view class="search-result-word">
								<view>{{item.name}}</view>
								<view>
									<image 
										v-if="item.mark > 60 && item.mark < 70"
										src="~@/static/dujia.png">
									</image>
									<view>{{item.artists[0].name}} - {{item.album.name}}</view>
								</view>
							</view>
							<text class="iconfont icon-bofang"></text>
						</view>
					</view>
				</block>
				<!-- 搜索提示模块 -->
				<block v-if="searchType == 3">
					<view class="search-suggest">
						<view class="search-suggest-head">搜索“{{keyword}}”</view>
						<view class="search-suggest-item" @click="handleToWord(item.keyword)" v-for="(item,index) in searchHint" :key="index">
							<text class="iconfont icon-sousuo_2"></text>
							{{item.keyword}}
						</view>
					</view>
				</block>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				keyword:'', // 输入框的值
				SearchHot:[], // 搜索热词数据
				searchHistory:[], // 存储搜索历史记录
				searchType:1, // 是否显示
				searchList:[], // 搜索关键词数据
				searchHint:[], // 搜索提示
			}
		},
		onLoad() {
			this.getData()
			// 拿出我们的存储的本地数据
			uni.getStorage({
				key:'searchHistory',
				success: (res) => {
				    this.searchHistory = res.data
				}
			})
		},
		methods: {
			// 点击输入框x按钮事件
			ClearClick(){
				this.keyword = ''
			},
			async getData(){
				const res = await this.$u.api.SearchHotDefault();
				this.SearchHot = res.data.data
				// console.log(this.SearchHot);
			},
			// 点击热搜榜事件
			handleToWord(names){
				// 点击热搜榜把当前热搜歌曲给搜索框
				this.keyword = names
				// 调用搜索关键词网络请求函数
				this.getSearch(names)
			},
			// 搜索框回车和点击搜索事件
			handleToSearch(word){
				if(this.keyword){
					// 把输入框输入的值存储到我们的变量当中去
					// unshift() 方法可向数组的开头添加一个或更多元素，并返回新的长度。
					this.searchHistory.unshift(word)
					// new Set()传入一个数组，可以对数组进行去重，区分类型，因为set的元素唯一
					this.searchHistory = [...new Set(this.searchHistory)]
					// console.log(word);
					// 让我们的数组保留8条数据，超出替换掉第一个
					if(this.searchHistory.length >8){
						this.searchHistory.length = 8;
					}
					// 把数据存储到本地
					uni.setStorage({
						key:'searchHistory', // key 存储变量标识
						data:this.searchHistory //data 存储的值
					})
					// 调用搜索关键词网络请求函数
					this.getSearch(word)
					this.keyword = '' // 输入框的值
				}
			},
			// 点击清空搜索历史记录事件
			ClearSearch(){
				// 从本地缓存中异步移除指定 key。
				uni.removeStorage({
				    key: 'searchHistory',
				    success:  (res) => {
				        this.searchHistory = [];
						this.$u.toast('删除成功！')
						this.keyword = '' // 输入框的值
				    }
				});
			},
			// 关键词搜索网络请求事件
			async getSearch(word){
				if(this.keyword){
					// 搜索框值变成我们搜索的值
					this.keyword = word
					// console.log(word);
					const res = await this.$u.api.SearchKeywords(word)
					// console.log(res); 
					this.searchList = res.data.result.songs
					// console.log(this.searchList);
					// 改变我们的显示页
					this.searchType = 2
				}
			},
			// 点击歌曲跳转播放页
			ToDetail(id){
				uni.navigateTo({
					url:'/pages/detail/detail?id=' + id
				})
			},
			// 搜索框输入内容事件
			async ToChange(e){
				// console.log(e);
				// 如果输入框值为空 我们显示热词搜索页
				if(!e){
					this.searchType = 1
				}
				else if(e){
					// 如果输入框值有值 我们显示提示搜索页面
					this.searchType = 3
					// 网络请求
					const res = await this.$u.api.SearchSuggest(e)
					// console.log(res);
					this.searchHint = res.data.result.allMatch
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	.container{
		width: 100%;
		height: calc(100vh - 150px);
		overflow: hidden;
		scroll-view{
			height: 100%;
		}
	}
	
	.search-history{
		margin: 20rpx 30rpx;
		font-size: 26rpx;
		.search-history-head{
			margin-bottom: 36rpx;
			display: flex;
			justify-content: space-between; // 两端点对齐
			text:nth-child(1){}
			text:nth-child(2){}
		}
		.search-history-list{
			display: flex;
			flex-wrap: wrap; // 换行
 			view{
				padding: 16rpx 38rpx;
				border-radius: 40rpx;
				margin-right: 30rpx;
				margin-bottom: 30rpx;
				background: #f7f7f7;
			}
		}
	}
	
	.search-hot{
		margin: 0 30rpx;
		font-size: 26rpx;
		.search-hot-head{
			margin-bottom: 36rpx;
		}
		.search-hot-item{
			display: flex;
			align-items: center;
			margin-bottom: 58rpx;
			.search-hot-top{
				color: #fb2222;
				width: 60rpx;
				margin-left: 8rpx;
			}
			.search-hot-word{
				flex: 1;
				view:nth-child(1){
					color: black;
					font-size: 30rpx;
					image{
						width: 48rpx;
						height: 22rpx;
					}
				}
				view:nth-child(2){
					width: 500rpx;
					color: #878787;
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
					font-size: 24rpx;
				}
			}
			text{
				color: #878787;
			}
		}
	}
	
	.search-result{
		border-top: 2rpx solid #e4e4e4;
		padding: 30rpx;
		.search-result-item{
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding-bottom: 30rpx;
			margin-bottom: 30rpx;
			border-bottom: 2rpx solid #e4e4e4;
			.search-result-word{
				view:nth-child(1){
					font-size: 28rpx;
					color: #235790;
					margin-bottom: 12rpx;
				}
				view:nth-child(2){
					display: flex;
					font-size: 22rpx;
					justify-content: space-between;
					align-items: center;
					image{
						width: 32rpx;
						height: 20rpx;
						margin-right: 10rpx;
					}
					view{
						color: #898989;
					}
				}
				
			}
			text{
				font-size: 50rpx;
			}
		}
	}
	
	.search-suggest{
		border-top: 2rpx solid #e4e4e4;
		padding: 30rpx;
		font-size: 26rpx;
		.search-suggest-head{
			color: #235790;
			margin-bottom: 40rpx;
		}
		.search-suggest-item{
			margin-bottom: 60rpx;
			color: #5d5d5d;
			text{
				color: #bdbdbd;
				margin-right: 28rpx;
				position: relative;
				top: 2rpx;
			}
		}
	}
</style>
