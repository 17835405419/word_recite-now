<template>
	<view class="index-box">
		<uni-fab :pattern="pattern" :content="content" vertical="top" direction="horizontal"
			@trigger="trigger"></uni-fab>
		<div class="start-button" @click="goToInput">
			<text>开始背诵</text>
		</div>

		<view class="secret-box" v-if="showScret">
			<input type="text" maxlength="3" v-model="secret.first">-
			<input type="text" maxlength="3" v-model="secret.two">-
			<input type="text" maxlength="3" v-model="secret.three">-
			<input type="text" maxlength="3" v-model="secret.four">
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from "vuex"
	import {
		activationkey
	} from "@/utils/index.js"
	export default {
		data() {
			return {
				pattern: {
					selectedColor: 'rgb(58,152,222)',
					buttonColor: '#aaaaff',
				},
				content: [{
						iconPath: "/static/ordered list.png",
						selectedIconPath: "/static/ordered list_select.png",
						text: '背诵列表',
						active: false
					},
					{
						iconPath: "/static/unlock.png",
						selectedIconPath: "/static/unlock_select.png",
						text: '输入密钥',
						active: false
					},
					{
						iconPath: "/static/lock.png",
						selectedIconPath: "/static/lock_select.png",
						text: '清除密钥',
						active: false
					},
				],
				showScret: false,
				secret: {
					first: "",
					two: "",
					three: "",
					four: ""
				}
			}
		},
		onLoad() {
			// uniCloud.callFunction({
			// 	name:"makeSentences",
			// 	data:{a:"123"}
			// }).then(res=>{
			// 	console.log(res);
			// })
		},
		watch: {
			"secret.four": {
				handler(news, olds) {
					// 最后一格输完
					if (news.length === 3) {
						uni.showLoading()
						let secret_key =
							`${this.secret.first}${this.secret.two}${this.secret.three}${this.secret.four}`
						activationkey(secret_key).then(res => {
							if (res) {
								this.$store.commit("setSecretKey", secret_key)
								uni.hideLoading()
								this.secret = {
									first: "",
									two: "",
									three: "",
									four: ""
								}
								uni.showToast({
									title: "激活成功"
								})
								this.showScret = false
								this.content[1].active = false
								return
							}
							uni.showToast({
								title: "秘钥错误，请联系管理员获取",
								icon: "error"
							})
							this.secret = {
								first: "",
								two: "",
								three: "",
								four: ""
							}
						})
					}
				},
				deep: true
			}
		},
		methods: {
			trigger(e) {
				this.content[e.index].active = !e.item.active
				if (e.index == 0) {
					uni.navigateTo({
						url: '/pages/word_list/word_list'
					})
					this.content[e.index].active = false
				} else if (e.index == 1) {
					this.showScret = !this.showScret
				} else if (e.index == 2) {
					uni.showModal({
						title: "是否确定清除秘钥?"
					}).then(res => {
						if (res.confirm) {
							// 清除本地缓存的秘钥
							uni.removeStorageSync("secret_key")
						}
					}).finally(() => {
						// 无论结果 取消还是成功 都将选中状态置为false
						this.content[e.index].active = false
					})


				}
			},

			async goToInput() {
				if (!this.$store.state.secret_key) {
					const {
						confirm
					} = await uni.showModal({
						title: "提示：",
						content: "您未输入秘钥，背诵记录将无法保存，是否仍然进行背诵？"
					})

					if (confirm) {
						uni.reLaunch({
							url: "/pages/word_input/word_input"
						})
					}
					return
				}
				
				// 判断是否有未背诵的
				const recover = uni.getStorageSync("recover")
				const isRecover = recover.length == 0 ? false : true
				if(isRecover){
					// 有没背完的
					const {
						confirm
					} = await uni.showModal({
						title: "您之前还有未背完的单词，是否继续？",
					})
					if(confirm){
						this.$store.commit("recoverWordList",recover)
						uni.reLaunch({
							url: "/pages/word_input/word_input"
						})
						return
					}
				}
				// 开始背单词
				const {
					confirm
				} = await uni.showModal({
					title: "是否开始背单词",
				})
				if (confirm) {
					uni.reLaunch({
						url: "/pages/word_input/word_input"
					})
				}
			},


		}
	}
</script>

<style lang='scss' scoped>
	.index-box {
		height: calc(100vh - var(--window-top));
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	/deep/.uni-fab__circle {
		transform: scale(.8);
	}

	/deep/.uni-fab {
		transform: scale(.8);
	}

	/deep/.uni-fab__content--other-platform[data-v-7d5a6316] {
		box-shadow: 0 0 10rpx 2rpx #fff
	}

	.start-button {
		width: 400rpx;
		height: 400rpx;

		line-height: 400rpx;
		text-align: center;
		font-size: 30rpx;
		font-weight: 700;
		color: #fff;
		border-radius: 50%;
		/* box-shadow: 0 0 16rpx 4rpx #ffffff; */
		background-color: #aaaaff;
		box-shadow: 0 8rpx 20rpx rgba(0, 0, 0, 0.2),
			/* 外阴影，模拟按钮底部的阴影 */
			0 -8rpx 20rpx rgba(255, 200, 255, 0.3) inset;

		/* 内阴影，模拟按钮顶部的亮部，让按钮看起来凸起 */
		/* 		&:hover {
			color: #000;
			cursor: pointer;
			background-color: #9b9be8;
		} */
	}

	.secret-box {
		display: flex;
		align-items: center;
		position: absolute;
		bottom: 19vh;

		input {
			width: 8vw;
			height: 3vh;
			border: 1px solid #000;
			margin: 0 1vw;
		}
	}
</style>