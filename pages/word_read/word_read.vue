<template>
	<view class="word_read-box">
		<view class="main">
			<view class="word-box" @click="run(index,obj.num)" :style="{'zIndex':obj.num - index}"
				:animation="activeId === index && index + 1 !== obj.num ? animationData: '' "
				v-for="(item,index) in obj.num" :key="index">
				<word-card class="item" :obj="obj" ref="cardItem" :index="index"></word-card>
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
	import WordCard from "@/components/WordCard/WordCard.vue"
	import {
		saveWordListToDB
	} from "@/utils/index.js"
	export default {
		components: {
			WordCard
		},
		data() {
			return {
				obj: {},
				animationData: {},
				activeId: 0
			};
		},
		onLoad(e) {
			this.obj = JSON.parse(e.obj)
		},
		onShow() {
			var animation = uni.createAnimation({
				transformOrigin: "-10% 50%",
				duration: 800,
				timingFunction: 'ease',
			})
			this.animation = animation

		},

		methods: {
			run(index, count) {
				this.activeId = index
				this.animation.rotate(100).opacity(0).step()
				this.animationData = this.animation.export()
			},
			lookTranSlate() {
				// 调用显示答案方法
				this.$refs.cardItem.forEach(item => item.isShowAnswerFuc())
			},
			continueRecite() {
				// 继续背诵
				// this.activeId  < this.obj.num - 2  最后一页不需要点击了
				if (this.activeId < this.obj.num - 2) return uni.showToast({
					title: "背诵次数未完成",
					icon: "none"
				})

				// 存储至vuex列表
				this.$store.commit("ListPush", this.obj)

				// 如果vuex 存储的数据 > 1 表明需要从第一个开始往后复习
				if (this.$store.state.wordInfoList.length > 1) {

					uni.reLaunch({
						url: "/pages/word_repeat/word_repeat"
					})

					return
				}
				// 否则 则跳转至输入单词界面

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
					if (wordInfoList.length === 0) {
						// 	// 第一种情况只背了一个单词就结束 将该次存储至数据库
						// 	// uni.setStorageSync("wordList", this.obj) 
						await saveWordListToDB(this.$store.state.secret_key, Array(this.obj))
					} else {
						//之前是只有点击继续背诵才会存储  最后一页无法添加至vuex 特作出此处理  
						wordInfoList.push(this.obj)
						//先存储至本地
						uni.setStorageSync("wordList", wordInfoList)
						await saveWordListToDB(this.$store.state.secret_key, wordInfoList)
					}
					// 删除vuex的单词
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
			bottom:16vh;
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