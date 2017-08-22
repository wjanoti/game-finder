import React from 'react';
import { Card, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import Paper from 'material-ui/Paper';
import Chip from 'material-ui/Chip';
import { styles } from './styles';

export default class Game extends React.Component {

  renderPlatforms = (game) => {
    return 'platforms' in game ? 
      game.platforms.map(platform => 
        <Chip 
          key={platform.id}
          labelColor="#666"
          labelStyle={{lineHeight: 'auto'}}
          style={styles.game.platformChip}
        > 
          {platform.name}
        </Chip>) : 
      <Chip labelColor="#666" labelStyle={{lineHeight: 'auto'}} style={styles.game.platformChip}>N/A</Chip>
  }

  getScreenshotUrl = (game) => {
    return 'screenshots' in game ? 
      game.screenshots[Math.floor(Math.random() * game.screenshots.length)].url.replace('thumb', 'screenshot_big') :
      '';
  }

  renderGenres = (game) => {
    return 'genres' in game ? 
      game.genres.map(genre => 
        <Chip 
          key={genre.id} 
          style={styles.game.chip}
        >
          {genre.name}
        </Chip>) : 
      null;
  }

  shouldComponentUpdate(nextProps) {
    return this.props.game !== nextProps.game;
  }

  render() {
    const { game } = this.props;
    return (
      Object.keys(game).length ?
        <Card style={styles.game.card}>
          <CardHeader className='cardHeader'
            title={<h1 style={styles.game.title}>{game.name}</h1>}
            subtitle={this.renderGenres(game)}
            avatar={<img src={game.cover ? game.cover.url.replace('thumb', 'cover_big') : ''} />}
            style={{ background: `url(${this.getScreenshotUrl(game)})`, backgroundSize: '100%' }}
            children={<div className='screenshotOverlay'></div>}
          />
          <CardText style={styles.game.cardText}>
            <span style={{color: '#117ddb', float: 'left', width:'10%'}}>Platforms:</span>
            <div style={{float: 'left', width: '90%'}}>{this.renderPlatforms(game)}</div>
            <p style={{clear: 'both'}}>{game.summary}</p>
          </CardText>
        </Card>
        : 
        null
      );
  }
}