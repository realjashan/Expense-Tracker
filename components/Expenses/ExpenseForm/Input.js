import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { GlobalStyles } from "../../../constant/style";

const Input = ({ label, textInputConfig, style ,invalid}) => {
  const inputStyle = [styles.input];

  if (textInputConfig && textInputConfig.multiline) {
    inputStyle.push(styles.inputMultiline);
  }

  if(invalid){
    inputStyle.push(styles.invalidInput);
  }

  return (
    <View style={[styles.inputContainer, style]}>
      <Text style={[styles.label,invalid && styles.invalidLabel]}>{label}</Text>
      <TextInput style={inputStyle} {...textInputConfig} />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 4,
    marginVertical: 8,
  },
  label: {
    fontSize: 12,
    color: "",
    marginBottom: 4,
  },
  input: {
    backgroundColor: "#CCFFFF",
    padding: 6,
    borderRadius: 6,
    fontSize: 18,
    color: "#CF671B",
  },
  inputMultiline: {
    minHeight: 100,
    textAlignVertical: "top",
  },
  invalidLabel:{
    color:GlobalStyles.colors.error500,
  },
invalidInput:{
backgroundColor:GlobalStyles.colors.error50,
},

});
