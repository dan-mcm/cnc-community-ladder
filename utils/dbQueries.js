// see https://github.com/dan-mcm/rate-my-therapist/blob/master/server/dbQueries.js as useful reference

const { Pool } = require('pg');
// eslint-disable-next-line no-unused-vars
const dotenv = require('dotenv').config();
// for local docker
// const pool = new Pool({
//   user: process.env.DB_USER,
//   host: process.env.DB_HOST,
//   database: process.env.DB_NAME,
//   password: process.env.DB_PASSWORD,
//   port: process.env.DB_PORT
// });

// for prod
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

const getAllMatches = function() {
  const selectAll = {
    name: 'fetch-matches',
    text: 'SELECT * FROM matches'
  };

  const res = pool.query(selectAll, (err, res) => {
    if (err) {
      console.log(err.stack);
    } else {
      // console.log(res.rows);
      return res.rows;
    }
    // Syntax used to hide error logging of pool end > once
    // pool.end(() => {});
  });

  return res;
};


/* eslint-disable camelcase */
const filteringDataForFrontend = function(data) {
  console.log(`DATA FOR FRONTEND: ${data}`)
  // Based on length of the reviews array, each review = 1 object
  const total_matches = data.length;

  // Underlying logic assumes consistent data across all entries for these values
  const { starttime, match_duration, player1_name, player1_faction, player2_name, player2_faction, result, map, replay, season } = data[0];



  const feedback_comments = data.reduce(function(total, value) {
    return total.concat(value.feedback_comments);
  }, []);

  // Filtered data for returning
  const filteredData = {
    therapist_name,
    type,
    image,
    location,
    total_reviews,
    contact,
    feedback_comments,
    rating_friendliness: ratings.rating_friendliness / total_reviews,
    rating_techniques: ratings.rating_techniques / total_reviews,
    rating_progression: ratings.rating_progression / total_reviews,
    rating_cost: ratings.rating_cost / total_reviews,
    rating_listening: ratings.rating_listening / total_reviews,
    rating_overall: ratings.rating_overall / total_reviews
  };
  /* eslint-enable camelcase */

 // DEBUG console.log(`\n DEBUG 1 - filteredData -> ${JSON.stringify(filteredData)} \n`)
 return filteredData;
};


const getSpecificTimedMatches = async function(playerName) {

  const getSpecificPlayersMatches = {
    name: `${playerName}-matches`,
    test: `SELECT * FROM matches WHERE starttime LIKE '%${playerName}%'`
    //text: `SELECT * FROM matches WHERE player1_name LIKE '%${playerName}%' OR player2_name LIKE '%${playerName}%'`
  };

  /* eslint-enable camelcase */

  const res = await new Promise(resolve => {
    pool.query(getSpecificPlayersMatches, (err, res) => {
      let data = [];
      if (err) {
        console.log(err.stack);
      } else {
        console.log(`DEBUG: ${JSON.stringify(res)}`);
        data = filteringDataForFrontend(res.rows);
      }

      // DEBUG console.log(`\n DEBUG2 - GetSpecificTherapistReviews ${JSON.stringify(data)} \n`)
      resolve(data);
    });
  });
  return res;
};


const getFormattedMatches = async function() {
  const getDistinct = {
    name: 'distinct-reviews',
    text: 'SELECT DISTINCT starttime FROM matches'
  };

  const res = await new Promise(resolve => {
    pool.query(getDistinct, (err, res) => {
      let data = [];
      if (err) {
        console.log(err.stack);
      } else {
        data = res.rows.map(async starttime =>
          getSpecificTimedMatches(starttime.starttime)
        );
        // Promise.all(data).then(results => console.log(`\n DEBUG3 - getFormattedReviews data: ${JSON.stringify(results)} \n`))
      }

      Promise.all(data).then(results => resolve(results));
    });
  });
  return res;
};

module.exports = {
  getAllMatches,
  getFormattedMatches
};
