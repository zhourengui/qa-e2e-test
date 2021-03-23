const { Builder, until, By } = require("selenium-webdriver")
// 这个文件里面的东西是如何模拟浏览器弹窗 点击确认按钮 点击关闭按钮 提示信息等
;(async () => {
  let driver = await new Builder().forBrowser("chrome").build() // 打开无头浏览器
  try {
    await driver.get("https://www.baidu.com") // 跳转到目标地址
    await driver.findElement(By.className("qrcode-layer")).click() // 这个是模拟点击后出现弹窗
    // 要想继续走下去必须到弹出的网页的console面板 alert(xxx)不然一直卡在这
    await driver.wait(until.alertIsPresent()) // 这个地方会监听网页上是否有弹窗
    let alert = await driver.switchTo().alert()
    let alertText = await alert.getText()
    await alert.sendKeys("Selenium") // 这个东西是用在window.promt 替换占位符文本 想要验证这个必须在网页的控制台输入window.promt()
    await alert.accept() // 这个是模拟点击确认按钮
    await alert.dismiss() // 这个是模拟点击取消按钮
    await driver.wait(() => {}, 10000)
  } finally {
    await driver.quit() // 退出浏览器
  }
})()
