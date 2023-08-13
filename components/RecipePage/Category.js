import React from "react";
import { Text, View, ImageBackground, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import colors from "../constants/colors";

export default function Category({name}){
    return (
    <View style= {{display: "flex", flexDirection:"row", flexWrap: "wrap", }}>
        <Text style= {{fontSize:20,fontWeight:"bold", paddingVertical: 5, borderRadius:10, width: 150 }}>Kategorie</Text>
        <Text style= {{fontSize:20, backgroundColor: colors.primary, paddingHorizontal: 10, paddingVertical: 5, borderRadius:10 }}>{name}</Text>
    </View>
    )
}