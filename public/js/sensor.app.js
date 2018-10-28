var sensorApp = new Vue({
  el: '#sensorMain',
  data: {
    sensor: {
      sensorId: 0,
      sensorName: '',
      sensorDescription : '',
      manufacturer : '',
      totalLifeExpectancyHours : ''
    },
    sensorDetails: [ ],
    sensorForm: { },   // populated by this.getEmptysensorForm()
    sensorList: [] // All the teams
  },
  computed: {
  },
  methods: {
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
        console.error('SENSOR POST ERROR:');
        console.error(err);
      })

      // Reset sensorForm
      this.sensorForm = this.getEmptysensorForm();
    },
    getEmptysensorForm() {
      return {
        sensorId: 0,
        sensorName: '',
        sensorDescription : '',
        manufacturer : '',
        totalLifeExpectancyHours : ''
      }
    }
  },
  created () {
    // Populate sensorForm with default values
    this.sensorForm = this.getEmptysensorForm();

    // Do data fetch
    const url = new URL(window.location.href);
    const sensorId = url.searchParams.get('sensorId');
    this.sensorId = sensorId;
    console.log('Sensor: '+ sensorId);

    if (!sensorId) {
      //TODO: Error? 404?
      //e.g., window.location = '404.html';
    }

    // TODO: Fetch task-specific data
    // fetch('api/task?id=4')
    fetch('api/sensor.php?sensorId='+sensorId)
    .then( response => response.json() )
    .then( json => {sensorApp.sensor = json} )
    .catch( err => {
      console.log('SENSOR FETCH ERROR:');
      console.log(err);
    })

  }
})
