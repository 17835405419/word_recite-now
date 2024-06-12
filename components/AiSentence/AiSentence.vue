<template>
	<view class="ai_sentence">
		<uni-card :title="englishWord" extra="AI造句">
			<view v-html="htmlData">

			</view>
			<uni-pagination pageSize="5" :total="aiSentenceCache.sentenceList.length"
				@change="changePage"></uni-pagination>
		</uni-card>
	</view>
</template>

<script>
	export default {
		name: "AiSentence",
		props: {
			englishWord: {
				type: String
			}
		},
		data() {
			return {
				htmlData: '',
				aiSentenceCache: uni.getStorageSync("aiSentenceCache") || null,
				startNum: 0,
				endNum: 5,
			};
		},
		created() {
			this.getDate()
		},
		computed: {

		},
		methods: {
			getDate() {
	
				if (!this.aiSentenceCache || this.englishWord !== this.aiSentenceCache.englishWord) {
					uni.showLoading()
					// 请求接口
					uniCloud.callFunction({
						name: "makeSentences",
						data: {
							englishWord: this.englishWord
						}
					}).then(res => {
						// 设置缓存
						uni.setStorageSync("aiSentenceCache", {
							englishWord: this.englishWord,
							sentenceList: res.result
						})
						// 赋值
						this.htmlData = res.result.slice(0, 5).join('<br/>')
						uni.hideLoading()
					})
				} else {
					this.htmlData = this.aiSentenceCache.sentenceList.slice(0, 5).join('<br/>')
				}
			},
			changePage(e) {
				const aiSentenceCache = uni.getStorageSync("aiSentenceCache") 
				if (e.type == "next") {
					this.startNum += 5
					this.endNum += 5
					this.htmlData = aiSentenceCache.sentenceList.slice(this.startNum, this.endNum).join('<br/>')
				}else if(e.type == "prev"){
					this.startNum -= 5
					this.endNum -= 5
					this.htmlData =aiSentenceCache.sentenceList.slice(this.startNum, this.endNum).join('<br/>')
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.uni-card {
		box-sizing: border-box;
		min-height:40vh;
		width: 80vw;

		/deep/em {
			color: red;
			padding: 10rpx;
			font-style: normal;
		}

		.uni-pagination {
			margin-top: 20rpx;
		}

	}
</style>