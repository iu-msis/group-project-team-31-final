var turbinePostApp = new Vue({
  el: '#turbinePostMain',
  data: {

    newSensor:{
      sensorId: 0,
      turbineId: 0,
      turbineDeployedId: 0,
      serialNumber: '',
      deployedDate: ''
    },
    sensor:{
      sensorId:0,
      sensorName: '',
      sensorDescription : '',
      manufacturer : '',
      totalLifeExpectancyHours : ''
    },
    turbineDeployed:{
      turbineId: 0,
      turbineDeployedId: 0,
      siteId: 0,
      serialNumber: '',
      deployedDate : '',
      totalFiredHours : 0,
      totalStarts : 0,
      lastPlannedOutageDate: '',
      lastUnplannedOutageDate: ''
    },
    turbineDetails: [ ],
    turbineForm: { },   // populated by this.getEmptyturbineForm()
    turbineList: [] // All the teams
  },
  computed: {
  },
  methods: {
    dateFormat(d) {
      d = d || moment();
      return moment(d).format('YYYY-MM-DD');
    },
    handleTurbineForm(e) {
      // TODO: Check validity

      // Build the JSON to send
      const selectedSensor = document.getElementById('sensors');
      this.turbineForm.sensorId = selectedSensor.options[selectedSensor.selectedIndex].value;
      const sNo = document.getElementById('serialNum').value;

      this.turbineForm.turbineDeployedId = this.turbineDeployed[0].turbineDeployedId;
      const depDat = document.getElementById('depDate').value;
      this.turbineForm.deployedDate = depDat;
      console.log(this.turbineForm.deployedDate);
      const s = JSON.stringify(this.turbineForm);
      console.log(s);

      // POST to remote server
      fetch('api/sensorDeployed.php', {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        },
        body: s
      })
      .then( response => response.json() )
      .then( json => {this.newSensor = json})
      .catch( err => {
        console.error('TURBINE POST ERROR:');
        console.error(err);
      })

      // Reset turbineForm
      this.turbineForm = this.getEmptyNewSensorForm();
    },
    getEmptyNewSensorForm() {
      return {
        sensorId: 0,
        turbineId: 0,
        turbineDeployedId: 0,
        serialNumber: '',
        deployedDate: this.dateFormat()
      }
    }
  },
  created () {
    // Populate workForm with default values
    //this.turbineForm = this.getEmptyNewSensorForm();

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
    fetch('api/sensorAll.php')
    .then( response => response.json() )
    .then( json => {turbinePostApp.sensor = json} )
    .catch( err => {
      console.log('WORK FETCH ERROR:');
      console.log(err);
    })

    fetch('api/turbineDeployed.php?turbineId='+turbineId)
    .then( response => response.json() )
    .then( json => {turbinePostApp.turbineDeployed = json} )
    .catch( err => {
      console.log('TURBINE DEPLOYED ERROR:');
      console.log(err);
    })
  }
})
