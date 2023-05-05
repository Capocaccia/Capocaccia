const axios = require('axios');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const fs = require('fs')
const { Octokit } = require("@octokit/rest");
const { Base64 } = require("js-base64");

axios
  .get("https://www.capocaccia.dev/")
  .then(function (response) {
    const dom = new JSDOM(response.data);
    const header = dom.window.document.querySelector('[data-testid="hero-header"]');
    const excerpt = dom.window.document.querySelector('[data-testid="hero-post-excerpt"]')
    const content = `${header.textContent} - ${excerpt.textContent}`
    const octoClient = new Octokit({auth: process.env['GITHUB_TOKEN']})
    const repo = process.env['GITHUB_REPOSITORY']
    const readMeContent = fs.readFileSync("./readMe.md", "utf-8");
    const readMeContentEncoded = Base64.encode(content);
    octokit.repos.createOrUpdateFileContents({
      // replace the owner and email with your own details
      owner: "Capocaccia",
      repo: "Capocaccia",
      path: "readMe.md",
      message: "Updates readme",
      content: contentEncoded,
      committer: {
        name: `Octokit Bot`,
        email: "carter.capocaccia@gmail.com",
      },
      author: {
        name: "Octokit Bot",
        email: "carter.capocaccia@gmail.com",
      },
    });
   });