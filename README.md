# webdash travis ci

[plugin description]

```bash
npm install --save-dev webdash-travis-ci
```

## Features

* Get latest build state directly from Travis
* Get current active builds for all the branches in the repo
* Cancel any current active build

## Configuration

You need to edit your `webdash.json` file, and add the following values:

* `travisToken` => You can get it from [here](https://travis-ci.org/profile)
* `repositoryName` => Equivalent to `username/repository-name`; `jadsalhani/webdash-travis-ci`
