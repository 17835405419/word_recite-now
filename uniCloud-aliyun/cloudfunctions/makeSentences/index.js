'use strict';
exports.main = async (event, context) => {
	//event为客户端上传的参数
	let url = `https://m.hao86.com/zaoju_search/${event.englishWord}/`
	const cheerio = require('cheerio')
	const result = []
	const {
		data
	} = await uniCloud.request({
		url: url,
		dataType:"html/text"
	})
	const $ = cheerio.load(data)
	$('.zaoju_article_content ul li').each(function(index, ele) {
		result.push($(this).html())
	})

	return result
};