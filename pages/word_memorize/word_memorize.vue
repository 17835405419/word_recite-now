<template>
	<view class="word_detail-box">
		<view class="word-show">
			<text> {{obj.word}}</text>
			<text class="translate">{{obj.translate}}</text>
		</view>
		<view class="time-box">
			<text class="title">倒计时</text>
			<uni-countdown :show-day="false" :minute="minute" :second="second" @timeup="timeEnd"
				ref="countdown"></uni-countdown>
		</view>
		<view class="botton-box">
			<button size="mini" @click="extendTime" type="default">时间恢复</button>
			<button size="mini" @click="startRead" type="primary">开始速记</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				minute: 1,
				second: 0,
				obj: {

				}
			};
		},
		onLoad(e) {
			// 上个页面传递的信息
			this.obj = JSON.parse(e.obj)
		},
		methods: {
			timeEnd() {
				uni.reLaunch({
					url: `/pages/word_read/word_read?obj=${JSON.stringify(this.obj)}`
				})
			},
			extendTime() {
				this.minute == 1
				// 调用刷新组件显示方法
				this.$refs.countdown.update()
			},
			startRead() {
				uni.reLaunch({
					url: `/pages/word_read/word_read?obj=${JSON.stringify(this.obj)}`
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.word_detail-box {
		height: calc(100vh - var(--window-top));
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-evenly;
	}

	.word-show {
		text-align: center;

		text {
			display: block;
			font-size: 60rpx;
			color: #000000;
			font-weight: 800;
		}

		.translate {
			padding-top: 10rpx;
			font-size: 40rpx;
			color: #000;
			font-weight: 500;
		}
	}

	.time-box {
		width: 400rpx;
		height: 400rpx;
		background-color: #fff;
		box-shadow:
			0 5rpx 8rpx 4rpx #c6c6c6,
			0 -5rpx 10rpx 4rpx #eee inset;
		border-radius: 50%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin-top: -120rpx;
	}

	.botton-box {
		display: flex;
		width: 100%;
		justify-content: space-evenly;
		button{
			height: 5vh;
			line-height: 5vh;
		}
	}
</style>