import React, {Component} from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import CardList from './CardList'
import Card from './components/Card'
export default class App extends Component {
  
  constructor(){
    super();

    this.state = {
      dataSource: null
    }
  }


  componentDidMount() {

    this.setState({
      dataSource: CardList
    })
  }


  render(){
    return (
      <View style={styles.container}>

      <Card />
      

      </View>
    )
  }


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
