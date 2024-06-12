<template>
	<view class="word_input-box">
		<div class="show-text">
			<text>{{word}}</text>
			<text class="translate">{{translate}}</text>
		</div>
		<div class="input-box">
			<input type="text" placeholder="请输入英文" v-model="word">
			<input type="text" placeholder="请输入翻译" v-model="translate">
			<picker mode="selector" :range='selectList' :value="index" @change="selectChange">
				<view class="repeat-title"><text>请选择单词重复次数：</text> {{selectList[index]}}</view>
			</picker>
		</div>
		<button size='mini' type='primary' :disabled="isDisable"  @click="goToDetail">确认</button>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				word: "",
				translate: "",
				selectList: [
					3, 5, 10
				],
				index: 0,
				isDisable: true,
			};
		},
		watch: {
			isDisableBotton(e) {
				if (e) return this.isDisable = false
				this.isDisable = true
			}
		},
		computed: {
			isDisableBotton() {
				return this.word !== "" && this.translate !== ""
			}
		},
		methods: {
			selectChange(e) {
				this.index = e.detail.value
			},
			goToDetail(){
				let obj = {
					word:this.word,
					translate:this.translate,
					num:this.selectList[this.index]
	
				}
					uni.navigateTo({
						url:`/pages/word_memorize/word_memorize?obj=${JSON.stringify(obj)}`
					})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.word_input-box {
		height: calc(100vh - var(--window-top));
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding-top: 20vh;
		.show-text {
			width: 80vw;
			height: 260rpx;
			box-shadow: 
			 0 5rpx 8rpx 4rpx #c6c6c6,
			0 -5rpx 10rpx 4rpx #eee inset;
			box-sizing: border-box;
			text-align: center;	
			background-color: #fff;
			display: flex;
			flex-direction: column;
			justify-content: space-around;
			font-size: 34rpx;
			color: #000000;
			font-weight: 800;
			.translate{
				font-size: 28rpx;
				color: #000;
				font-weight: 500;
			}
		}

		.input-box {
			margin-top: 50rpx;
			font-size: 24rpx;
			input {
				margin: 20rpx auto;
				font-size: 28rpx;
				width: 80vw;
				height: 90rpx;
				border: 1px solid #fff;
			}
			.repeat-title {
				color: #878787;
				height: 50rpx;
				font-size: 28rpx;
				line-height: 50rpx;
				
			}
		}

		button {
			width: 80vw;
			margin-top:50rpx;
			height: 6vh;
			line-height: 6vh;
		}
	}
</style>