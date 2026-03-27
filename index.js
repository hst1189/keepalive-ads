const { chromium } = require('playwright');
const domains = ['grapehut.dpdns.org', 'gmeek.dpdns.org'];

async function main() {

  let browser;
  let page;

  try {
    browser = await chromium.launch({
      headless: false, // 是否启用无头模式，默认为true
      viewport: { width: 1280, height: 720 }
    });

    page = await browser.newPage();
    page.setDefaultTimeout(30000);

    let i = Math.floor(Math.random() * domains.length);
    console.log(`📱 - 正在访问网站 ${domains[i]}...`);
    await page.goto(`http://${domains[i]}`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(5000);

    console.log(`🔑 - 点击...`);
    await page.mouse.click(640, 360)
    await page.waitForTimeout(5000);

    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(5000);

  } catch (e) {
    console.log(`❌ - 异常: ${e.message}`);

  } finally {
    if (page) await page.close();
    await browser.close();
    console.log(`🎉 - 网页关闭`);
  }
}

main().catch(console.error);
