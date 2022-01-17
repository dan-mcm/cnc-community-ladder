# CNC Community Ladder

[![style: styled-components](https://img.shields.io/badge/components-%F0%9F%92%85%20styled_components-orange.svg?ff69b4)](https://www.styled-components.com/)
[![code style: prettier](https://img.shields.io/badge/style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![XO code linter](https://img.shields.io/badge/linter-XO-5ed9c7.svg)](https://github.com/xojs/xo)
[![Google Analytics](https://img.shields.io/badge/monitoring-📈_Google_Analytics-blue.svg)](https://analytics.google.com/analytics/web/)
![Heroku](https://heroku-badge.herokuapp.com/?app=heroku-badge)
[![Discord](https://img.shields.io/discord/784235637715894293?color=purple&label=discord)](https://discord.gg/pgBSxgmkHr)

<p align="center">
  <img width= "400" height="200" src="src/images/cnc_remastered.png"/>
</p>


This community run project was built for the C&C Remastered Collection: Tiberian Dawn game. Initially EA supported an online leaderboard @ https://cnc.community/command-and-conquer-remastered/leaderboard/tiberian-dawn that was manually reset every few months, however after the third season EA had seemingly dropped support for ladder resets for competitive quickmatch online games.

To help keep the online community alive and active I created this project for a community run leaderboard that aimed to:
* Record players elo scores using the official EA/Petroglyph API Endpoints (see [DB Repo](https://github.com/dan-mcm/cnc-db)) & reset the scoring at automatically defined intervals (every x months etc.)
* Generate Leaderboard & Player Analytics based on players stats and serve these via https://tibdawn.com/ website (now deprecated - previously running via Heroku/Route53)
* Setup a brand new custom map pool - the existing quickmatch setup for this game had a pool of 7 random maps players could be assigned, this new functionality enabled auto recording of scores from players who manually setup lobbies with 8 new maps
* Setup a special OBS browser endpoint that allowed streamers to pull data from API while streaming live on Twitch to show off their most up to date scoring systems - a similar project was previously active on the official leaderboard that inspired this adaptation

After a few months of the project being live EA decided to implement an automatic elo/scoring reset on their old ladder system which marked the deprecation of this project.

As the project is now deprecated you can refer to the following sources for a snapshot of the sites initial appearance, addition of new features & community interaction:

* [Dedicated Discord Channel](https://discord.gg/pgBSxgmkHr)
* [AOD's Overview of Community Ladder](https://www.youtube.com/watch?v=60UBTykG7UE)
* [WayBackMachine Archive](https://web.archive.org/web/20210202065149/https://tibdawn.com/)


## Technical Overview

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
* Google Analytics tracking enabled

## Endpoints

### /
Serves built react app.

### /leaderboard/:season
Fetches leaderboard results for a specified season from our DB.

### /elohistory/:season/:player
Fetches information specific to a specified player from our DB.

### /awards/total/:season
Fetches our top ranked players for total games played

### /awards/faction/random/:season or /awards/faction/{GDI/Nod}/:season
Returns our top ranked players for a specific faction.

### /health
General health check endpoint currently in use with [Uptime Robot](https://uptimerobot.com/)

### /nightbot/:season/:playername
Used for nightbot extension

### /obs/:season/:playername
Used for obs extension

## Running Locally

Note: there is now a dependency on a DB, the codebase for which is available [here](https://github.com/dan-mcm/cnc-db)

```bash
yarn install
yarn dev # will start react app on port 3000 and express server on port 5000 by default
```

### Using Docker
*Not Tested*
```bash
# build docker image
docker build . # or you can run the command

# run docker container and portforward port 3000
docker run -ti -p 3000:3000 <docker-image-id>

# publish docker image to docker hub
docker push <docker-repo>
```

### Using Makefile
*Not Tested*
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

### Heroku
The main website is currently hosted on Heroku. There are two projects - one for the main website `cnc-site` and a second that handles the DB updates running effectively as a cronjob `cnc-db-cron`.
The cnc-site builds the project with `yarn build` and serves it as `yarn server`.
The cnc-db-cron is ran every 10 minutes with the `yarn cron` command.

Updates pushed to the master branch will trigger an immediate deploy of the site.  
DB cron updates must be manually triggered.

### Github Pages
For a separate map making contest that was held a github pages site was hosted through this repo on [GitHub pages](https://pages.github.com/) @ https://dan-mcm.github.io/cnc-community-ladder/.
Due to domain structures the Github pages codebase is maintained on the [deploy-branch](https://github.com/dan-mcm/cnc-community-ladder/tree/deploy-branch) with source code hosted on the [gh-pages](https://github.com/dan-mcm/cnc-community-ladder/tree/gh-pages) branch.

## Heroku configuration

For logs

```
heroku login
heroku logs -a cnc-site -t
heroku logs -a cnc-db-cron -t
```
