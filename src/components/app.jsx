"use strict";

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import ReactDimensions from 'react-dimensions';

import actions from '../actions/actions';

import SceneComponents from '../scene-components/scene-components';
import Layout from './layout.jsx';


class App extends React.Component {

  getChildContext() {
    let ctx = {
      sceneComponents: SceneComponents
    };

    for(let actionGroupName in actions){
      ctx[actionGroupName] = this.props[actionGroupName];
    }

    return ctx;
  }

  render() {
    let {containerWidth, containerHeight, ...props} = this.props;
    return <Layout width={containerWidth} height={containerHeight} {...props} />;
  }
}


App.childContextTypes={
  sceneComponents: React.PropTypes.object,
};
for(let actionName in actions){
  App.childContextTypes[actionName] = PropTypes.object
}


function mapStateToProps(state) {
  return {state};
}

function mapDispatchToProps(dispatch) {
  let dispatchableActions = {};
  for(let actionGroupName in actions){
    dispatchableActions[actionGroupName] = bindActionCreators(actions[actionGroupName], dispatch);
  }
  return dispatchableActions;
}

App = connect(mapStateToProps, mapDispatchToProps)(App);
App = ReactDimensions()(App);
export default App;
