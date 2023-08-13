import React from "react";
import { View, Image, Text, StyleSheet, TouchableOpacity } from "react-native";
import { images } from "../constants/images";
import colors from "../constants/colors";

export default function Tile({ id,title, description, invisible, navigation, isCategory }) {  
  const onPressHandler = () => {
    navigation.navigate('RecipePage', {id:id});
  };

  const onPressHandlerCategory = () => {
    navigation.navigate('Recipes', {isCategory: isCategory, categoryID : id})
  };

  if (!invisible) {
    return (
      <TouchableOpacity onPress={isCategory? onPressHandlerCategory : onPressHandler}>
        <View style={styles.container}>

          <Image source={images[Math.floor(Math.random() * 3)+1]} style={styles.image} />
          <View style={styles.textbox}>
            <Text style={styles.description}>{isCategory ? description : title}</Text>
          </View>

        </View>
      </TouchableOpacity>
    );
  } else return <View style={[styles.container, styles.invisible]} />;
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "flex-end",
    backgroundColor: colors.primary,
    borderRadius: 15,
    flexDirection: "column",
    aspectRatio: 0.9,
  },
  image: {
    height: "70%",
    width: "90%",
    borderRadius: 5,
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: "black",
  },
  placeholder: {
    backgroundColor: "white",
    aspectRatio: 1,
    width: "90%",
  },
  textbox: {
    height: "20%",
  },
  invisible: {
    backgroundColor: "transparent",
  },
});
