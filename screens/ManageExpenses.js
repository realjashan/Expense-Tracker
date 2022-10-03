import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constant/style";
import Button from "../components/UI/Button";
import { ExpenseContext } from "../store/Expense-context";
import ExpenseForm from "../components/Expenses/ExpenseForm/ExpenseForm";
import { deleteExpense, storeExpense, updateExpense } from "../utils/http";
import Loading from "../components/UI/Loading";
import ErrorOverlay from "../components/UI/ErrorOverlay";

const ManageExpenses = ({ route }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [error, setError] = useState();

  const editedExpenseId = route.params?.expenseId;
  //converting into boolean type with !! //
  const isEditing = !!editedExpenseId;

  const navigation = useNavigation();

  const expenseCtx = useContext(ExpenseContext);

  //for prefilled values at updated handler//
  const selectedExpense = expenseCtx.expenses.find(
    (expense) => expense.id === editedExpenseId
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditing]);

  async function deleteExpenseHandler() {
    setIsSubmitting(true);
    try {
      await deleteExpense(editedExpenseId);
      expenseCtx.deleteExpense(editedExpenseId);
      navigation.goBack();
    } catch (error) {
      setError("Could not delete expense - please try again later");
      setIsSubmitting(false);
    }
  }

  function errorHandler() {
    setError(null);
  }

  if (error && !isSubmitting) {
    return <ErrorOverlay message={error} onConfirm={errorHandler} />;
  }

  function cancelHandler() {
    navigation.goBack();
  }

  async function confirmHandler(expenseData) {
    setIsSubmitting(true);

    try {
      if (isEditing) {
        expenseCtx.updateExpense(editedExpenseId, expenseData);

        await updateExpense(editedExpenseId, expenseData);
      } else {
        //as id is returned by the function storeExpense//
        const id = await storeExpense(expenseData);
        expenseCtx.addExpense({ ...expenseData, id: id });
      }
      navigation.goBack();
    } catch (error) {
      setError("Could not save data -please try again later");
      setIsSubmitting(false);
    }
  }

  if (isSubmitting) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <ExpenseForm
        onCancel={cancelHandler}
        onSubmit={confirmHandler}
        SubmitButtonLabel={isEditing ? "Update" : "Add"}
        defaultValues={selectedExpense}
      />

      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  );
};

export default ManageExpenses;

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flex: 1,
    backgroundColor: "#EFE6DD",
  },
  deleteContainer: {
    marginTop: 16,
    padding: 8,
    borderTopWidth: 2,
    borderTopColor: "#269B9E",
    alignItems: "center",
  },
});
