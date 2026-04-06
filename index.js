const { chromium } = require('playwright');
const domains = ['grapehut.dpdns.org', 'gmeek.dpdns.org'];

async function main() {

  const browser = await chromium.launch({
    headless: false,
    channel: 'chrome',
  });
  const context = await browser.newContext();
  const page = await context.newPage();

  try {  	
    let i = Math.floor(Math.random() * domains.length);
    console.log(`📱 - 正在访问网站 ${domains[i]}...`);
    await page.setDefaultNavigationTimeout(60000); 
    await page.goto(`https://${domains[i]}`);
    page.locator('iframe[style*="z-index"]').nth(0).waitFor({ state: 'visible' }) 
    
    console.log(`🔑 - 点击...`);
    await page.locator('iframe[style*="z-index"]').nth(0).click();
    await page.waitForTimeout(10000);

  } catch (e) {
    console.log(`❌ - 异常: ${e.message}`);

  } finally {
    console.log(`🎉 - 网页关闭`);
    if (page) await page.close();
    if (context) await context.close();
    if (browser) await browser.close();
  }
}

main().catch(console.error);
