import React from "react";
import { Text, View, ImageBackground, TouchableOpacity } from "react-native";
import Ionicon from "@expo/vector-icons/Ionicons";
import storage from "../helpers/Storage";
import { useNavigation } from "@react-navigation/native";
export default function ImageBackgroundComp({styles, onID, src}){
    const navigation = useNavigation()
    return (
    <View style={styles.imageContainer}>
        <ImageBackground
          style={styles.image}
          resizeMode="cover"
          source={src ? src : require("../../assets/pic1.jpg")}
        >
          <TouchableOpacity style = {{position:"absolute", top:10, right: 10}} onPress={async()=>{
            await storage.removeData(onID)
            navigation.navigate("Recipes")
           }}>
              <Ionicon name="trash" color="white" size={24}></Ionicon>
          </TouchableOpacity>
        
          <View style={styles.textOnImage}>
            <Text style={styles.imageText}>------</Text>
          </View>
        </ImageBackground>
      </View>
    )
}