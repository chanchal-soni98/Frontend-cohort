const express = require('express');
const scrapeGitHubProfile = require('./scraper');

const app = express();
const PORT = 3000;

app.get('/github/:username', async (req, res) => {
  const { username } = req.params;

  try {
    const profileData = await scrapeGitHubProfile(username);
    res.json(profileData);
  } catch (err) {
    res.status(500).json({ error: 'Failed to scrape GitHub profile.', message: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
