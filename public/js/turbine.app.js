var turbineApp = new Vue({
  el: '#turbineMain',
  data: {
    turbine: {
      turbineId: 0,
      turbineName: '',
      turbineDescription : '',
      capacity : 0,
      rampUpTime : 0,
      maintenanceInterval: 0
    },
    turbineDetails: [ ],
    turbineForm: { },   // populated by this.getEmptyturbineForm()
    turbineList: [] // All the teams
  },
  computed: {
  },
  methods: {
    handleturbineForm(e) {
      // TODO: Check validity

      // Build the JSON to send
      this.turbineForm.turbineId = this.turbineId;
      const s = JSON.stringify(this.turbineForm);
      console.log(s);

      // POST to remote server
      fetch('api/turbine.php', {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        },
        body: s // body data type must match "Content-Type" header
      })
      .then( response => response.json() )
      .then( json => {this.work.push(json)})
      .catch( err => {
        console.error('turbine POST ERROR:');
        console.error(err);
      })

      // Reset turbineForm
      this.turbineForm = this.getEmptyturbineForm();
    },
    getEmptyturbineForm() {
      return {
        turbineId: 0,
        turbineName: '',
        turbineDescription : '',
        capacity : 0,
        rampUpTime : 0,
        maintenanceInterval: 0
      }
    },


    buildRampChart(){
      Highcharts.chart('rampChart',
      Highcharts.merge(gaugeOptions, {
          yAxis: {
              min: 0,
              max: 10000,
              title: {
                  text: 'Ramp Up Time'
              }
          },

          series: [{
              name: 'RUT',
              data: this.turbine.rampUpTime,
              dataLabels: {
                  format: '<div style="text-align:center"><span style="font-size:25px;color:' +
                      ((Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black') + '">{y:.1f}</span><br/>' +
                         '<span style="font-size:12px;color:silver">* 1000 / min</span></div>'
              },
              tooltip: {
                  valueSuffix: ' seconds'
              }
          }]

      }));
    }

  },
  created () {
    // Populate turbineForm with default values
    this.turbineForm = this.getEmptyturbineForm();

    // Do data fetch
    const url = new URL(window.location.href);
    const turbineId = url.searchParams.get('turbineId');
    this.turbineId = turbineId;
    console.log('turbine: '+ turbineId);

    if (!turbineId) {
      //TODO: Error? 404?
      //e.g., window.location = '404.html';
    }

    // TODO: Fetch task-specific data
    // fetch('api/task?id=4')
    fetch('api/turbine.php?turbineId='+turbineId)
    .then( response => response.json() )
    .then( json => {turbineApp.turbine = json} )
    .catch( err => {
      console.log('turbine FETCH ERROR:');
      console.log(err);
    })

  }
})
