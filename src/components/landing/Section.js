import React from 'react';
import { GridList, GridTile } from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import LinkIcon from 'material-ui/svg-icons/content/link';
import pic1 from '../../img/picture1.jpg';
import pic2 from '../../img/picture2.jpg';
import pic3 from '../../img/picture3.jpg';
import pic4 from '../../img/picture4.jpg';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    maxWidth: 1024
  },
};

const tilesData = [
  {
    img: pic1,
    title: 'ReactJS',
    url: 'https://facebook.github.io/react',
    subtitle: 'ReactJS/Redux using the ES2015 (ES6) syntax.',
  },
  {
    img: pic2,
    url: 'https://reacttraining.com/react-router',
    title: 'React Router 4',
    subtitle: 'Declarative routing for ReactJS apps.',
  },
  {
    img: pic3,
    url: 'https://reacttraining.com/react-router',
    title: 'Material UI',
    subtitle: 'A Set of React Components that Implement Google\'s Material Design',
  },
  {
    img: pic4,
    url: 'https://reacttraining.com/react-router',
    title: 'Responsive',
    subtitle: 'Mobile first, unobtrusive JavaScript, and progressive enhancement',
  }
];

const Section = () => {
  return (
    <div style={styles.root}>
      <GridList
        cellHeight={200}
        style={styles.gridList}
      >
        <Subheader>April 26, 2017</Subheader>
        {tilesData.map((tile) => (
          <GridTile
            key={tile.img}
            titlePosition="top"
            actionPosition="left"
            title={tile.title}
            subtitle={<span><b>{tile.subtitle}</b></span>}
            actionIcon={<IconButton><LinkIcon color="white"/></IconButton>}
          >
            <img src={tile.img} alt={tile.title}/>
          </GridTile>
        ))}
      </GridList>
    </div>

  );
};

export default Section;
