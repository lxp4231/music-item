<template>
	<view>
		<view class="u-p-t-40 u-flex user-box u-p-l-30 u-p-r-20 u-p-b-30">
			<view class="u-m-r-10">
				<u-avatar :show-level="true" :src="user.profile.avatarUrl || pic" size="140"></u-avatar>
			</view>
			<view class="u-flex-1">
				<view class="u-font-18 u-p-b-20">{{user.profile.nickname || '小网易'}}</view>
				<view class="u-font-14 u-tips-color">{{user.profile.signature || '爱音乐 爱生活'}}</view>
			</view>
			<view class="u-m-l-10 u-p-10">
				<u-icon name="arrow-right" color="#969799" size="28"></u-icon>
			</view>
		</view>

		<view class="u-m-t-20 index">
			<view @click="ToFollow">
				关注
				<text>{{FollowsUid.length}}</text>
			</view>
			<view @click="ToFans">
				粉丝
				<text>{{FollowedsUid.length}}</text>
			</view>
		</view>
		<view class="u-m-t-20">
			<u-cell-group>
				<u-cell-item @click="ToSongSheet" icon="kefu-ermai" title="我的歌单"></u-cell-item>
				<u-cell-item @click="ToFollow" icon="heart" title="我的关注"></u-cell-item>
			</u-cell-group>
		</view>

		<view class="u-m-t-20">
			<u-cell-group>
				<u-cell-item @click="logout" icon="setting" title="退出登录"></u-cell-item>
			</u-cell-group>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				user: {}, // 用户信息
				pic: 'https://z3.ax1x.com/2021/08/31/haMty9.png', // 默认图片
				FollowsUid: [], // 用户关注列表
				FollowedsUid: [], // 用户粉丝列表
			}
		},
		onLoad() {
			// 用户信息
			// 判断是否有这个变量
			if (this.vuex_user.profile) {
				this.user = this.vuex_user
			}
			// 如果用户id存在 就调用请求
			if(this.vuex_userId){
				// 调用网络请求函数
				this.getData()
			}
			// 判断有没有token，没有就去登入
			if (this.$u.utils.isLogin()) return

		},
		methods: {
			// 请求用户关注列表和粉丝列表
			async getData() {
				// 请求关注列表
				const res = await this.$u.api.FollowsUid(this.vuex_userId)
				// console.log(res);
				this.FollowsUid = res.data.follow
				// 请求粉丝列表
				const ress = await this.$u.api.FollowedsUid(this.vuex_userId)
				// console.log(ress);
				this.FollowedsUid = ress.data.followeds
			},
			// 退出登录 清除token
			async logout() {
				// 请求API，退出登入
				await this.$u.api.logOut()
				// 提示信息
				this.$u.toast('退出成功，即将跳转到首页')
				setTimeout(() => {
					// 清除缓存的token和用户信息
					this.$u.vuex('vuex_token', null)
					this.$u.vuex('vuex_user', {})
					this.$u.vuex('vuex_userId', null)
					// 跳转到首页
					this.$u.route({
						type: 'reLaunch',
						url: 'pages/index/index'
					})
				}, 1500)
			},
			// 点击关注列表事件
			ToFollow() {
				this.$u.route({
					type:'navigateTo',
					url: 'pages/center/Follow',
				})
			},
			// 点击粉丝列表事件
			ToFans() {
				this.$u.route({
					type:'navigateTo',
					url: 'pages/center/Fans',
				})
			},
			// 点击我的歌单事件
			ToSongSheet(){
				this.$u.route({
					type:'navigateTo',
					url: 'pages/center/SongSheet',
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #ededed;
	}

	.camera {
		width: 54px;
		height: 44px;

		&:active {
			background-color: #ededed;
		}
	}

	.user-box {
		background-color: #fff;
	}

	.index {
		background-color: #fff;
		display: flex;
		height: 120rpx;
		font-size: 30rpx;
		font-weight: 600;
		justify-content: center;
		align-items: center;

		view {
			flex: 1;
			text-align: center;

			text {
				margin-top: 5rpx;
				display: block;
				font-size: 26rpx;
				font-weight: 500;
			}
		}
	}
</style>
