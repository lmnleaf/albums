(function(window) {

  var SearchBar = React.createClass({
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
            placeholder="Search"
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
        listVisible: false
      }
    },
    show: function() {
      this.replaceState({
        albums: ["Hello", "Goodbye"]
      })
    },
    render: function() {
      return (
          <li className="album" onClick={this.show} >
            { this.props.album.artist }
            { this.props.album.title }
            { this.props.album.year }
            { <img src={this.props.album.image_url}/> }
          </li>
      );
    }
  });

  var Albums = React.createClass({

    handleUserInput: function(filterText, filterResult, albums) {
      var filterResultStuff = [];
      this.state.albums.forEach(function(album) {
        if(album.artist.toLowerCase().indexOf(filterText) != -1) {
          filterResultStuff.push(album);
        }
      });
      this.setState({
        filterText: filterText,
        boo: filterResultStuff
      });
    },
    getInitialState: function() {
      return {
        filterText: "",
        albums: [],
        boo: []
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
        <div> {this.state.boo} </div>
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
