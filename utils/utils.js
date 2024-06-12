/* 
	提取出的公共函数
 */


export const timeFormat = (timeStamp)=>{
		const time = new Date(timeStamp)
		let y = time.getFullYear()
		let m =  time.getMonth() + 1
		let d = time.getDate()
		return `(${y}-${m}-${d})`
}