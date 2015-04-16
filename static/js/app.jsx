(function(window) {

  var SearchBar = React.createClass({

    propTypes: {
      filterText: React.PropTypes.string
    },
    handleChange: function() {
      this.props.onUserInput(
        this.refs.filterTextInput.getDOMNode().value
      );
    },
    render: function() {
      return (
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="Search by Title or Artist"
            value={this.props.filterText}
            ref="filterTextInput"
            onChange={this.handleChange}
          />
        </form>
      );
    }

  });

  var Album = React.createClass({

    propTypes: {
      album: React.PropTypes.object.isRequired,
      showAllInfo: React.PropTypes.boolean
    },
    getInitialState: function() {
      return {
        showAlbum: false,
      }
    },
    showAlbum: function() {
      this.setState({showAlbum: true})
    },
    hideAlbum: function() {
      this.setState({showAlbum: false})
    },
    render: function() {
      if (this.props.showAllInfo === false) {
        if (this.state.showAlbum) {
          return (
            <div>
              <p> Here are the album details </p>
              <button onClick={ this.hideAlbum }>Hide</button>
              { this.props.album.title }
              { this.props.album.artist }
              { this.props.album.year }
              { <img src={this.props.album.image_url}/> }
            </div>
          );
        } else if (this.state.showAlbum === false) {
          return (
            <div>
              <li className="album" onClick={ this.showAlbum }>
              { this.props.album.title }
              { this.props.album.artist }
              </li>
            </div>
          );
        }
      } else if (this.props.showAllInfo) {
        return (
          <li className="album" >
            { this.props.album.title }
            { this.props.album.artist }
            { this.props.album.year }
            { <img src={this.props.album.image_url}/> }
          </li>
        )
      }
    }

  });

  var Albums = React.createClass({

    handleUserInput: function(filterText, filterResult, albums) {
      var filterResults = [];
      this.state.albums.forEach(function(album) {
        if (album.artist.toLowerCase().indexOf(filterText.toLowerCase()) != -1 || album.title.toLowerCase().indexOf(filterText.toLowerCase()) != -1) {
          filterResults.push(album);
        }
      });
      this.setState({
        filterText: filterText,
        filteredAlbums: filterResults
      });
    },
    getInitialState: function() {
      return {
        filterText: "",
        albums: [],
        filteredAlbums: [],
        showAllInfo: false
      }
    },
    showAllInfo: function() {
      if (this.state.showAllInfo) {
        this.setState({ showAllInfo: false })
        jQuery('.info-button').html('More Info');
      } else {
        this.setState({showAllInfo: true})
        jQuery('.info-button').html('Less Info');
      }
    },
    hideAllInfo: function() {
      this.setState({showAllInfo: false})
    },
    componentDidMount: function() {
      var self = this;
      return window.AlbumAPI.get_albums(self);
    },
    render: function() {
      var self = this;
      return (
        <div>
        <SearchBar
          filterText={this.state.filterText}
          filterResult={this.state.filterResult}
          onUserInput={this.handleUserInput}
        />
        <button className="info-button" onClick={ this.showAllInfo }>More Info</button>
        <ul className="albums">
        {
          self.state.filteredAlbums.map(function(album, i, showAllInfo) {
              return (
                <Album
                  album={ album }
                  key={ i }
                  showAllInfo={ self.state.showAllInfo }
                />
              )
          })
        }
        </ul>
        </div>
      );
    }

  });

  var AlbumsFactory = React.createFactory(Albums);

  React.render(AlbumsFactory({}), document.getElementById('albums-container'));

})(window);
