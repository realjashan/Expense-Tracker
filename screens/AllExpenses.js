import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import ExpensesOutput from '../components/Expenses/ExpensesOutput'
import { ExpenseContext } from '../store/Expense-context'

const AllExpenses = () => {

const expenseCtx=useContext(ExpenseContext);

  return (
    <ExpensesOutput expensesPeriod='Total' expenses={expenseCtx.expenses}  fallbackText="No registered expenses found!! "/>
  )
}

export default AllExpenses

const styles = StyleSheet.create({})