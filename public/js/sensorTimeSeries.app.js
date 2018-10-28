var sensorTimeApp = new Vue({
  el: '#sensorTime',
  data: {
    sensorTime: {
      sensorDeployedId: 0,
      dataCollectedDate: '',
      output : 0,
      heatRate : 0,
      compressorEfficiency : 0,
      availability: 0,
      reliablity: 0,
      firedHours: 0,
      trips: 0,
      starts: 0
    },
    sensorTimeDetails: [ ],
    sensorTimeForm: { },   // populated by this.getEmptysensorForm()
    sensorTimeList: [] // All the teams
  },
  computed: {

  },
  methods: {
    pretty_date: function (d) {
      return moment(d).format('l')
    },
    handlesensorForm(e) {
      // TODO: Check validity

      // Build the JSON to send
      this.sensorForm.sensorId = this.sensorId;
      const s = JSON.stringify(this.sensorForm);
      console.log(s);

      // POST to remote server
      fetch('api/sensor.php', {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        },
        body: s // body data type must match "Content-Type" header
      })
      .then( response => response.json() )
      .then( json => {this.work.push(json)})
      .catch( err => {
        console.error('SENSOR TIME POST ERROR:');
        console.error(err);
      })

      // Reset sensorForm
      this.sensorForm = this.getEmptysensorForm();
    },
    getEmptysensorTimeForm() {
      return {
        sensorDeployedId: 0,
        dataCollectedDate: '',
        output : 0,
        heatRate : 0,
        compressorEfficiency : 0,
        availability: 0,
        reliablity: 0,
        firedHours: 0,
        trips: 0,
        starts: 0
      }
    },

    formatSensorStats() {
      this.sensorTime.forEach(
        (entry, index, arr) => {
          entry.dataCollectedDate = Date.parse(entry.dataCollectedDate); // Convert to ms since Jan 1, 1970 UTC
          entry.OutPut = Number(entry.OutPut);
          entry.CompressorEfficiency = Number(entry.CompressorEfficiency);
          entry.HeatRate = Number(entry.HeatRate);
          entry.availability = Number(entry.availability);
          entry.reliability = Number(entry.reliability);
          entry.starts = Number(entry.starts);
          entry.trips = Number(entry.trips);
          entry.firedHours = Number(entry.firedHours);
          entry.runningTotalHours = entry.firedHours +
            (index == 0 ? 0 : arr[index-1].runningTotalHours)
          entry.totalTrips = entry.trips +
            (index == 0 ? 0 : arr[index-1].totalTrips)
          entry.totalStarts = entry.starts +
            (index == 0 ? 0 : arr[index-1].totalStarts)

      });

    },


    buildStatsChart(){


        Highcharts.chart('outputChart', {

              title: {
                  text: 'Sensor Output Over Time'
              },
              xAxis: {
                  type: 'datetime'
              },
              yAxis: {
                  title: {
                      text: 'Output'
                  }
              },
              legend: {
                  enabled: false
              },
              plotOptions: {
                  area: {
                      fillColor: {
                          linearGradient: {
                              x1: 0,
                              y1: 0,
                              x2: 0,
                              y2: 1
                          },
                          stops: [
                              [0, Highcharts.getOptions().colors[0]],
                              [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                          ]
                      },
                      marker: {
                          radius: 2
                      },
                      lineWidth: 1,
                      states: {
                          hover: {
                              lineWidth: 1
                          }
                      },
                      threshold: null
                  }
              },

              series: [{
                  type: 'line',
                  name: 'Output',
                  // Data needs [ [date, num], [date2, num2 ], ... ]
                  data: this.sensorTime.map( item => [item.dataCollectedDate, item.OutPut] )
              }]
          });

          Highcharts.chart('heatRateChart', {

                title: {
                    text: 'Sensor Heat Rate Over Time'
                },
                xAxis: {
                    type: 'datetime'
                },
                yAxis: {
                    title: {
                        text: 'Heat Rate'
                    }
                },
                legend: {
                    enabled: false
                },
                plotOptions: {
                    area: {
                        fillColor: {
                            linearGradient: {
                                x1: 0,
                                y1: 0,
                                x2: 0,
                                y2: 1
                            },
                            stops: [
                                [0, Highcharts.getOptions().colors[0]],
                                [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                            ]
                        },
                        marker: {
                            radius: 2
                        },
                        lineWidth: 1,
                        states: {
                            hover: {
                                lineWidth: 1
                            }
                        },
                        threshold: null
                    }
                },

                series: [{
                    type: 'line',
                    name: 'Heat Rate',
                    // Data needs [ [date, num], [date2, num2 ], ... ]
                    data: this.sensorTime.map( item => [item.dataCollectedDate, item.HeatRate] )
                }]
            });


      Highcharts.chart('efficiencyChart', {
            title: {
                text: 'Compressor Efficiency Over Time'
            },
            xAxis: {
                type: 'datetime'
            },
            yAxis: {
                title: {
                    text: 'Compressor Efficiency'
                }
            },
            legend: {
                enabled: false
            },
            plotOptions: {
                area: {
                    fillColor: {
                        linearGradient: {
                            x1: 0,
                            y1: 0,
                            x2: 0,
                            y2: 1
                        },
                        stops: [
                            [0, Highcharts.getOptions().colors[0]],
                            [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                        ]
                    },
                    marker: {
                        radius: 2
                    },
                    lineWidth: 1,
                    states: {
                        hover: {
                            lineWidth: 1
                        }
                    },
                    threshold: null
                }
            },

            series: [{
                type: 'area',
                name: 'Compressor Efficiency',
                // Data needs [ [date, num], [date2, num2 ], ... ]
                data: this.sensorTime.map( item => [item.dataCollectedDate, item.CompressorEfficiency] )
            }]
        });

        Highcharts.chart('availabilityChart', {
              title: {
                  text: 'Availability/Reliability of Sensor Over Time'
              },
              xAxis: {
                  type: 'datetime'
              },
              yAxis: {
                  title: {
                      text: 'Availability Rate'
                  }
              },
              legend: {
                  enabled: false
              },
              plotOptions: {
                  area: {
                      fillColor: {
                          linearGradient: {
                              x1: 0,
                              y1: 0,
                              x2: 0,
                              y2: 1
                          },
                          stops: [
                              [0, Highcharts.getOptions().colors[0]],
                              [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                          ]
                      },
                      marker: {
                          radius: 2
                      },
                      lineWidth: 1,
                      states: {
                          hover: {
                              lineWidth: 1
                          }
                      },
                      threshold: null
                  }
              },

              series: [{
                  type: 'line',
                  name: 'Availability',
                  // Data needs [ [date, num], [date2, num2 ], ... ]
                  data: this.sensorTime.map( item => [item.dataCollectedDate, item.availability] )
              },
              {
                type: 'line',
                name: 'Reliability',
                // Data needs [ [date, num], [date2, num2 ], ... ]
                data: this.sensorTime.map( item => [item.dataCollectedDate, item.reliability] )
              }]
            });

            Highcharts.chart('firedHoursChart', {

              chart: {
                  type: 'area',
                  zoomType: 'x',
                  panning: true,
                  panKey: 'shift',
                  scrollablePlotArea: {
                      minWidth: 600
                  }
              },

              title: {
                  text: 'Number of Hours Fired Over Time'
              },

              xAxis: {
                  type: 'datetime'
              },
              yAxis: {
                  title: {
                      text: 'Running Total (Hours)'
                  }
              },
              legend: {
                  enabled: false
              },

              series: [{
                  data: this.sensorTime.map( item => [item.dataCollectedDate, item.runningTotalHours] ),
                  lineColor: Highcharts.getOptions().colors[1],
                  color: Highcharts.getOptions().colors[2],
                  fillOpacity: 0.5,
                  name: 'Fired Hours',
                  marker: {
                      enabled: false
                  },
                  threshold: null
              }]

          });

          Highcharts.chart('tripsChart', {

            chart: {
                type: 'line',
                zoomType: 'x',
                panning: true,
                panKey: 'shift',
                scrollablePlotArea: {
                    minWidth: 600
                }
            },

            title: {
                text: 'Total Trips Over Time'
            },

            xAxis: {
                type: 'datetime'
            },
            yAxis: {
                title: {
                    text: 'Trips'
                }
            },
            legend: {
                enabled: false
            },

            series: [{
                data: this.sensorTime.map( item => [item.dataCollectedDate,item.totalTrips] ),
                lineColor: Highcharts.getOptions().colors[1],
                color: Highcharts.getOptions().colors[2],
                fillOpacity: 0.5,
                name: 'Trips',
                marker: {
                    enabled: false
                },
                threshold: null
            }]

        });

        Highcharts.chart('startsChart', {

          chart: {
              type: 'line',
              zoomType: 'x',
              panning: true,
              panKey: 'shift',
              scrollablePlotArea: {
                  minWidth: 600
              }
          },

          title: {
              text: 'Total Starts Over Time'
          },

          xAxis: {
              type: 'datetime'
          },
          yAxis: {
              title: {
                  text: 'Starts'
              }
          },
          legend: {
              enabled: false
          },

          series: [{
              data: this.sensorTime.map( item => [item.dataCollectedDate, item.totalStarts] ),
              lineColor: Highcharts.getOptions().colors[1],
              color: Highcharts.getOptions().colors[2],
              fillOpacity: 0.5,
              name: 'Starts',
              marker: {
                  enabled: false
              },
              threshold: null
          }]

        });



      }
      // Add some life
  },
  created () {
    // Populate sensorForm with default values
    this.sensorTimeForm = this.getEmptysensorTimeForm();

    // Do data fetch
    const url = new URL(window.location.href);
    const sensorId = url.searchParams.get('sensorId');
    this.sensorId = sensorId;
    const turbineId = url.searchParams.get('turbineId');
    this.turbineId = turbineId;
    console.log('Sensor: '+ sensorId);

    if (!sensorId) {
      //TODO: Error? 404?
      //e.g., window.location = '404.html';
    }

    // TODO: Fetch task-specific data
    // fetch('api/task?id=4')
    fetch('api/sensorTimeSeries.php?sensorId='+sensorId+'&turbineId='+turbineId)
    .then( response => response.json() )
    .then( json => {
      sensorTimeApp.sensorTime = json
      this.formatSensorStats();
      this.buildStatsChart();
    } )
    .catch( err => {
      console.log('SENSOR TIME FETCH ERROR:');
      console.log(err);
    })

  }
})
