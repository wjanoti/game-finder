import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import AutoComplete from 'material-ui/AutoComplete';
import { Grid, Row, Col } from 'react-bootstrap';
import { styles } from './styles.js';

const Search = (props) => (
  <Grid>
    <Row>
      <span style={styles.search.pageTitle}>GameFinder</span>
      <AutoComplete
        fullWidth
        dataSource={props.suggestions}
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
        onUpdateInput={(gameName) => { gameName.length % 3 === 0 ? props.fetchSuggestions(gameName) : null }}
        onNewRequest={(game) => props.fetchGameInfo(game.id)}
      />
    </Row>
  </Grid>
)

Search.propTypes = {
  suggestions: PropTypes.array,
  fetchGameInfo: PropTypes.func.isRequired,
  fetchSuggestions: PropTypes.func.isRequired
}

export default Search;