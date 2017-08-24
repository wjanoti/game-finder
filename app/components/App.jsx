import React from 'react';
import Search from './Search.jsx';
import Game from './Game.jsx';

export default class App extends React.Component {

  constructor() {
    super();
    this.fetchSuggestions = this.fetchSuggestions.bind(this);
    this.fetchGameInfo = this.fetchGameInfo.bind(this);
    this.fetchPlatforms = this.fetchPlatforms.bind(this);
    this.state = {
      gameData: {},
      suggestions: []
    }
  }

  fetchSuggestions(query) {
    fetch(`/api/search?gameName=${query}`)
      .then(response => response.json())
      .then(json => {
        this.setState({
          suggestions: json.body
        })
    });
  }

  fetchGameInfo(gameId) {
    fetch(`/api/game/${gameId}`)
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.body[0].release_dates) {
          this.fetchPlatforms(
            [...new Set(responseJson.body[0].release_dates.map(release_date => release_date.platform))]
          );
        }
        this.setState({
          gameData: responseJson.body[0]
        })
    });
  }

  fetchPlatforms(platformIds) {
    fetch(`/api/platform/${platformIds.join(',')}`)
      .then(response => response.json())
      .then(responseJson => {
        this.setState(prevState => {
          return {
            gameData: {
              ...prevState.gameData,
              platforms: responseJson.body
            }
          }
        })
      });
  }

  render() {
    return (
      <div>
        <Search
          suggestions={this.state.suggestions}
          fetchGameInfo={this.fetchGameInfo}
          fetchSuggestions={this.fetchSuggestions}
        />
        <Game data={this.state.gameData} />
      </div>
    )
  }
}