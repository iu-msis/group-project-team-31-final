var clientComments = new Vue({
  el: '#clientCommentsMain',
  data: {
    client: {
      clientId: 0,
      clientName: 0,
      clientDescription: '',
      gicsSector : '',
      gicsSubIndustry : '',
      headquarters: '',
    },
    clientComments:{
        commentId: 0,
        clientId: 0,
        comment: ''
    },
    clientDetails: [ ],
    clientForm: { },   // populated by this.getEmptysensorForm()
    clientList: [] // All the teams
  },
  computed: {
  },
  methods: {
    handleclientForm(e) {
      // TODO: Check validity

      // Build the JSON to send
      const s = document.getElementById('comment').value;
      const clientId = document.getElementById('clientId').value;
      console.log(s);

      // POST to remote server
      fetch('api/client.php', {
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
      this.clientForm = this.getEmptyclientForm();
    },
    getEmptyclientForm() {
      return {
        clientId: 0,
        clientName: '',
        clientDescription: '',
        gicsSector: '',
        gicsSubIndustry: '',
        headquarters: ''
      }
    }
  },
  created () {
    // Populate sensorForm with default values
    this.clientForm = this.getEmptyclientForm();

    // Do data fetch
    const url = new URL(window.location.href);

    if (!clientId) {
      //TODO: Error? 404?
      //e.g., window.location = '404.html';
    }

    // TODO: Fetch task-specific data
    // fetch('api/task?id=4')
    fetch('api/client.php')
    .then( response => response.json() )
    .then( json => {clientApp.client = json} )
    .catch( err => {
      console.log('CLIENT FETCH ERROR:');
      console.log(err);
    })

    fetch('api/clientComment.php')
    .then( response => response.json() )
    .then( json => {clientApp.clientComments = json} )
    .catch( err => {
      console.log('CLIENT FETCH ERROR:');
      console.log(err);
    })

  }
})
