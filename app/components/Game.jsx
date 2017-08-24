import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import Paper from 'material-ui/Paper';
import Chip from 'material-ui/Chip';
import { styles } from './styles';

export default class Game extends React.Component {

  static propTypes = {
    data: PropTypes.object
  }

  renderPlatforms = () => {
    const { data } = this.props;
    return 'platforms' in data ?
      data.platforms.map(platform =>
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

  getScreenshotUrl = () => {
    const { data } = this.props;
    return 'screenshots' in data ? 
      data.screenshots[Math.floor(Math.random() * data.screenshots.length)].url.replace('thumb', 'screenshot_big') :
      '';
  }

  renderGenres = () => {
    const { data } = this.props;
    return 'genres' in data ? 
      data.genres.map(genre => <Chip key={genre.id} style={styles.game.chip}>{genre.name}</Chip>) : 
      <Chip style={styles.game.chip}>N/A</Chip>;
  }

  renderReleaseDates = () => {
    const { data } = this.props;
    return 'release_dates' in data ? 
      <Chip style={styles.game.chip} labelStyle={{lineHeight: 'auto'}}>
        {
          data.release_dates.map(releaseDate => { 
              return { date: releaseDate.date, human: releaseDate.human }
          }).reduce((p,v) => p.date < v.date ? p : v).human
        }
      </Chip>
    : 
    <Chip style={styles.game.chip}>N/A</Chip>;
  }

  shouldComponentUpdate(nextProps) {
    return this.props.data !== nextProps.data;
  }

  render() {
    const { data } = this.props;
    return (
      Object.keys(data).length ?
        <Card style={styles.game.card}>
          <CardHeader className='cardHeader'
            title={<h1 style={styles.game.title}>{data.name}</h1>}
            subtitle={this.renderGenres()}
            avatar={<img src={data.cover ? data.cover.url.replace('thumb', 'cover_big') : ''} />}
            style={{ background: `url(${this.getScreenshotUrl()})`, backgroundSize: '100%' }}
            children={<div className='screenshotOverlay'></div>}
          />
          <CardText style={styles.game.cardText}>
            <span style={{color: '#117ddb', float: 'left', width:'10%'}}>Platforms:</span>
            <div style={{float: 'left', width: '90%'}}>{this.renderPlatforms()}</div>
            <div style={{ marginTop: '30px', paddingTop: '10px'}}>
              <span style={{color: '#117ddb', float: 'left', width:'20%'}}>Release date (earliest):</span>
              <div style={{float: 'left', width: '80%'}}>{this.renderReleaseDates()}</div>
            </div>
            <p style={{clear: 'both' , marginTop: '30px', paddingTop: '10px'}}>{data.summary}</p>
          </CardText>
        </Card> : null
      );
  }
}