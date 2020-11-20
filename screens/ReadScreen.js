import React from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView,FlatList } from 'react-native';
import { Header } from 'react-native-elements';
import db from '../config';
import * as firebase from 'firebase'
import { Searchbar } from 'react-native-paper';


export default class ReadScreen extends React.Component {
  constructor()
  {
    super()
    this.state={
      Search:'',
      Story:[],
    }
  }
  
  retrieveStories=()=>{
    try {
      var allStories= []
      var stories = db.collection("stories")
        .get().then((querySnapshot)=> {
          querySnapshot.forEach((doc)=> {
              // doc.data() is never undefined for query doc snapshots
              
              allStories.push(doc.data())
              console.log('this are the stories',allStories)
          })
          this.setState({allStories})
        })
    }
    catch (error) {
      console.log(error);
    }
  };

componentDidMount()
  {
    this.retrieveStories()
  }

  /*updateSearch=async(text)=>
  {
    var t=text
    const search= await db.collection("Writers").where("Story","==",t).get()
    read.docs.map((doc)=>{
      this.setState({
          Story:[...this.state.Story,doc.data()],         
      })
  })
    
  }*/

    render(){
    return (
      <KeyboardAvoidingView behavior='padding' enabled >
       <Header
    centerComponent={{text:'STORY HUB', style: { color: '#fff', fontSize: 20 }}}
    />
    <Searchbar
    placeholder="Search Story..."
    onChangeText={this.updateSearch}
    />
    <FlatList
    data={this.state.Story}
    renderItem={({item})=>
      (
        <View style={{borderBottomWidth:2,}}>
        <Text>{"Title: "+item.Title}</Text>
        <Text>{"Author: "+item.Author}</Text>
        <Text>{"Story: "+item.Story}</Text>
        </View>
      )}
    keyExtractor={(item,index)=>
       index.toString()}
    
    />

      </KeyboardAvoidingView>
    );
  }
  }
  const styles = StyleSheet.create({

  })
    