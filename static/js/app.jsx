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
            placeholder="Search by Artist"
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
      album: React.PropTypes.object.isRequired
    },
    getInitialState: function() {
      return {
        showAlbum: false
      }
    },
    showAlbum: function() {
      this.setState({showAlbum: true})
    },
    hideAlbum: function() {
      this.setState({showAlbum: false})
    },
    render: function() {
      if (this.state.showAlbum) {
        return (<div>
                <h1> Here are the album details </h1>
                <button onClick={ this.hideAlbum }>Hide</button>
                { this.props.album.title }
                { this.props.album.year }
                { <img src={this.props.album.image_url}/> }
                </div>)
      } else if (this.state.showAlbum === false) {
      return (
          <div>
          <button onClick={ this.showAlbum }>Show</button>
          <li className="album" >
            { this.props.album.artist }
          </li>
          </div>
      );
    }
    }

  });

  var Albums = React.createClass({

    handleUserInput: function(filterText, filterResult, albums) {
      var filterResults = [];
      this.state.albums.forEach(function(album) {
        if(album.artist.toLowerCase().indexOf(filterText) != -1) {
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
        filteredAlbums: []
      }
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
        <div> {this.state.filteredAlbums} </div>
        <ul className="albums">
        Here are the albums:
        {
          self.state.albums.map(function(album, i) {
              return (
                <Album album={ album } key={ i } />
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
