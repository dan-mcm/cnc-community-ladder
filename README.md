# CNC Community Ladder

[![style: styled-components](https://img.shields.io/badge/component_style-%F0%9F%92%85%20styled_components-orange.svg?ff69b4)](https://www.styled-components.com/)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![XO code linter](https://img.shields.io/badge/code_linter-XO-5ed9c7.svg)](https://github.com/xojs/xo)

Access:

* Github Pages: https://dan-mcm.github.io/cnc-community-ladder/

## Overview

Setup with:
* [React](https://reactjs.org/)
* [React Router](https://github.com/ReactTraining/react-router)

Component libraries include:
* [Styled Components](https://www.styled-components.com/)
* [Grid Styled](http://jxnblk.com/grid-styled/).

For Code Styling & Linting:
* [Prettier](https://github.com/prettier/prettier) is used for code styling throughout the project.
* [XO](https://github.com/xojs/xo) is used to enforce linting styles alongside Prettier.


DevOps:
* A [pre-commit](https://www.npmjs.com/package/pre-commit) hook is setup to automatically run the code styler, linter and tests before enabling a successful push to the repo.
* In addition to the pre-commit hook basic [CircleCI](https://circleci.com/) test integration has been setup (see CircleCI badge above for current test status Passing/Failed). This will block merges to the master branch in the event tests fails on a PR.
* A [Dockerfile](./Dockerfile) & [Makefile](./Makefile) are available for portable deployment.
* Google Analytics tracking enabled via the GA_ID environmental variable

## Running Locally

```bash
yarn install
yarn start # will start service on port 3000 by default
```

### Using Docker

```bash
# build docker image
docker build . # or you can run the command

# run docker container and portforward port 3000
docker run -ti -p 3000:3000 <docker-image-id>

# publish docker image to docker hub
docker push <docker-repo>
```

### Using Makefile

```bash
# this will default to 'build' command
make

# this will push the image to docker hub
make push

# this will both build and publish for expediency
make deploy
```

## Tests

Handled by [ReactScripts](https://create-react-app.dev/docs/running-tests/) a pre-configured version of [Jest](https://jestjs.io/docs/en/getting-started) to save hassle with [Babel](https://babeljs.io/) configuration.

## Deployment & Hosting

A version of the site is hosted on [GitHub pages](https://pages.github.com/) @ https://dan-mcm.github.io/cnc-community-ladder/.
Due to domain structures the Github pages codebase is maintained on the [deploy-branch](https://github.com/dan-mcm/cnc-community-ladder/tree/deploy-branch) with source code hosted on the [gh-pages](https://github.com/dan-mcm/cnc-community-ladder/tree/gh-pages) branch.
