import React from "react";
import {Button, Text, View, ImageBackground, TouchableOpacity, TextInput} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
export default function ImageBackgroundComp({styles, imageSRC, recipeTitle, setRecipeTitle}){
  

    return (
    <View>
        <ImageBackground
          resizeMode="cover"
          style={{height: 200}}
          source={{uri: imageSRC ? imageSRC : require("../../assets/pic1.jpg") }}>
          <View style={{position: 'absolute', bottom: 0, flexDirection: 'row', alignItems: 'center', width: "100%",backgroundColor: 'rgba(211,211,211, 0.5)', justifyContent: 'space-between'}}>
            <TextInput style={{fontSize: 20,marginLeft: 10, color: "black"}} placeholder="RezeptTitel" value={recipeTitle} onChangeText={(text) => setRecipeTitle(text)}/>
            <TouchableOpacity style={{marginRight: 10}} onPress={() => console.log("pressed")} >
              <Ionicons name="pencil-outline" size={20} color="black" />
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    )
}