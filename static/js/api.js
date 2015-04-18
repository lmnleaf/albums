

window.AlbumAPI = {

  // Get all albums from the server
  get_albums: function(self) {
    var deferred = new $.Deferred();
    $.ajax({
      url: '/albums',
    }).done(function(res) {
      deferred.resolve(res);
      self.setState({albums: res.albums});
      self.setState({filteredAlbums: res.albums});
    });
    return deferred.promise();
  },

  get_album: function(self, singleId) {
    var deferred = new $.Deferred();
    $.ajax({
      url: '/album/' + singleId,
    }).done(function(res) {
      deferred.resolve(res);
      self.setState({single: res.album});
    })
    return deferred.promise();
  }

};
