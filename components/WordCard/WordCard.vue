<template>
	<view class="card">
		<view class="main">
			<view class="word">
				<text>{{obj.word}}</text>
			</view>
			<view class="translate" v-show="isShowAnswer">
				<text>{{obj.translate}}</text>
			</view>
		</view>
		<view class="num">
		
			<text>{{index + 1}}</text>/
			
			<!-- 如果为重复 则总数为单词总数  否则则为背诵总次数 -->
			<text>{{types === "repeat" ? repeatWordNum : obj.num}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		name: "WordCard",
		props: {
			obj: {
				type: Object,
				default: () => {}
			},
			index: {
				type: Number,
				default: 1
			}, //当前次数
			types: {
				/* 
					read 阅读页面    repeat 重复页面
				 */
				type: String,
				default: "read"
			}, //组件类型
			repeatWordNum: {
				type: Number,
			}
		},

		data() {
			return {
				answer: "",
				isShowAnswer: false,
				newIndex:null
			};
		},
		methods: {
			isShowAnswerFuc() {
				this.isShowAnswer = !this.isShowAnswer
			},

		}
	}
</script>

<style lang="scss" scoped>
	.card {
		box-sizing: border-box;
		width: 480rpx;
		height: 600rpx;
		background-color: #8EC5FC;
		background-image: linear-gradient(62deg, #8EC5FC 0%, #E0C3FC 100%);
		box-shadow:0 0rpx 8rpx 3rpx #eeeeee ;
		color: #fff;
		border-radius: 30rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-around;

		.main {
			font-size: 60rpx;
			color: #000000;
			font-weight: 800;
			text-align: center;

			.translate {
				padding-top: 30rpx;
				font-size: 30rpx;
				font-weight: 500;
			}
		}

		.num {
			height: 50rpx;
			font-size: 36rpx;
			text {
				padding: 0 24rpx;
				font-size: 35rpx;
			}
		}
	}
</style>