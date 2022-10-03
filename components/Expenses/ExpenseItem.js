import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { getFormattedDate } from '../../utils/date';
import { useNavigation } from '@react-navigation/native';

const ExpenseItem = (props) => {

    const{description,date,amount,id}=props;

const navigation=useNavigation();

function pressHandler(){
    navigation.navigate('Manage',{
        expenseId:id,
    })

}

  return (
   <Pressable onPress={pressHandler} style={({pressed})=> pressed && styles.pressed}>
    <View style={styles.expenseItem} >
        <View>
            <Text style={[styles.textBase,styles.description]}>{description}</Text>
            <Text style={styles.textBase}>{getFormattedDate(date)}</Text>

        </View>
        <View style={styles.amountContainer}>
        <Text style={styles.amount}>{amount.toFixed(2)}</Text>

        </View>
    </View>
   </Pressable>
  )
}

export default ExpenseItem

const styles = StyleSheet.create({
    expenseItem:{
        padding:12,
        marginVertical:8,
        backgroundColor:'#269B9E',
        flexDirection:'row',
        justifyContent:'space-between',
        borderRadius:6,
        elevation:3,
        shadowColor:'#C0C0C0',
        shadowRadius:4,
        shadowOffset:{width:1,height:1},
        shadowOpacity:0.4,
    },

    textBase:{
        color:'white',

    },

    description:{
        fontSize:16,
        marginBottom:4,
        fontWeight:'bold',

    },

    amountContainer:{
        paddingHorizontal:12,
        paddingVertical:4,
        backgroundColor:'white',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:4,
        minWidth:70,

    },

    amount:{
        color:'grey',
        fontWeight:'bold',
    },

    pressed:{
        opacity:0.75,
    }
})