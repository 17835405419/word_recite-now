<script>
	import store from "@/store/index.js"
	export default {
		 data(){
			return{
				isBackground: false, // 用于标记应用是否处于后台
			}
		},
		onLaunch: function() {
		},
		onShow: function() {
			 if (this.isBackground) {
			      this.isBackground = false; // 应用从后台回到前台，重置标志
			      // 此处不清理缓存，因为应用只是从后台恢复
			    } else {
			      // 应用从关闭状态启动，此处可以清理单词列表的缓存
			      // 清除单词列表的缓存
			      uni.removeStorageSync("historyLists")
			    }
		},
		onHide: function() {

			 this.isBackground = true; // 应用进入后台时设置标志
			 // 存储当前背诵的单词 
			 uni.setStorageSync("recover",store.state.wordInfoList)
		},

	}
</script>

<style>
	/*每个页面公共css */
	page {
		background: linear-gradient(to bottom, rgba(242, 216, 255, 0.8) 35%, rgba(255, 255, 255, 0.8) 100%);
		/* 淡化的渐变背景 */
		backdrop-filter: blur(10px);
		/* 应用背景模糊效果 */
		min-height: calc(100vh - var(--window-top));
	}
</style>
