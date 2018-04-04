const fetch = require("node-fetch");

var headers = {
  "Travis-API-Version": 3,
  "User-Agent": "Webdash-Travis-Plugin"
};

module.exports = {
  routes: {
    get: {
      "check-config": (req, res) => {
        //get webdash.json config
        const config = req.app.locals.config;

        let errorMessage = null;
        if (!config.travisToken) {
          errorMessage =
            "Please add <strong>travisToken</strong> to your webdash.json";
        } else if (!config.repositoryName) {
          errorMessage =
            "Please add <strong>repositoryName</strong> to your webdash.json";
        }
        if (errorMessage) {
          return res.status(400).send({
            errors: true,
            errorMessage
          });
        }

        headers.Authorization = `token ${config.travisToken}`;

        return res.send({
          errors: false
        });
      },
      "build-status": (req, res) => {
        const config = req.app.locals.config;
        let uriQuery = `https://api.travis-ci.org/repo/${encodeURIComponent(
          config.repositoryName
        )}/builds?limit=2&sort_by=finished_at:desc`;

        fetch(uriQuery, {
          headers
        })
          .then(response => response.json())
          .then(response => res.send(response))
          .catch(error => {
            console.log("There was a problem while checking your build status");
            console.log(error);
          });
      },
      "active-builds": (req, res) => {
        const config = req.app.locals.config;

        let url = `https://api.travis-ci.org/repo/${encodeURIComponent(
          config.repositoryName
        )}/builds?state=started&sort_by=started_at:asc`;

        fetch(url, { headers })
          .then(response => response.json())
          .then(response => res.send(response))
          .catch(error => {
            console.log(
              "There was a problem while checking your active builds"
            );
            console.log(error);
          });
      }
    }
  }
};
