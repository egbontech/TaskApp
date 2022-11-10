import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Alert, FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Entypo from 'react-native-vector-icons/Entypo'
import List from '../components/List';
import AsyncStorage from '@react-native-async-storage/async-storage';

const COLORS = {primary:'#0dcaf0',white:'#fff'}


function Home() {

  const [input,setInput] = useState('')
  const [todo,setTodo] = useState([])
  useEffect(()=> {      
  async function getTodo(){
    try {  
      const todoString = await AsyncStorage.getItem('@todo')  
      if(todoString != null){
        const todo = JSON.parse(todoString)
        setTodo(todo);
      }
    } catch (e) {
      alert(e)
    }
  }
    getTodo()
  },[])

  useEffect(()=> {
    async function saveToDevice(todo){
      try {
        const todoString = JSON.stringify(todo)
        await AsyncStorage.setItem(
          '@todo',
          todoString
        );
      } catch (e) {
        alert(e)
      }
    }
    saveToDevice(todo);
  },[todo])





  function addTodo(){
    if(!input.trim() == '')  
    {
      const newTodo = {
        id:Math.random(),
        task:input,
        completed:false      
      };
      setTodo([
        ...todo,newTodo,        
      ])
      setInput('')
    }  
    else{
      Alert.alert('Error','field is required')
    }
  
  }

  function complete(id){
   const newTodo = todo.map((item) => {
      if(item.id == id){
        Alert.alert('Confirm','Complete task?',[{
          text:'Yes',
          onPress:() => setTodo(newTodo)
        },
      {text:'No'}])
        return {...item,completed:true};
      }
      return item
   });   
  }

  function deleteTodo(id){
    const newTodo = todo.filter(item => item.id != id);
    
    Alert.alert('Confirm','Delete task?',[{
      text:'Yes',
      onPress:() => setTodo(newTodo)
    },
  {text:'No'}])
  }

  function clearTodo(){
    Alert.alert('Confirm','Clear Tasks?',[{
      text:'Yes',
      onPress:() =>  setTodo([]),
    },
    {text:'No'},
  ])


   
  }

  
  return (
    <SafeAreaView style={{height:'100%',backgroundColor:COLORS.white,flex:1}}>
      <StatusBar style='dark'/>
      <View style={styles.header}>
        <View style={{height:40,width:40}}>
        <Image source={require('../assets/logo.png')} style={{width:'100%',height:'100%',resizeMode: 'contain', flex: 1}}/>
        </View>      
        {todo.length > 0 &&   
        <TouchableOpacity onPress={clearTodo}>
        <Text style={{fontWeight:'500',fontSize:17,color:'grey'}}>Clear Tasks</Text>
        </TouchableOpacity> }
           
      </View>
      <FlatList
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{padding:20,paddingBottom:100}}
      data={todo}
      renderItem={({item}) => <List item={item} complete={complete} deleteTodo={deleteTodo}/>}
      />
      <View style={styles.footer}>
        <View style={styles.inputContainer}><TextInput 
        placeholder='Add Task'
        style={{flex:1,width:'100%'}}
        onChangeText={(text) => setInput(text)}
        value={input}
        /></View>
        <TouchableOpacity onPress={addTodo}>
            <View style={styles.iconContainer}><Entypo name='plus'color={COLORS.white} size={20}/></View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header:{
    padding:20,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between'
  },
  footer:{
    position:'absolute',
    bottom:0,
    width:'100%',
    alignItems:'center',
    paddingHorizontal:20, 
    flexDirection:'row',
    justifyContent:'center'   
  },
  inputContainer:{
    elevation:40,
    flex:1,
    height:50,
    marginVertical:20,
    backgroundColor:COLORS.white,
    paddingHorizontal:20,
    marginRight:20,
    borderRadius:30,
    alignItems:'center',
    justifyContent:'center'
  },
  iconContainer:{
    height:50,
    width:50,
    backgroundColor:COLORS.primary,
    borderRadius:25,
    elevation:40,
    justifyContent:'center',
    alignItems:'center'
  }
});


export default Home