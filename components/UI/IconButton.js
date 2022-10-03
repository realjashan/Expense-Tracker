import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { GlobalStyles } from "../../constant/style";

const IconButton = (props) => {

  const {icon,color,size,onPress} =props; 
  return (
    <Pressable onPress={onPress} style={({pressed})=>pressed && styles.pressed}>
 
      <View style={styles.buttonContainer}>
    <Ionicons name={icon} color={color} size={size}/>
      </View>
    </Pressable>
  );
};

export default IconButton;

const styles = StyleSheet.create({
    buttonContainer:{
borderRadius:24,
padding:6,
marginHorizontal:8,
marginVertical:2,
    },


    pressed:{
       opacity:0.75,
    },
});
