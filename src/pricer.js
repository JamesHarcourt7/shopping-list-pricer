// Shamelessly stolen simple server code from the Internet.

const http = require("http");
const fs = require("fs");
const webdriver = require("selenium-webdriver");
const { Driver } = require("selenium-webdriver/chrome");
const request = require("request");
const PORT = 3000;

const server = http.createServer((req, res) => {
    var request;
    if (req.url == "/") {
        request = "index.html";
    } else {
        request = req.url.substring(1);
    }
    
    if (request == "index.html") {
        res.statusCode = 200;
        var request = req.url.substring(1);

        console.log("request: " + req.url);
        res.setHeader("Content-Type", "text/html");

        fs.createReadStream("src/index.html").pipe(res);

    } else if (request.startsWith("?param=")) {
        res.end(request.substring(7));
    }
    else {
        res.end("Invalid URL mate.");
    }
});

server.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}/`);
});

(async function main() {
    let url = "https://www.sainsburys.co.uk/gol-ui/SearchDisplayView?filters[keyword]=baguette";
    let driver = new webdriver.Builder()
            .forBrowser("firefox")
            .build();
    try {
        await driver.get("http://www.google.com/ncr");
        await driver.findElement(webdriver.By.name("q")).sendKeys("webdriver");
        await driver.wait(webdriver.until.titleIs("webdriver - Google Search"), 1000);
    } finally {
        await driver.quit();
    }
})