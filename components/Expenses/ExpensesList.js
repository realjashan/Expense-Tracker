import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ExpenseItem from './ExpenseItem';

const ExpensesList = (props) => {
const {expenses}=props;

function renderExpensesItem(itemData){
  return  <ExpenseItem {...itemData.item}/>

}


  return (
     <FlatList data={expenses} renderItem={renderExpensesItem} keyExtractor={(item)=>item.id}/>
  )
}

export default ExpensesList

const styles = StyleSheet.create({})