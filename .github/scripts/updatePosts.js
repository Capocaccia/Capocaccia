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
    const readMeContentEncoded = Base64.encode(content);
    octoClient.repos.deleteFile({
      // replace the owner and email with your own details
      owner: "Capocaccia",
      repo: "Capocaccia",
      path: "README.md",
      message: "Updates readme",
      content: readMeContentEncoded,
      committer: {
        name: `Octokit Bot`,
        email: "carter.capocaccia@gmail.com",
      },
      author: {
        name: "Octokit Bot",
        email: "carter.capocaccia@gmail.com",
      },
    })
    octoClient.repos.createOrUpdateFileContents({
      // replace the owner and email with your own details
      owner: "Capocaccia",
      repo: "Capocaccia",
      path: "README.md",
      message: "Updates readme",
      content: readMeContentEncoded,
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