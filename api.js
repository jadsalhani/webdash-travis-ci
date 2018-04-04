const fetch = require('node-fetch');

var headers = {
  'Travis-API-Version': 3,
  'User-Agent': 'Webdash-Travis-Plugin'
};

module.exports = {
  routes: {
    get: {
      'check-config': (req, res) => {
        //get webdash.json config
        const config = req.app.locals.config;

        if (!config.travisToken || !config.repositoryName) {
          res.status(400).send({
            errors: true,
            message: "Invalid plugin configuration!"
          });
        }

        headers.Authorization = `token ${config.travisToken}`

        return res.send(true);
      },
      'build-status': (req, res) => {
        const config = req.app.locals.config;
        let uriQuery = `https://api.travis-ci.org/repo/${encodeURIComponent(config.repositoryName)}/builds?limit=2&sort_by=finished_at:desc`;

        fetch(uriQuery, {
            headers
          })
          .then(response => response.json())
          .then(response => res.send(response));
      },
      'active-builds': (req, res) => {
        const config = req.app.locals.config;

        let url = `https://api.travis-ci.org/repo/${encodeURIComponent(config.repositoryName)}/builds?state=started&sort_by=started_at:asc`;

        fetch(url, {
            headers
          })
          .then(response => response.json())
          .then(response => res.send(response));
      },
    }
  }
}