import React, { Component } from 'react';
import { CustomP2 } from '../utils/styles';
import ReactApexChart from 'react-apexcharts';

class ModalGraph extends Component {
  constructor(props) {
    super(props);
    this.state = {
      series: [{
        name: 'Elo',
        data: [4, 3, -10, -9, -29, 19, 22, 9, 12, 7, 19, 5, 13, 9, 17, 2, 7, 5]
      }],
      options: {
        chart: {
          height: 350,
          type: 'line',
        },
        stroke: {
          width: 7,
          curve: 'smooth'
        },
        title: {
          text: 'Elo Progress',
          align: 'left',
          style: {
            fontSize: "16px",
            color: '#666'
          }
        },
        fill: {
          type: 'gradient',
          gradient: {
            shade: 'dark',
            gradientToColors: [ '#FDD835'],
            shadeIntensity: 1,
            type: 'horizontal',
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 100, 100, 100]
          },
        },
        markers: {
          size: 1,
          colors: ["#FFA41B"],
          strokeColors: "#fff",
          strokeWidth: 2,
          hover: {
            size: 7,
          }
        },
        yaxis: {
          min: 800,
          max: 2000,
          title: {
            text: 'Points',
          },
        },
        xaxis: {
          type: "datetime"
        }
      },
    };
  }


  componentDidMount() {
    this.modifyData(this.props.matches, this.props.playername);
  }

  epochToJsDate(ts){
        // ts = epoch timestamp
        // returns date obj
        return new Date(ts*1000).toGMTString();
   }

  modifyData(array, player){
    let newArrayElo = []
    // let newArrayTime = []

    array.map(game => {
      if (game.player === player){
        newArrayElo.push({ x: this.epochToJsDate(game.starttime), y: game.player_new_elo})
        console.log(this.epochToJsDate((game.starttime)))
        // newArrayTime.push(new Date(game.starttime))
      } else {
        newArrayElo.push({x: this.epochToJsDate(game.starttime), y: game.opponent_new_elo})
        // newArrayTime.push(new Date(game.starttime))
      }
    })
    // console.log(newArrayTime.reverse())

    return this.setState({
      series: [{
        name: 'Elo',
        data: newArrayElo.reverse()
      }]
  })
  }

  render() {
    return (
      <div>
        <h3>Player Progress</h3>
        <CustomP2>
        <ReactApexChart color={"black"} options={this.state.options} series={this.state.series} type="line" height={350} />
        </CustomP2>
      </div>
    );
  }
}

export default ModalGraph;
