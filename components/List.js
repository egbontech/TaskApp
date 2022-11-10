import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const COLORS = {primary:'#0dcaf0',white:'#fff'}

function List({item,complete,deleteTodo}) {
  return (
    <View style={styles.listItem}>
        <View style={{flex:1}}>
        <Text style={{fontWeight:'600',fontSize:15,color:'grey',textDecorationLine:item?.completed ? 'line-through' : 'none'}}>{item?.task}</Text>
        </View>
        { !item?.completed &&  
         <TouchableOpacity style={styles.actionIcon} onPress={() => complete(item?.id)}>
            <MaterialIcons name='done' size={20} color={COLORS.white}/>
        </TouchableOpacity>
        }         
        <TouchableOpacity style={[styles.actionIcon,{backgroundColor:'red',marginLeft:20}]} onPress={() => deleteTodo(item?.id)}>
            <MaterialIcons name='delete' size={20} color={COLORS.white}/>
        </TouchableOpacity>     
    </View>
  )
}

const styles = StyleSheet.create({ 
    listItem:{
        padding:20,
        backgroundColor:COLORS.white,
        flexDirection:'row',
        elevation:15,
        borderRadius:7,
        marginVertical:10        
    },
    actionIcon:{
        height:25,
        width:25,
        backgroundColor:COLORS.primary,
        justifyContent:'center',
        alignItems:'center',
        marginLeft:5,
        borderRadius:5    
    }
})

export default List
