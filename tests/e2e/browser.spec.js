// browser.js 这个文件里面的方法都是对浏览器的操作
const { Builder, By } = require("selenium-webdriver")
const fs = require("fs")

;(async () => {
  let driver = await new Builder().forBrowser("chrome").build() // 打开无头浏览器
  try {
    // 浏览器导航
    await driver.get("https://www.baidu.com") // 跳转到目标地址
    const currentUrl = await driver.getCurrentUrl() // 获取当前url地址
    // currentUrl = https://www.baidu.com
    await driver.navigate().back() // 浏览器的后退按钮
    await driver.navigate().forward() // 浏览器的前进按钮
    await driver.navigate().refresh() // 浏览器刷新
    const pageTitle = await driver.getTitle() // 获取页面标题
    // pageTitle = 百度一下，你就知道
    const windowHandle = await driver.getWindowHandle() // 每个window窗口都有一个唯一标识 这个方法是获取页面标识
    // widnowHandle = CDwindow-7EF1E8C65D989D8EB7DE9190B4B8A7E1
    await driver.switchTo().newWindow("tab") // 创建新标签
    await driver.switchTo().newWindow("window") // 创建新的window窗口
    // await driver.close() // 关闭窗口
    await driver.switchTo().window(windowHandle) // 切换窗口

    // Iframe操作 因为这部分是模拟的 如果不注释会报错 可以根据实际情况修改
    // 进入Iframe内部 下面的方法选其一
    // 方法一 使用标签获取
    // const iframe = driver.findElement(By.css("#modal > iframe"))
    // await driver.switchTo().frame(iframe)
    // await driver.findElement(By.css("button")).click()
    // // 方法二 使用name或者id 推荐使用这个
    // await driver.switchTo().frame("buttonframe")
    // await driver.switchTo().frame("myframe")
    // await driver.findElement(By.css("button")).click()
    // // 方法三
    // await driver.switchTo().frame(1)

    // await driver.switchTo().defaultContent() // 退出iframe

    // window管理
    const { width, height, x, y } = await driver.manage().window().getRect() // 获取窗口的宽高 位置
    // width=1200 height=927 x=22 y=45
    await driver
      .manage()
      .window()
      .setRect({ width: 1024, height: 768, x: 100, y: 100 }) // 设定窗口大小和位置

    await driver.manage().window().maximize() // 窗口最大化
    await driver.manage().window().minimize() // 窗口最小化
    await driver.manage().window().fullscreen() // 全屏窗口

    const screenEncodeString = driver.takeScreenshot() // 截屏
    // await fs.writeFileSync("./image.png", screenEncodeString, "base64") 可以将截到的数据写入一个文件中

    await driver.get("https://www.baidu.com")
    const ele = await driver.findElement(By.id("lg")) // 获取元素
    const eleEncodedString = await ele.takeScreenshot(true) // 截取获取到的元素
    await fs.writeFileSync("./image.png", eleEncodedString, "base64") // 写入文件

    // await driver.wait(() => {}, 3000) // 这个是让程序等待3秒 因为没有这个整个过程太快了所以可以打开这个注释。
  } finally {
    await driver.quit() // 退出浏览器
  }
})()
