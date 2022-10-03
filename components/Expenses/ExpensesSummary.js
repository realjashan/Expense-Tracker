import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const ExpensesSummary = (props) => {

    const {periodName,expenses}=props;
    const expensesSum=expenses.reduce((sum,expense)=>{
        return sum + expense.amount
    },0)
  return (
    <View style={styles.container}>
    <Text style={styles.period}>{periodName}</Text>
    <Text style={styles.sum}>${expensesSum.toFixed(2)}</Text>

</View>
  )
}

export default ExpensesSummary

const styles = StyleSheet.create({
  container:{
    padding:8,
    backgroundColor:'#CCFFFF',
    borderRadius:6,
    flexDirection:"row",
    justifyContent:'space-between',
    alignItems:'center',
  
  },
  
  period:{
    fontSize:12,
    color:'#C67428',
  
  },
  
  sum:{
    fontSize:16,
    fontWeight:'bold',
    color:'#CF671B'
  }
  
})