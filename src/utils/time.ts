// 判斷當前時間為早上|上午|下午|晚上
export const getTime = () => {
  let message = ''
  const hours = new Date().getHours()
  console.log('hours__', hours)
  if (hours <= 9) {
    message = '早上'
  } else if (hours <= 12) {
    message = '上午'
  } else if (hours <= 18) {
    message = '下午'
  } else {
    message = '晚上'
  }

  console.log('hours message__', message)
  return message
}