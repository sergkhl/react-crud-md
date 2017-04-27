import React from 'react';
import Section from './Section';
import Footer from './Footer';
import { Card, CardHeader } from 'material-ui/Card';
import avatar from '../../img/icon.png';

const Home = () => {
  return (
    <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>
      <Card style={{margin: 20, order: 2, flex: '1 100%', maxWidth: 1024}}>
        <CardHeader
          title="React CRUD Material design"
          subtitle="by WayFusion"
          avatar={avatar}
        />
        <Section/>
        <Footer/>
      </Card>
    </div>
  );
};

export default Home;
