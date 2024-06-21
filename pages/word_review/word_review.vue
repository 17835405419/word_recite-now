<template>
	<view class="word_read-box">
		<view class="main">
			<!-- caole   啊啊啊啊啊    :key="nowEnglistIndex"  没有添加key导致循环的动画影响  nowEnglistIndex相当于一组卡片的key -->
			<view class="word-box" :key="nowEnglistIndex + '-' + index"
				:style="{'zIndex':englishLists[nowEnglistIndex].num - index}"
				:animation="activeId === index+1 && index + 1 !== englishLists[nowEnglistIndex].num ? animationData: '' "
				v-for="(item,index) in englishLists[nowEnglistIndex].num" @click="run(index)">
				<word-card class="item" types="repeat" :obj="englishLists[nowEnglistIndex]"
					:repeatWordNum='englishLists[nowEnglistIndex].num' :index="index" ref="cardItem"></word-card>
			</view>
		</view>

		<view class="botton-box">
			<button @click="lookTranSlate">查看翻译</button>
			<button @click="returnOneWords" v-if="isShowUpButton">上个单词</button>
			<button @click="continueRecite" :disabled="isEndWords">继续背诵</button>
		</view>
		<image class="aiIcon" @click="openAi(englishLists[nowEnglistIndex].word)" src="../../static/ai.png" mode="aspectFill"></image>
		<!-- ai 造句弹窗 -->
		<uni-popup ref="popup" padding>
			<AiSentence :englishWord="englishWord"/>
		</uni-popup>
		<!-- 		<view class="endRecite" @click="endRecite">
			<uni-icons type="undo" size="25"></uni-icons>
		</view> -->
	</view>
</template>

<script>
	import WordCard from "@/components/WordCard/WordCard.vue"
	export default {
		components: {
			WordCard
		},
		data() {
			return {
				englishLists: [],
				nowEnglistIndex: 0,
				animationData: {},
				activeId: 0,
				isShowUpButton: false,
				isEndWords: false,
				englishWord:""  //需要往子组件传递的单词
			};
		},
		onLoad(e) {
			this.englishLists = JSON.parse(e.englissLists)

		},
		
		onShow() {
			var animation = uni.createAnimation({
				transformOrigin: "-10% 50%",
				duration: 800,
				timingFunction: 'ease',
			})
			this.animation = animation

		},
		watch: {
			"nowEnglistIndex": {
				handler(news, olds) {
					if (news !== 0) {
						this.isShowUpButton = true
					} else {
						this.isShowUpButton = false
					}
					if (news == this.englishLists.length - 1) {
						this.isEndWords = true
					} else {
						this.isEndWords = false
					}
				}
			}
		},
		methods: {
			run(index) {
				this.activeId = index + 1
				this.animation.rotate(100).opacity(0).step()
				this.animationData = this.animation.export()
			},

			lookTranSlate() {
				// 调用显示答案方法
				this.$refs.cardItem.forEach(item => item.isShowAnswerFuc())
			},
			continueRecite() {
				if (this.nowEnglistIndex < this.englishLists.length - 1) {
					this.nowEnglistIndex++
					this.activeId = 0; // 重置activeId确保下一个单词从头开始
					this.animationData = {}; // 清除之前的动画数据
				}

			},
			// 返回上一个单词
			returnOneWords() {
				if (this.nowEnglistIndex !== 0) {
					this.nowEnglistIndex--
				}
			},
			async openAi(englishWord){
				const {confirm} =await uni.showModal({
					content:"是否使用ai造句？"
				})
				if(confirm){
					this.englishWord = englishWord
					this.$refs.popup.open()
					
				}
			}
			// endRecite() {
			// 	// 跳转
			// 	uni.navigateBack()
			// }

		}

	}
</script>

<style lang="scss" scoped>
	.word_read-box {
		height: calc(100vh - var(--window-top));
		box-sizing: border-box;

		.main {
			padding-top: 18vh;
		}

		.word-box {
			position: relative;
			display: flex;
			justify-content: center;

			.item {
				position: absolute;
			}
		}

		.botton-box {
			width: 100vw;
			position: fixed;
			bottom: 16vh;
			left: 0;
			display: flex;

			button {
				height: 6vh;
				line-height: 6vh;
				font-size: 24rpx;
			}
		}
		.aiIcon{
			width: 60rpx;
			height: 60rpx;
			position: absolute;
			right: 70rpx;
			top: 100rpx;
		}
		// .endRecite {
		// 	position: absolute;
		// 	right: 30rpx;
		// 	top: 30rpx;
		// 	text-align: center;
		// 	line-height: 60rpx;
		// }
	}
</style>