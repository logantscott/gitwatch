const { Router } = require('express');
const request = require('superagent');

module.exports = Router()
  .get('/:username', async(req, res, next) => {
    const repos = await request
      .get(`https://api.github.com/users/${req.params.username}/repos`)
      .set({
        'User-Agent': 'NodeJS/Express'
      })
      .then(res => {
        // console.log(res.body);
        return res.body;
      })
      .catch(next);
    const result = repos.map(repo => ({
      id: repo.id,
      name: repo.name,
      description: repo.description,
      owner: repo.owner.login,
      created_at: repo.created_at,
      udpated_at: repo.updated_at,
      language: repo.language,
      size: repo.size,
      html_url: repo.html_url,

    }));
    res.send(result);
  });
