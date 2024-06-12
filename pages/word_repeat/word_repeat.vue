<template>
	<view class="word_read-box">
		<view class="main">
			<view class="word-box" :style="{'zIndex':wordInfoList.length - index}"
				:animation="activeId === index+1 && index + 1 !== wordInfoList.length ? animationData: '' "
				v-for="(item,index) in wordInfoList" :key="index" @click="run(index)">
				<word-card class="item" types="repeat" :obj="item" :repeatWordNum='wordInfoList.length' :index="index"
					ref="cardItem"></word-card>
			</view>
		</view>
		<view class="botton-box">
			<button @click="lookTranSlate">查看翻译</button>
			<button @click="continueRecite">继续背诵</button>

		</view>
		<view class="endRecite" @click="endRecite">
			<uni-icons type="checkmarkempty" size="25"></uni-icons>
		</view>
	</view>
</template>

<script>
	import {
		saveWordListToDB
	} from "@/utils/index.js"
	import WordCard from "@/components/WordCard/WordCard.vue"
	import {
		mapState
	} from "vuex"
	export default {
		components: {
			WordCard
		},
		data() {
			return {
				animationData: {},
				activeId: 0,

			};
		},
		onShow() {
			var animation = uni.createAnimation({
				transformOrigin: "-10% 50%",
				duration: 800,
				timingFunction: 'ease',
			})
			this.animation = animation

		},
		computed: {
			...mapState(["wordInfoList"])
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
				// 继续背诵
				if (this.activeId < this.wordInfoList.length - 1) return uni.showToast({
					title: "背诵次数未完成",
					icon: "none"
				})

				uni.reLaunch({
					url: "/pages/word_input/word_input"
				})

			},

			async endRecite() {
				// 显示确认框
				const {
					confirm
				} = await uni.showModal({
					title: "是否确认完成背诵？"
				})
				if (confirm) {
					let wordInfoList = this.$store.state.wordInfoList
					// 先存储至本地
					// uni.setStorageSync("wordList", wordInfoList)
					await saveWordListToDB(this.$store.state.secret_key, wordInfoList)
					// 清楚单词列表
					this.$store.commit("deleteWordList")
					// 清除 单词列表的缓存
					uni.removeStorageSync("historyLists")
					// 跳转

					// 跳转至首页
					uni.reLaunch({
						url: "/pages/index/index"
					})

				}
			}

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

		.endRecite {
			position: absolute;
			right: 30rpx;
			top: 30rpx;
			text-align: center;
			line-height: 60rpx;
		}
	}
</style>