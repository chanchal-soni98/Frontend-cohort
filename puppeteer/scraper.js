const puppeteer = require('puppeteer');

async function scrapeGitHubProfile(username) {
  const url = `https://github.com/${username}`;

  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();

  try {
    await page.goto(url, { waitUntil: 'networkidle2' });

    const data = await page.evaluate(() => {
      const fullName = document.querySelector('h1.vcard-names span.p-name')?.innerText.trim() || null;
      const userName = document.querySelector('h1.vcard-names span.p-nickname')?.innerText.trim() || null;
      const bio = document.querySelector('div.p-note')?.innerText.trim() || null;

      const repo = document.querySelector('a[href$="?tab=repositories"] span.Counter')?.innerText.trim() || '0';
      const followers = document.querySelector(`a[href$="?tab=followers"] span.Counter`)?.innerText.trim() || '0';
      const following = document.querySelector(`a[href$="?tab=following"] span.Counter`)?.innerText.trim() || '0';

      return {
        fullName,
        userName,
        bio,
        repo: parseInt(repo.replace(',', '')),
        followers: parseInt(followers.replace(',', '')),
        following: parseInt(following.replace(',', '')),
      };
    });

    // Navigate to repositories tab
    await page.goto(`${url}?tab=repositories`, { waitUntil: 'networkidle2' });
    await page.waitForSelector('li[itemprop="owns"]');

    const topRepos = await page.evaluate(() => {
      const repos = Array.from(document.querySelectorAll('li[itemprop="owns"]')).slice(0, 10);

      const parsedRepos = repos.map(repo => {
        const name = repo.querySelector('a[itemprop="name codeRepository"]')?.innerText.trim() || '';
        const starsText = repo.querySelector('a[href$="/stargazers"]')?.innerText.trim() || '0';
        const stars = parseInt(starsText.replace(',', '')) || 0;
        return { name, stars };
      });

      return parsedRepos
        .sort((a, b) => b.stars - a.stars)
        .slice(0, 3);
    });

    await browser.close();

    return { ...data, topRepos };
  } catch (error) {
    await browser.close();
    throw error;
  }
}

module.exports = scrapeGitHubProfile;
