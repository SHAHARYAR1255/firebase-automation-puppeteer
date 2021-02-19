const puppeteer = require("puppeteer");
const { v4: uuidv4 } = require("uuid");

const { Storage } = require("@google-cloud/storage");
// const express = require("express");
// const app = new express();

const storage = new Storage({
  keyFilename: "./serviceAccountKey.json",
});

const link = process.argv[2];
const name = process.argv[3];

const takeSS = async (url, count) => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    await page.screenshot({ path: `./shots/${count}.png` });

    await browser.close();
  } catch (error) {
    console.log(error.message, "message");
    try {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto(url);
      await page.screenshot({ path: `./shots/${count}.png` });

      await browser.close();
    } catch (error) {
      console.log(error.message, "message2");
    }
  }
};

let bucketName = "roadtofirebase-ae0cc.appspot.com";

// let filename = "./shots/0.png";

const uploadFile = async (filename, destination) => {
  try {
    // Uploads a local file to the bucket
    await storage.bucket(bucketName).upload(filename, {
      // Support for HTTP requests made with `Accept-Encoding: gzip`
      gzip: true,
      destination,
      // By setting the option `destination`, you can change the name of the
      // object you are uploading to a bucket.
      metadata: {
        metadata: {
          firebaseStorageDownloadTokens: uuidv4(),
        },
        // Enable long-lived HTTP caching headers
        // Use only if the contents of the file will never change
        // (If the contents will change, use cacheControl: 'no-cache')
        // cacheControl: "public, max-age=31536000",
      },
    });
    console.log(`${filename} uploaded to ${bucketName}.`);
  } catch {
    (error) => {
      console.log(error);
    };
  }
};

const data = [link];
console.log(data, "data");
console.log(name, "name");

data.forEach(async (dat) => {
  await takeSS(dat, name);
  await uploadFile(`./shots/${name}.png`, `store/${name}.png`);
});

// app.listen(process.env.PORT || 8088, () => {
//   console.log("node server running");
// });
