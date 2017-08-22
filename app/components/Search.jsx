import React from 'react';
import TextField from 'material-ui/TextField';
import AutoComplete from 'material-ui/AutoComplete';
import { Grid, Row, Col } from 'react-bootstrap';
import Game from './Game.jsx';
import { styles } from './styles.js';

export default class Search extends React.Component {

  constructor(props) {
    super(props);
    this.fetchSuggestions = this.fetchSuggestions.bind(this);
    this.fetchGameInfo = this.fetchGameInfo.bind(this);
    this.fetchPlatforms = this.fetchPlatforms.bind(this);
    this.state = {
      searchTerm: '' ,
      suggestions: [],
      selectedGame: {}
    };
  }

  fetchSuggestions(query) {
    fetch(`/api/search?gameName=${query}`)
      .then(response => response.json())
      .then(json => {
        this.setState({
          searchTerm: query,
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
          selectedGame: responseJson.body[0]
        })
    });
  }

  fetchPlatforms(platformIds) {
    fetch(`/api/platform/${platformIds.join(',')}`)
      .then(response => response.json())
      .then(responseJson => {
        this.setState(prevState => {
          return {
            selectedGame: {
              ...prevState.selectedGame,
              platforms: responseJson.body
            }
          }
        })
      });
  }

  render() {
    return (
      <Grid>
          <Row>
              <span style={styles.search.pageTitle}>GameFinder</span>
                <AutoComplete
                  fullWidth
                  dataSource={this.state.suggestions}
                  dataSourceConfig={{
                    text: 'name',
                    value: 'id'
                  }}
                  filter={AutoComplete.noFilter}
                  hintText="Game title"
                  floatingLabelText="Search for a game"
                  floatingLabelStyle={styles.search.floatingLabel}
                  style={styles.search.textField}
                  underlineFocusStyle={styles.search.underlineFocus}
                  underlineStyle={styles.search.underline}
                  onUpdateInput={(gameName) => { gameName.length % 3 === 0 ? this.fetchSuggestions(gameName) : null }}
                  onNewRequest={(game) => this.fetchGameInfo(game.id)}
                />
            </Row>
            <Row>
              <Col xs={12} md={12}>
                <div style={{marginTop: '20px'}}>
                  <Game game={this.state.selectedGame} />
                </div>
              </Col>
            </Row>
      </Grid>
    );
  }

};