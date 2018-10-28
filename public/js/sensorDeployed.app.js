var sensorDeployedApp = new Vue({
  el: '#sensorDeployedMain',
  data: {
    sensorsDeployed: {
      sensorDeployedId: 0,
      sensorId: 0,
      turbineDeployedId: 0,
      serialNumber : '',
      deployedDate : ''
    },
    turbineId: 0,
    sensoDeployedDetails: [ ],
    sensorDeployedForm: { },   // populated by this.getEmptysensorForm()
    sensorDeployedList: [] // All the teams
  },
  computed: {
  },
  methods: {
    pretty_date: function (d) {
      return moment(d).format('l')
    },
    handlesensorDeployedForm(e) {
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
        console.error('SENSOR POST ERROR:');
        console.error(err);
      })

      // Reset sensorForm
      this.sensorForm = this.getEmptysensorForm();
    },
    getEmptysensorDeployedForm() {
      return {
        sensorDeployedId: 0,
        sensorId: 0,
        turbineDeployedId: 0,
        serialNumber : '',
        deployedDate : ''
      }
    },
    gotoSensor(sensorId, turbineId) {
      window.location = 'Sensor.html?sensorId='+sensorId+'&turbineId='+turbineId;
    }
  },
  created () {
    // Populate sensorForm with default values
    this.sensorDeployedForm = this.getEmptysensorDeployedForm();

    // Do data fetch
    const url = new URL(window.location.href);
    const turbineId = url.searchParams.get('turbineId');
    this.turbineId = turbineId;
    console.log('Turbine: '+ turbineId);

    if (!turbineId) {
      //TODO: Error? 404?
      //e.g., window.location = '404.html';
    }

    // TODO: Fetch task-specific data
    // fetch('api/task?id=4')
    fetch('api/sensorDeployed.php?turbineId='+turbineId)
    .then( response => response.json() )
    .then( json => {sensorDeployedApp.sensorsDeployed = json} )
    .catch( err => {
      console.log('SENSOR FETCH ERROR:');
      console.log(err);
    })

  }
})
