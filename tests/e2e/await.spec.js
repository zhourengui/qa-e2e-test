const { Builder, until, By } = require("selenium-webdriver")
const assert = require("assert")
// 这个文件是等待的方法
// Selenium客户可以使用命令式，程序性语言进行显式等待。
// 它们允许您的代码暂停程序执行或冻结线程，直到传递给它的条件解决为止。
// 以一定的频率调用该条件，直到等待超时超时为止。这意味着只要条件返回虚假值，它将一直尝试并等待。
;(async () => {
  let driver = await new Builder().forBrowser("chrome").build() // 打开无头浏览器
  try {
    await driver.get("https://www.baidu.com")
    // 因为等待将不会吞没找不到元素时引发的此类元素错误，所以条件将重试直到找到元素。然后它将使用返回值WebElement，并将其传递回我们的脚本。
    // 如果条件失败，例如从未达到该条件的真实返回值，则等待将抛出/引发一个错误/异常，称为超时错误。
    let ele = await driver.wait(until.elementLocated(By.css("p")), 10000)
    let foo = await ele.getText()
    assert(foo == "Hello from JavaScript")
  } finally {
    await driver.quit() // 退出浏览器
  }
})()
