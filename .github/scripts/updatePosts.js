const axios = require('axios');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const fs = require('fs')
const { Octokit, App } = require("octokit");

axios
  .get("https://www.capocaccia.dev/")
  .then(function (response) {
    const dom = new JSDOM(response.data);
    const header = dom.window.document.querySelector('[data-testid="hero-header"]');
    const excerpt = dom.window.document.querySelector('[data-testid="hero-post-excerpt"]')
    const content = `${header.textContent} - ${excerpt.textContent}`
    const octo = new Octokit({auth: process.env['GITHUB_TOKEN']})
    const repo = process.env['GITHUB_REPOSITORY']
    const readMe = octo.readMe(repo)
    console.log(readMe)

   });