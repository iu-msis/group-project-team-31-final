var siteApp = new Vue({
  el: '#siteMain',
  data: {
    site: {
      siteId: 0,
      clientId: 0,
      siteName : '',
      siteDescription : '',
      primaryContact : '',
      capacity: '',
      commercialDate: '',
      addrLine1: '',
      addrLine2: '',
      addrCity: '',
      addrState: '',
      addrZip: '',
      addrCountry: ''
    },
    siteDetails: [ ],
    siteForm: { },   // populated by this.getEmptysensorForm()
    siteList: [] // All the teams
  },
  computed: {
  },
  methods: {
    handlesiteForm(e) {
      // TODO: Check validity

      // Build the JSON to send
      this.siteForm.siteId = this.siteId;
      const s = JSON.stringify(this.siteForm);
      console.log(s);

      // POST to remote server
      fetch('api/site.php', {
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
      this.siteForm = this.getEmptysiteForm();
    },
    getEmptysiteForm() {
      return {
        siteId: 0,
        clientId: 0,
        siteName : '',
        siteDescription : '',
        primaryContact : '',
        capacity: '',
        commercialDate: '',
        addrLine1: '',
        addrLine2: '',
        addrCity: '',
        addrState: '',
        addrZip: '',
        addrCountry: ''
      }
    }
  },
  created () {
    // Populate sensorForm with default values
    this.siteForm = this.getEmptysiteForm();

    // Do data fetch
    const url = new URL(window.location.href);
    const siteId = url.searchParams.get('siteId');
    this.siteId = siteId;
    console.log('Site: '+ siteId);

    if (!siteId) {
      //TODO: Error? 404?
      //e.g., window.location = '404.html';
    }

    // TODO: Fetch task-specific data
    // fetch('api/task?id=4')
    fetch('api/site.php?siteId='+siteId)
    .then( response => response.json() )
    .then( json => {siteApp.site = json} )
    .catch( err => {
      console.log('SENSOR FETCH ERROR:');
      console.log(err);
    })

  }
})
