var turbineDeployedApp = new Vue({
  el: '#turbineDeployedMain',
  data: {
    turbineDeployed: {
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
    turbineDeployedDetails: [ ],
    turbineDeployedForm: { },   // populated by this.getEmptyturbineForm()
    turbineDeployedList: [] // All the teams
  },
  computed: {

  },
  methods: {
    pretty_date: function (d) {
      if ( d === null ) {
          return '.';
      }
      else if (d === "0000-00-00"){
        return '.';
      }
         return moment(d).format('l')

    },

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
        turbineDeployedId: 0,
        siteId: 0,
        serialNumber: '',
        deployedDate : '',
        totalFiredHours : 0,
        totalStarts : 0,
        lastPlannedOutageDate: '',
        lastUnplannedOutageDate: ''
      }
    }
  },
  created () {
    // Populate turbineForm with default values
    this.turbineDeployedForm = this.getEmptyturbineForm();

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
    fetch('api/turbineDeployed.php?turbineId='+turbineId)
    .then( response => response.json() )
    .then( json => {turbineDeployedApp.turbineDeployed = json} )
    .catch( err => {
      console.log('turbine FETCH ERROR:');
      console.log(err);
    })

  }
})
