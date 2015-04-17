(function(window) {

  var Route = ReactRouter.Route;
  var Router = ReactRouter;
  var DefaultRoute = ReactRouter.DefaultRoute;
  var RouteHandler = ReactRouter.RouteHandler;
  var Link = ReactRouter.Link;

  var Single = React.createClass({

    contextTypes: {
      router: React.PropTypes.func
    },
    getInitialState: function() {
      return {
        single: {}
      }
    },
    componentDidMount: function() {
      var singleId = this.context.router.getCurrentParams().id;
      var self = this;
      return window.AlbumAPI.get_album(self, singleId);
    },
    render: function() {
      return(
        <div className="single">{this.state.single.title}</div>
        );
    }

  });

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
        <form className="album-form">
          <input className="album-search" id="album-search-search"
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
    contextTypes: {
      router: React.PropTypes.func
    },
    propTypes: {
      album: React.PropTypes.object.isRequired,
      showAllInfo: React.PropTypes.bool,
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
            <li className="album row more-info" onClick={ this.hideAlbum }>
              { <img
                className="thumb col-md-offset-2 col-md-1"
                src={this.props.album.image_url} onClick={ this.hideAlbum }
                /> }
              <div className="col-md-5 pull-right album-info">
                <div className="row">
                  { this.props.album.title }
                </div>
                <div className="row">
                  { this.props.album.artist }
                </div>
                <div className="row">
                  { this.props.album.year }
                </div>
              </div>
            </li>
          );
        } else if (this.state.showAlbum === false) {
          return (
            <li className="album row less-info" onClick={ this.showAlbum }>
              <div className="col-md-offset-2">
                { this.props.album.title } by { this.props.album.artist }
              </div>
            </li>
          );
        }
      } else if (this.props.showAllInfo) {
        return (
          <li className="album row">
            <div className="col-md-offset-2 col-md-1 image-column">
              { <img className="thumb" src={this.props.album.image_url}/> }
            </div>
            <div className="col-md-7 pull-right album-info">
              <div className="row">
              <Link to="single" params={{id: this.props.album._id}}>{ this.props.album.title }</Link>
              </div>
              <div className="row">
                { this.props.album.artist }
              </div>
              <div className="row">
                { this.props.album.year }
              </div>
            </div>
          </li>
        )
      }
    }

  });

  var Albums = React.createClass({
    contextTypes: {
      router: React.PropTypes.func
    },
    handleUserInput: function(filterText, filterResult, albums) {
      var filterResults = [];
      this.state.albums.forEach(function(album) {
        if (
            album.artist.toLowerCase().indexOf(filterText.toLowerCase()) != -1
            ||
            album.title.toLowerCase().indexOf(filterText.toLowerCase()) != -1
          ) {
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
        this.setState({ showAllInfo: false });
        jQuery('.info-button').html('Show Details');
      } else {
        this.setState({showAllInfo: true});
        jQuery('.info-button').html('Hide Details');
      }
    },
    hideAllInfo: function() {
      this.setState({showAllInfo: false});
      jQuery('.info-button').html('More Info')
    },
    componentDidMount: function() {
      var self = this;
      return window.AlbumAPI.get_albums(self);
    },
    render: function() {
      var self = this;
      return (
        <div>
          <div className="search-row row">
            <SearchBar
              filterText={this.state.filterText}
              filterResult={this.state.filterResult}
              onUserInput={this.handleUserInput}
            />
            <button className="info-button pull-right" onClick={ this.showAllInfo }>
              Show Details
            </button>
          </div>
          <ul className="albums col-md-offset-1 col-md-10">
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
            <RouteHandler/>
        </div>
      );
    }

  });

  var App = React.createClass({
    render: function() {
      return (
        <div>
          <Link to="albums">Albums</Link>
          <RouteHandler />
        </div>
      )
    }
  });

  var routes = (
    <Route name="app" path="/" handler={App}>
        <Route name="albums" path="albums/" handler={Albums}/>
        <Route name="single" path="album/:id" handler={Single}/>
    </Route>
  );

  Router.run(routes, function (Handler) {
    React.render(<Handler/>, document.getElementById('albums-container'));
  });

})(window);
