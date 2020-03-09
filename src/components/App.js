import React from 'react';
import './App.css';
import {Switch, Route} from 'react-router-dom'
import NavbarKlarity from './Navbar';
import Annotate from '../Containers/Annotations/Annotate';
import ModifyAnnotation from '../Containers/Annotations/ModifyAnnotation';
import {data} from '../data';
import {connect} from 'react-redux';
import {saveJsonData} from '../actions';

class App extends React.Component{
    componentWillMount(){
        this.props.saveJsonData(data);
    }
    render(){
        return (
            <React.Fragment>
                <NavbarKlarity/>
                <Switch>
                    <Route exact path="/"><Annotate/></Route>
                    <Route exact path="/modify" component={ModifyAnnotation}/>
                </Switch>
            </React.Fragment>
        )
    }
}

const mapDispatchToProps = {
    saveJsonData
  }

export default connect(null,mapDispatchToProps) (App);