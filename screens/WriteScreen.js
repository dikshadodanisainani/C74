import React from 'react';
import { StyleSheet, Text, View,TextInput,TouchableOpacity, KeyboardAvoidingView, Alert } from 'react-native';
import { Header } from 'react-native-elements';
import db from '../config';



export default class WriteScreen extends React.Component {
  constructor()
  {
    super()
    this.state={
      Author:'',
      Title:'',
      Story:'',
      ButtonState:'normal',
    }
  }

  Submit=async()=>
  { 
    const {Story}=this.state
    if(Story!=='')
    {
    this.setState({ButtonState:'Pressed'})
    db.collection("Writers").add({
      'Author':this.state.Author,
      'Title':this.state.Title,
      'Story':this.state.Story,
    })
    Alert.alert("Your story is submitted")
  }
  else {
    Alert.alert("You havn't written any story")
  }
   
  }

  Clear=()=>
  {
    this.setState({
      Author:'',
      Title:'',
      Story:'',
      ButtonState:'normal',
    })
  }

    render(){
    return (

      <KeyboardAvoidingView behavior="padding" enabled>
        <Header
    centerComponent={{text:'STORY HUB', style: { color: '#fff', fontSize: 20 }}}
    />
        <View>
          <TextInput
          style={styles.inputBox}
          placeholder="Title"
          onChangeText={(text) => {
            this.setState({ Title: text });
          }}
          value={this.state.Title}
        />
        </View>

        <View>
          <TextInput
          style={styles.inputBox}
          placeholder="Author"
          onChangeText={(textt) => {
            this.setState({ Author: textt });
          }}
          value={this.state.Author}
        />
        </View>

        <View>
          <TextInput
          style={styles.storyBox}
          placeholder="Story"
          onChangeText={(textt) => {
            this.setState({ Story: textt });
          }}
          value={this.state.Story}
        />
        </View>

        <TouchableOpacity style={styles.submitButton}
        onPress={async()=>
        {
          this.Submit()
        }}
        > <Text style={styles.submitbuttonText}>SUBMIT</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.submitButton}
        onPress={async()=>{
          this.Clear()
        }}
        ><Text style={styles.submitbuttonText}>CLEAR</Text>
          </TouchableOpacity>
      </KeyboardAvoidingView>
    );
  }
  }

  const styles = StyleSheet.create({
    inputBox: {
      marginTop: 30,
      width: '20%',
      height: 40,
      textAlign: 'center',
      borderWidth: 3,
      marginLeft:20,
    },
    storyBox: {
      width: '200%',
      height: 400,
      textAlign:'auto',
      borderWidth: 3,
      justifyContent:'center',
      fontSize:20,
      marginLeft:20,
      marginTop: 30,
    },
    submitButton:
    {
        backgroundColor:'teal',
        width:100,
        height:50,
        justifyContent:'center',
        borderWidth:2,
        marginLeft:100,
        alignItems:'center',
        marginTop:20,
        
    },
    submitbuttonText:
    {
        fontSize:20,
        textAlign:'center',
        color:'white',
    },
    
  });
  