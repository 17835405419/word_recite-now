<template>
	<view class="word_list-box">
		<uni-collapse ref="collapse">
			<uni-collapse-item v-for="(item,index) in englishList" :key="index" :name="index">
				<!-- 抽屉框标题 -->
				<template v-slot:title>
					<view class="title-box">
						<text class="title">{{item.english_list[0].word}}</text>
						<text class="time">
							{{timeFormat(item.create_time)}}
						</text>
					</view>
				</template>

				<ul>
					<view class="review" @click="review(item.english_list)">
						回顾
					</view>
					<li v-for="(item1,index1) in item.english_list" :key="index1">{{item1.word}}
						<text
							@click="isShowTranslate(index,index1)"
							:style="{color:listIndex === index && traSlateIndex === index1  ? '#191919': ''}"
							>{{listIndex === index && traSlateIndex === index1  ? item1.translate: "查看翻译"}}</text>
					</li>
				</ul>
			</uni-collapse-item>
		</uni-collapse>
	</view>
</template>

<script>
	import {
		timeFormat
	} from "@/utils/utils.js"
	import {
		getEnglishLists
	} from "@/utils/index.js"
	export default {
		data() {
			return {
				englishList: [],
				isShow: false,
				listIndex: null,
				traSlateIndex: null,

			};
		},
		onLoad() {
			this.getListData()
		},
		methods: {
			// 外部导入的函数要在templete中使用 必须在methods中注册
			timeFormat,
			async getListData() {
				uni.showLoading()
				const result = await getEnglishLists(this.$store.state.secret_key)
				uni.hideLoading()
				this.englishList = result.data

			},
			review(englishLists){
				uni.navigateTo({
					url:`/pages/word_review/word_review?englissLists=${JSON.stringify(englishLists)}`
				})
			},
			// 是否显示翻译
			isShowTranslate(index, index1) {
				if (this.traSlateIndex == index1) {
					return this.traSlateIndex = null
				}
				this.listIndex = index
				this.traSlateIndex = index1
			}
		}
	}
</script>

<style lang="scss" scoped>
	.word_list-box {

		ul,
		li {
			list-style: none;
		}
		.review{
			text-align: center;
			font-weight: 800;
		}
		li {
			height: 3vh;
			line-height: 3vh;
			padding: 1vh 8vw;
			font-size: 13px;
			display: flex;
			justify-content: space-between;
			
			text {
				color: #848484;
				padding-right: 5vw;
			}
		}

		.title-box {
			display: flex;
			justify-content: space-between;
			padding: 20rpx;
			font-size: 15px;

			.time {
				font-size: 13px;
			}
		}
	}
</style>