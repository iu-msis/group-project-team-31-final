var clientApp = new Vue({
  el: '#clientMain',
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
    clientList: [], // All the teams
    clientCommentsList: [],
    commentForm:{}
  },
  computed: {
  },
  methods: {
    gotoSite(clientId) {
      window.location = 'Site.html?clientId='+clientId;
    },
    handleCommentForm(e) {
      // TODO: Check validity

      // Build the JSON to send

      const selectClient = document.getElementById('client');
      this.commentForm.clientId = selectClient.options[selectClient.selectedIndex].value;
      const c = document.getElementById('comment').value;
      this.commentForm.comment = c;
      const s = JSON.stringify(this.commentForm);
      console.log(s);


      fetch('api/clientComments.php', {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        },
        body: s
      })
      .then( response => response.json() )
      .then( json => {this.clientComments = json})
      .catch( err => {
        console.error('COMMENT POST ERROR:');
        console.error(err);
      })

      // Reset sensorForm
      this.clientForm = this.getEmptyclientCommentsForm();
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
    },
    getEmptyclientCommentsForm() {
      return {
        commentId: 0,
        clientId: 0,
        comment: ''
      }
    }
  },
  created () {

    // Do data fetch
    const url = new URL(window.location.href);

    fetch('api/client.php')
      .then( response => response.json() )
      .then( json => {clientApp.clientList = json})
      .catch( err => {
        console.log('CLIENT FETCH ERROR:');
        console.log(err);
      })

    fetch('api/clientComments.php')
    .then( response => response.json() )
    .then( json => {clientApp.clientCommentsList = json} )
    .catch( err => {
      console.log('CLIENT FETCH ERROR:');
      console.log(err);
    })

  }
})
