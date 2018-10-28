var turbineSiteApp = new Vue({
  el: '#turbineSiteMain',
  data: {
    turbinesSite: {
      turbineId: 0,
      turbineDeployedId: 0,
      siteId: 0,
      serialNumber: "",
      deployedDate : '',
      totalFiredHours : 0,
      totalStarts : 0,
      lastPlannedOutageDate: '',
      lastUnplannedOutageDate: ''
    },
    turbinesSiteDeployed: [ ],
    turbinesSiteForm: { },   // populated by this.getEmptyturbineForm()
    turbinesSiteList: [] // All the teams
  },
  computed: {

  },
  methods: {
    getEmptyturbineForm() {
      return {
        turbineId: 0,
        turbineDeployedId: 0,
        siteId: 0,
        serialNumber: "",
        deployedDate : '',
        totalFiredHours : 0,
        totalStarts : 0,
        lastPlannedOutageDate: '',
        lastUnplannedOutageDate: ''
      }
    },

    gotoTurbine(turbineId) {
      window.location = 'turbine.html?turbineId='+turbineId;
    }
  },
  created () {
    // Populate turbineForm with default values
    this.turbinesSiteForm = this.getEmptyturbineForm();

    // Do data fetch
    const url = new URL(window.location.href);
    const clientId = url.searchParams.get('clientId');
    this.clientId = clientId;
    console.log('Client: '+ clientId);


    fetch('api/turbineSite.php?clientId='+clientId)
    .then( response => response.json() )
    .then( json => {turbineSiteApp.turbinesSite = json} )
    .catch( err => {
      console.log('SITE FETCH ERROR:');
      console.log(err);
    })

  }
})
