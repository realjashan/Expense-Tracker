import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Button from './Button'
import { GlobalStyles } from '../../constant/style'


const ErrorOverlay = ({message,onConfirm}) => {
  return (
    <View style={styles.container}>
 <Text style={[styles.text,styles.title]}>An Error Occured!</Text>
 <Text style={styles.title}>{message}</Text>
<Button style={styles.button} onPress={onConfirm}>Okay</Button>

    </View>
  )
}

export default ErrorOverlay

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        padding:24,
        backgroundColor:'#269B9E',
    },
    text:{
        textAlign:'center',
        marginBottom:8,
        color:'white',
    },
    title:{
        fontSize:20,
        fontWeight:'bold',
        color:'white',
      
    },
 
  
})