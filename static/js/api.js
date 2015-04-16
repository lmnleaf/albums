

window.AlbumAPI = {

  // Get all albums from the server
  get_albums: function(self) {
    var deferred = new $.Deferred();
    $.ajax({
      url: '/albums',
    }).done(function(res) {
      deferred.resolve(res);
      self.setState({albums: res.albums});
      self.setState({boo: res.albums});
    });
    return deferred.promise();
  }

};
