import { writeFileSync, existsSync, mkdirSync } from "fs";
import lighthouse from "lighthouse";
import chromeLauncher from "chrome-launcher";
import { lhDesktopConfig } from "../config/lhDesktopConfig.js"; 
import { lhMobileConfig } from "../config/lhMobileConfig.js";
import { chromeConfig } from "../config/chromeConfig.js";
import { urlList } from "../urlList/urls.js";

class Lighthouse {
  constructor() {
    this.options;
    this.chrome;
    this.reportDirectory = "results";
    this.deviceType = "desktop"; //Setting default to Desktop
    this.finalLhConfig = lhDesktopConfig;
  }

  async setEnv() {
    this.chrome = await chromeLauncher.launch({ chromeFlags: chromeConfig });
    this.options = { logLevel: "info", output: "html", port: this.chrome.port };
    if (process.env.categories) {
      this.options.onlyCategories = [];
      const multipleCategories = process.env.categories.split(',');
      for (let i = 0; i < multipleCategories.length; i++) {
        this.options.onlyCategories.push(multipleCategories[i])
      }
    }
  }

  async makeReportDirectory() {
    try {
      if (!(await existsSync(`${this.reportDirectory}`))) {
        await mkdirSync(`${this.reportDirectory}`);
      }
    } catch (err) {
      console.error(err);
    }
  }

  async triggerLighthouse(urlArray, deviceType) {
    if (deviceType === "mobile") {
      this.deviceType = "mobile";
      this.finallhConfig = lhMobileConfig;
    }
    for (let i = 0; i < urlArray.length; i++) {
      const runnerResult = await lighthouse(
        urlArray[i].url,
        this.options,
        this.finalLhConfig
      );
      const reportHtml = await runnerResult.report;
      writeFileSync(
        `${this.reportDirectory}/${urlArray[i].pageName}-${this.deviceType}.html`,
        reportHtml
      );
    }
  }

  async closeConnection() {
    await this.chrome.kill();
  }

  async completeAudit(urlList, deviceType) {
    await this.setEnv();
    await this.makeReportDirectory();
    await this.triggerLighthouse(urlList, deviceType);
    await this.closeConnection();
  }
}

const lighthouseTest = new Lighthouse();
await lighthouseTest.completeAudit(urlList, process.env.deviceType);
