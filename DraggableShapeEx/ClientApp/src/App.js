import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { AntSimulator } from './components/AntSimulator';
import { DraggableShapes } from './components/DraggableShapes';

import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
          <Route path='/ant-simulator' component={AntSimulator} />
        <Route path='/draggable-shapes' component={DraggableShapes} />
      </Layout>
        
    );
  }
}
