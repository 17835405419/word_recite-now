/* 
	涉及到数据库的共用函数
 */

const db = uniCloud.database()


// 查询密钥
export const activationkey = async (key) => {
	try {
		const {
			result
		} = await db.collection("secret").where({
			"secret_key": key
		}).get()

		if (result.data.length != 0) {
			return true
		}

	} catch (e) {
		//TODO handle the exception
		return false
	}


}


export const saveWordListToDB = async (secret_key, wordList) => {
	if (!secret_key) {
		return uni.showToast({
			title: "抱歉您未登录",
			icon: "none"
		})
	}
	let obj = {}
	obj = {
		secret_key: secret_key,
		english_list: wordList
	}
	await db.collection("word").add(obj)
	return true
}

// 获取背诵历史列表

export const getEnglishLists = async (secret_key) => {
	try {
		if (!secret_key) {
			return uni.showToast({
				title: "抱歉您未登录",
				icon: "none"
			})
		}

		// 判断是否有缓存
		const historyLists = uni.getStorageSync("historyLists")
		if (historyLists.length == 0) {
			const {
				result
			} = await db.collection("word").where({
				secret_key
			}).field("english_list,create_time").orderBy("create_time desc").get()
			uni.setStorageSync("historyLists", result)
			return result
		} else {
			return historyLists
		}

	} catch (e) {
		//TODO handle the exception
		return false
	}
}