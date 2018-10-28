var siteApp = new Vue({
  el: '#siteMain',
  data: {
    sites: {
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
    siteList: []
  },
  computed: {
  },
  methods: {
    pretty_date: function (d) {
      if ( d === null ) {
          return '.';
      }
         return moment(d).format('l')

    },

    gotoTurbine(siteId) {
      window.location = 'turbineSite.html?siteId='+siteId;
    },

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

    const clientId = url.searchParams.get('clientId');
    this.clientId = clientId;
    console.log('Client: '+ clientId);

    if (!clientId) {
      //TODO: Error? 404?
      //e.g., window.location = '404.html';
    }

    // TODO: Fetch task-specific data
    // fetch('api/task?id=4')
    fetch('api/site.php?clientId='+clientId)
    .then( response => response.json() )
    .then( json => {siteApp.sites = json} )
    .catch( err => {
      console.log('SITE FETCH ERROR:');
      console.log(err);
    })

  }
})
