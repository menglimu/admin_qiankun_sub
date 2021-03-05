export default {
  methods: {
    getData: function() {
      return this.request({
        url: this.getMessageList,
        method: 'get'
      })
    }
    // ,
    // handleClick: function(params) {
    //   return this.request({
    //     url: this.handleClick,
    //     method: 'post',
    //     headers: {
    //       "Content-Type": "application/x-www-form-urlencoded"
    //     },
    //     data: params
    //   })
    // }
  }
}
