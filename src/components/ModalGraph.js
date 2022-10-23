import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { CustomP2 } from '../utils/styles';
import ReactApexChart from 'react-apexcharts';

const defaultSeries = [
  {
    name: 'Elo',
    data: [],
  },
];

const defaultOptions = {
  chart: {
    height: 350,
    type: 'line',
  },
  stroke: {
    width: 7,
    curve: 'smooth',
  },
  title: {
    text: 'Elo Progress',
    align: 'left',
    style: {
      fontSize: '16px',
      color: '#666',
    },
  },
  fill: {
    type: 'gradient',
    gradient: {
      shade: 'dark',
      gradientToColors: ['#FDD835'],
      shadeIntensity: 1,
      type: 'horizontal',
      opacityFrom: 1,
      opacityTo: 1,
      stops: [0, 100, 100, 100],
    },
  },
  markers: {
    size: 1,
    colors: ['#FFA41B'],
    strokeColors: '#fff',
    strokeWidth: 2,
    hover: {
      size: 7,
    },
  },
  yaxis: {
    min: 800,
    max: 2000,
    title: {
      text: 'Points',
    },
  },
  xaxis: {
    type: 'datetime',
  },
};

function epochToJsDate(ts) {
  // ts = epoch timestamp
  // returns date obj
  return new Date(ts * 1000).toGMTString();
}

function modifyData(setSeries, array, player) {
  const newArrayElo = [];
  // let newArrayTime = []
  array.map((game) => {
    return game.player === player
      ? newArrayElo.push({
          x: epochToJsDate(game.starttime),
          y: game.player_new_elo,
        })
      : newArrayElo.push({
          x: epochToJsDate(game.starttime),
          y: game.opponent_new_elo,
        });
  });
  // console.log(newArrayTime.reverse())
  const updatedSeries = [
    {
      name: 'Elo',
      data: newArrayElo.reverse(),
    },
  ];

  return setSeries(updatedSeries);
}

function ModalGraph(props) {
  const [series, setSeries] = useState(defaultSeries);
  const [options] = useState(defaultOptions);

  useEffect(() => {
    modifyData(setSeries, props.matches, props.playername);
  }, [setSeries, props.matches, props.playername]);

  return (
    <div>
      <h3>Player Progress</h3>
      <CustomP2>
        <ReactApexChart
          color={'black'}
          options={options}
          series={series}
          type="line"
          height={350}
        />
      </CustomP2>
    </div>
  );
}

ModalGraph.propTypes = {
  matches: PropTypes.array.isRequired,
  playername: PropTypes.string.isRequired,
};

export default ModalGraph;
