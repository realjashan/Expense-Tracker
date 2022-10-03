import { Alert, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import Input from "./Input";
 
import { getFormattedDate } from "../../../utils/date";
import Button from "../../UI/Button";
 

function ExpenseForm({ SubmitButtonLabel, onCancel, onSubmit, defaultValues }) {
  const [inputs, setInputs] = useState({
    amount: {
      value: defaultValues ? defaultValues.amount.toString() : '',
      isValid: true,
    },
    date: {
      value: defaultValues ? getFormattedDate(defaultValues.date) : '',
      isValid: true,
    },
    description: {
      value: defaultValues ? defaultValues.description : '',
      isValid: true,
    },
  });

  function inputChangedHandler(inputIdentifier, enteredValue) {
    setInputs((curInputs) => {
      return {
        ...curInputs,
        [inputIdentifier]: { value: enteredValue, isValid: true },
      };
    });
  }

  function submitHandler() {
    const expenseData = {
      amount: +inputs.amount.value,
      date: new Date(inputs.date.value),
      description: inputs.description.value,
    };

    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateIsValid = expenseData.date.toString() !== 'Invalid Date';
    const descriptionIsValid = expenseData.description.trim().length > 0;

    if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
      // Alert.alert('Invalid input', 'Please check your input values');
      setInputs((curInputs) => {
        return {
          amount: { value: curInputs.amount.value, isValid: amountIsValid },
          date: { value: curInputs.date.value, isValid: dateIsValid },
          description: {
            value: curInputs.description.value,
            isValid: descriptionIsValid,
          },
        };
      });
      return;
    }

    onSubmit(expenseData);
  }

  const formIsInvalid =
    !inputs.amount.isValid ||
    !inputs.date.isValid ||
    !inputs.description.isValid;

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputsRow}>
        <Input
          style={styles.rowInput}
          label="Amount"
          invalid={!inputs.amount.isValid}
          textInputConfig={{
            keyboardType: 'decimal-pad',
            onChangeText: inputChangedHandler.bind(this, 'amount'),
            value: inputs.amount.value,
          }}
        />
        <Input
          style={styles.rowInput}
          label="Date"
          invalid={!inputs.date.isValid}
          textInputConfig={{
            placeholder: 'YYYY-MM-DD',
            maxLength: 10,
            onChangeText: inputChangedHandler.bind(this, 'date'),
            value: inputs.date.value,
          }}
        />
      </View>
      <Input
        label="Description"
        invalid={!inputs.description.isValid}
        textInputConfig={{
          multiline: true,
          // autoCapitalize: 'none'
          // autoCorrect: false // default is true
          onChangeText: inputChangedHandler.bind(this, 'description'),
          value: inputs.description.value,
        }}
      />
      {formIsInvalid && (
        <Text style={styles.errorText}>
          Invalid input values - please check your entered data!
        </Text>
      )}
      <View style={styles.buttons}>
        <Button style={styles.button} mode="flat" onPress={onCancel}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={submitHandler}>
          { SubmitButtonLabel}
          </Button>
      </View>
    </View>
  );
}

export default ExpenseForm;

const styles = StyleSheet.create({
  form: {
    marginTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: "#CF671B",
    marginVertical: 24,
    textAlign: 'center',
  },
  inputsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowInput: {
    flex: 1,
  },
  errorText: {
    textAlign: 'center',
   color:'#CF671B',
    margin: 8,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  
  },
});






// import { Alert, StyleSheet, Text, View } from "react-native";
// import React, { useState } from "react";
// import Input from "./Input";
// import Button from "../../UI/Button";
// import { getFormattedDate } from "../../../utils/date";

// const ExpenseForm = ({
//   onCancel,
//   onSubmit,
//   SubmitButtonLabel,
//   defaultValues,
// }) => {
//   const [inputs, setInputs] = useState({
//     amount: {
//       value: defaultValues ? defaultValues.amount.toString() : "",
//       isValid:true,
//     },
//     date: {
//       value: defaultValues ? getFormattedDate(defaultValues.date) : "",
//       isValid:true,
//     },
//     description: {
//       value: defaultValues ? defaultValues.description : "",
//       isValid:true,
//     },
//   });

//   function SubmitHandler() {
//     //data for prefilled data to update//

//     const expenseData = {
//       amount: +inputs.amount.value,
//       date: new Date(inputs.date.value),
//       description: inputs.description.value,
//     };

//     //adding validations//
//     const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
//     const dateIsValid = expenseData.date.toString() !== "Invalid Date";
//     const descriptionIsValid = expenseData.description.trim().length > 0;

//     if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
//       setInputs((curInputs) => {
//         return {
//           amount: { value: curInputs.amount.value, isValid: amountIsValid },
//           date: { value: curInputs.date.value, isValid: dateIsValid },
//           description: {
//             value: curInputs.description.value,
//             isValid: descriptionIsValid,
//           },
//         };
//       });
//     }

//     onSubmit(expenseData);
//   }

//   //enteredValue is automatically accepted by function//

//   function inputChangedHandler(inputIdentifier, enteredValue) {
//     setInputs((curInputs) => {
//       return {
//         ...curInputs,
//         [inputIdentifier]: { value: enteredValue, isValid: true },
//       };
//     });
//   }


// const formIsInValid=!inputs.amount.isValid || !inputs.date.isValid || !inputs.description.isValid;



//   return (
//     <View style={styles.form}>
//       <Text style={styles.title}>Your Expense</Text>
//       <View style={styles.inputsRow}>
//         <Input
//           style={styles.rowInput}
//           label="Amount"
//           textInputConfig={{
//             keyboardType: "decimal-pad",
//             onChangeText: inputChangedHandler.bind(this, "amount"),
//             value: inputs.amount.value,
//           }}
//         />



//         <Input
//           style={styles.rowInput}
//           label="Date"
//           textInputConfig={{
//             placeholder: "YYYY-MM-DD",
//             maxLength: 10,
//             onChangeText: inputChangedHandler.bind(this, "date"),
//             value: inputs.date.value,
//           }}
//         />
//       </View>
//       <Input
//         label="Description"
//         textInputConfig={{
//           multiline: true,
//           // autoCorrect:false
//           onChangeText: inputChangedHandler.bind(this, "description"),
//           value: inputs.description.value,
//         }}
//       />
// {formIsInValid && ( <Text>Please check the entered value!</Text>  )}

//       <View style={styles.buttons}>
//         <Button style={styles.button} mode="flat" onPress={onCancel}>
//           Cancel
//         </Button>
//         <Button style={styles.button} onPress={SubmitHandler}>
//           {SubmitButtonLabel}
//         </Button>
//       </View>
//     </View>
//   );
// };

// export default ExpenseForm;

// const styles = StyleSheet.create({
//   inputsRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//   },
//   rowInput: {
//     flex: 1,
//   },
//   form: {
//     marginTop: 70,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "bold",
//     color: "#CF671B",
//     marginVertical: 24,
//     textAlign: "center",
//   },
//   buttons: {
//     flexDirection: "row",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   button: {
//     marginHorizontal: 8,
//     minWidth: 120,
//   },
// });