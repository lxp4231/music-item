<template>
	<view class="music-head" :style="{color:color}">
		<view class="music-head-icon" v-if="isShow" :class="{'music-head-iconblack':iconblack}">
			<text @click="handleToBack" class="iconfont icon-arrow_left_fat"></text> | 
			<text @click="handleToHome" class="iconfont icon-shouye"></text>
		</view>
		{{title}}
	</view>
</template>

<script>
	export default {
		name:"musicHead",
		data() {
			return {
				
			};
		},
		props:['title','isShow','color','iconblack'],
		methods:{
			// 点击返回按钮事件
			handleToBack(){
				// console.log('1111');
				uni.navigateBack();
			},
			// 点击返回主页事件
			handleToHome(){
				// console.log('222');
				uni.switchTab ({
					url:'/pages/index/index'
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.music-head{
		width: 100%;
		height: 75px;
		font-size: 16px;
		line-height: 80px;
		text-align: center;
		color: block;
		position: relative;
		.music-head-icon{
			position: absolute;
			left: 8px;
			top: 26px;
			width: 90px;
			height: 30px;
			background: rgba(0,0,0,.4);
			color: white;
			line-height: 30px;
			border-radius: 15px;
			display: flex;
			justify-content: space-evenly; // 平均分配
		}
		.music-head-iconblack{
			color: black;
			border: 1px #eaeaea solid;
			background: white;
		}
	}
</style>
