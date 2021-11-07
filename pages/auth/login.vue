<template>
	<view class="login">
		<!-- 头部组件 -->
		<musicHead title="登录/注册" :isShow="true" color="black"></musicHead>
		<!-- 背景图片 -->
		<view class="login-img">
			<image src="../../static/images/1.png" mode=""></image>
		</view>
		<!-- 登入注册模块 -->
		<view class="login-active">
			<!-- 登入 -->
			<view :class="{active:counter == 1}" @click="Login">账号登入</view>
			<!-- 注册 -->
			<view :class="{active:counter == 2}" @click="register">账号注册</view>
		</view>
		<!-- 登入页面  -->
		<block v-if="counter == 1">
			<view class="login-login">
				<!-- 手机号 -->
				<view class="login-login-item">
					<u-icon class="u-m-r-20" name="phone" color="#9f9f9f" size="32"></u-icon>
					<u-input v-model="phoneLogin" type="text" height="60" placeholder="请输入您的手机号" />
					<text v-if="phoneLoginShow">手机号格式错误</text>
				</view>
				<!-- 密码 -->
				<view v-if="codenum == 1" class="login-login-item">
					<u-icon class="u-m-r-20" name="lock" color="#9f9f9f" size="32"></u-icon>
					<u-input v-model="passwordLogin" type="password" height="60" :password-icon="true"
						placeholder="请输入您的密码" />
				</view>
				<!-- 验证码 -->
				<view v-if="codenum == 2" class="login-login-item">
					<u-icon class="u-m-r-20" name="more-circle" color="#9f9f9f" size="32"></u-icon>
					<u-input v-model="CodeLogin" type="text" height="60" placeholder="请输入4位的验证码" />
					<view>
						<u-toast ref="uToast"></u-toast>
						<u-verification-code :seconds="seconds" ref="uCode" @change="codeChange"></u-verification-code>
						<u-button class="view-btn" @click="getCode(phoneLogin,1)">{{tips}}</u-button>
					</view>
				</view>
				<!-- 验证码登入 -->
				<view v-if="CodePass == 1" class="code" @click="Tocode">
					验证码登入?
				</view>
				<!-- 密码登入 -->
				<view v-if="CodePass == 2" class="code" @click="TopassClick">
					密码登入?
				</view>
				<!-- 确定按钮 -->
				<u-button @click="loginClick" class="login-login-btn" type="error">登入</u-button>
			</view>
		</block>
		<!-- 注册页面  -->
		<block v-if="counter == 2">
			<view class="login-login">
				<!-- 昵称 -->
				<view class="login-login-item">
					<u-icon class="u-m-r-20" name="man-add" color="#9f9f9f" size="32"></u-icon>
					<u-input v-model="names" type="text" height="60" placeholder="请输入您的昵称" />
				</view>
				<!-- 手机号 -->
				<view class="login-login-item">
					<u-icon class="u-m-r-20" name="phone" color="#9f9f9f" size="32"></u-icon>
					<u-input @blur="Totext" @focus="ToFocus" v-model="phone" type="text" height="60"
						placeholder="请输入您的手机号" />
					<text v-if="textShow">手机号格式错误</text>
					<text v-if="phoneShow">手机号已被注册</text>
				</view>
				<!-- 密码 -->
				<view class="login-login-item">
					<u-icon class="u-m-r-20" name="lock" color="#9f9f9f" size="32"></u-icon>
					<u-input @blur="Topass" @focus="passFocus" v-model="password" type="password" height="60" :password-icon="true"
						placeholder="请输入您的密码" />
					<text v-if="passShow">以字母开头，长度在6~18之间</text>
				</view>
				<!-- 验证码 -->
				<view class="login-login-item">
					<u-icon class="u-m-r-20" name="more-circle" color="#9f9f9f" size="32"></u-icon>
					<u-input v-model="Code" type="text" height="60" placeholder="请输入4位的验证码" />
					<view>
						<u-toast ref="uToast"></u-toast>
						<u-verification-code :seconds="seconds" ref="uCode" @change="codeChange"></u-verification-code>
						<u-button class="view-btn" @click="getCode(phone,2)">{{tips}}</u-button>
					</view>
				</view>
				<!-- 确定按钮 -->
				<u-button @click="RegisterClick" class="login-login-btn" type="error">注册</u-button>
			</view>
		</block>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				counter: 1, // 1显示登入模块并且动态添加class  2显示注册模块并且动态添加class
				phone: '', // 注册手机号输入框的值
				password: '', // 注册密码输入框的值
				Code: '', // 注册验证码
				textShow: false, // 输入框错误提示
				passwordShow:false,
				phoneLogin: '', //登入手机号
				passwordLogin: '', // 登入密码
				names: '', // 注册昵称
				tips: '', // 注册验证码倒计时
				// refCode: null,
				seconds: 60, // 验证码倒计时的秒数
				phoneShow:false, // 手机号是否被注册
				passShow:false, // 密码是否正确
				phoneLoginShow:false, // 登入手机号错误提示
				codenum:1, // 密码验证码输入框切换
				CodePass:1, // 密码验证码登入切换
				CodeLogin:'', // 登入验证码
			}
		},
		onLoad() {

		},
		methods: {
			// 点击登入事件
			Login() {
				this.counter = 1
			},
			// 点击注册事件
			register() {
				this.counter = 2
			},
	//---------------  注册模块事件 ----------------
			// 手机号注册输入框失去焦点
			async Totext(e) {
				// console.log(e);
				if (this.phone) {
					if (!this.$u.test.mobile(e)) {
						this.textShow = true
					}else if(this.$u.test.mobile(e)){
						// 验证手机号是否被注册
						const res = await this.$u.api.CheckPhone(e)
						// console.log(res);
						this.phoneShow = res.data.hasPassword
					}
				}
			},
			// 密码输入框失去焦点事件
			Topass(e){
				if(this.password){
					var reg = /^[a-zA-Z]\w{5,17}$/g
					if(!reg.test(e)){
						this.passShow = true
					}
				}
			},
			// 密码输入框获得焦点事件
			passFocus(){
				this.passShow = false
			},
			// 手机号注册输入框获得焦点
			ToFocus() {
				this.textShow = false
				this.phoneShow = false
			},
			// 验证码倒计时
			codeChange(text) {
				this.tips = text;
			},
			// 点击发送验证码事件
			async getCode(phone,num) {
				if(this.$u.test.mobile(phone)){
					// 发送手机号是否被注册请求
					const res = await this.$u.api.CheckPhone(phone)
					// 如果没有被注册就发送验证码请求
					if(!res.data.hasPassword){
						if (this.$refs.uCode.canGetCode) {
							// 模拟向后端请求验证码
							uni.showLoading({
								title: '正在获取验证码'
							})
							// 向后台发送数据
							await this.$u.api.SentPhone(phone)
							setTimeout(() => {
								uni.hideLoading();
								// 这里此提示会被this.start()方法中的提示覆盖
								this.$u.toast('验证码已发送');
								// 通知验证码组件内部开始倒计时
								this.$refs.uCode.start();
							}, 1000);
						} else {
							// 用户发送之后再点击发送事件
							this.$u.toast( this.tips + '后再发送');
						}
						// 被注册了就提示用户手机号已注册
					}else{
						// 判断是登录还是注册 1 是登录 直接发送验证码
						if(num == 1){
							if (this.$refs.uCode.canGetCode) {
								// 模拟向后端请求验证码
								uni.showLoading({
									title: '正在获取验证码'
								})
								// 向后台发送数据
								await this.$u.api.SentPhone(phone)
								setTimeout(() => {
									uni.hideLoading();
									// 这里此提示会被this.start()方法中的提示覆盖
									this.$u.toast('验证码已发送');
									// 通知验证码组件内部开始倒计时
									this.$refs.uCode.start();
								}, 1000);
							} else {
								// 用户发送之后再点击发送事件
								this.$u.toast( this.tips + '后再发送');
							}
						// 判断是登录还是注册 2 注册
						}else if(num == 2){
							this.phoneShow = res.data.hasPassword
						}
					}
					
				}else{
					this.$u.toast('请检查手机号是否正确')
				}
			},
			// 点击注册按钮事件
			async RegisterClick(){
				// 判断是否为空，没有值不发送请求
				if(this.names && this.phone && this.password && this.Code){
					// console.log('1111');
					// 注册请求
					const res = await this.$u.api.CellphonePhone(this.phone,this.password,this.Code,this.names)
					// console.log(res);
					// 判断验证码是否正确
					if(res.data.code == 503){
						this.$u.toast(res.data.message)
					}
				}else{
					this.$u.toast('请检查是否正确')
				}
			},
	// -------------  登入模块事件  -------------------------
			// 验证码登入事件
			Tocode(){
				this.codenum = 2
				this.CodePass = 2
			},
			// 密码登入事件
			TopassClick(){
				this.codenum = 1
				this.CodePass = 1
			},
			// 点击登入事件
			async loginClick(){
				// 判断输入框是否有值
				if(this.$u.test.mobile(this.phoneLogin) && this.passwordLogin){
					// console.log('1111');
					// 账号密码请求
					const res = await this.$u.api.CellphonePhone(this.phoneLogin,this.passwordLogin)
					// console.log(res);
					// 缓存token
					this.$u.vuex('vuex_token',res.data.cookie)
					// 缓存用户id
					this.$u.vuex('vuex_userId',res.data.account.id)
					// 缓存用户信息
					this.$u.vuex('vuex_user',res.data)
					// 提示信息
					this.$u.toast('登入成功！即将跳转')
					// 登录之后，跳转到来源页
					const backUrl = uni.getStorageSync('back_url') || 'pages/index/index'
					setTimeout(() => {
						this.$u.route({
							type:'reLaunch',
							url:backUrl
						})
					},1500)
				}else if(this.$u.test.mobile(this.phoneLogin) && this.CodeLogin){
					// 账号验证码请求
					const ress = await this.$u.api.CellphonePhoneCaptcha(this.phoneLogin,this.CodeLogin)
					// console.log(ress);
					if(ress.data.code != 200){
						this.$u.toast(ress.data.message)
						return
					}
					// 缓存token
					this.$u.vuex('vuex_token',ress.data.cookie)
					// 缓存用户信息
					this.$u.vuex('vuex_user',ress.data)
					// 提示信息
					this.$u.toast('登入成功！即将跳转')
					// 登录之后，跳转到来源页
					const backUrl = uni.getStorageSync('back_url') || 'pages/index/index'
					setTimeout(() => {
						this.$u.route({
							type:'reLaunch',
							url:backUrl
						})
					},1500)
				}else{
					this.$u.toast('请检查账号密码是否正确')
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.login {
		.login-img {
			width: 100%;
			height: 450rpx;

			image {
				width: 100%;
				height: 100%;
			}
		}

		.login-active {

			box-shadow: 5rpx 5rpx 8rpx rgba(0, 0, 0, 0.4); // 盒子阴影
			height: 100rpx;
			width: 80%;
			margin: 0 auto;
			border-radius: 50rpx;
			background: #FFFFFF;
			position: relative;
			top: -40rpx;
			display: flex;
			line-height: 100rpx;
			text-align: center;

			view {
				// width: 50%;
				flex: 1;
				font-size: 32rpx;
				font-weight: 600;
				color: #9f9f9f;
				height: 100%;
				border-radius: 45rpx;

			}

			.active {
				background: #dc2c1f;
				color: white;
			}
		}

		.login-login {
			margin: 0 60rpx;

			.login-login-item {
				display: flex;
				padding: 30rpx 0;
				border-bottom: 1rpx solid #cccccc;

				.login-login-item-input {
					font-size: 28rpx;
				}

				text {
					text-align: center;
					font-size: 28rpx;
					line-height: 60rpx;
					color: #dc2c1f;
				}
				.view-btn{
					background: #dc2c1f;
					color: white;
					border-radius: 40rpx;
				}
			}
			
			.code{
				margin: 20rpx 0;
				font-size: 30rpx;
				font-weight: 600;
				color: #9f9f9f;
			}
			
			.login-login-btn {
				background: #dc2c1f;
				color: white;
				margin-top: 30rpx;
				border-radius: 40rpx;
				height: 100rpx;
				text-align: center;
				font-size: 34rpx;
			}
		}
	}
</style>
