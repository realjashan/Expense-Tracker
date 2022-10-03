import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import ExpensesSummary from "./ExpensesSummary";
import ExpensesList from "./ExpensesList";





const ExpensesOutput = (props) => {
  const { expenses,expensesPeriod,fallbackText } = props;
  let content=<Text style={styles.infoText}>{fallbackText}</Text>


   if(expenses.length > 0){
    content=  <ExpensesList expenses={expenses} />
   }


  return (
    <View style={styles.container}> 
      <ExpensesSummary expenses={expenses} periodName={expensesPeriod} />
    {content}
    </View>
  );
};

export default ExpensesOutput;

const styles = StyleSheet.create({
container:{
  paddingHorizontal:24,
  paddingTop:24,
  backgroundColor:'#EFE6DD',
  flex:1,
},
infoText:{
  color:'#CF671B',
  fontSize:16,
  textAlign:'center',
  marginTop:32,
}
});
