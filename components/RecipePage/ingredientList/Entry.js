import React from "react";
import { Text, View} from "react-native";

export default function Entry({amount,unit , ingredient}){
    return (
    <View style ={{display: "flex", flexDirection:"row",}}>
        <Text style={{fontSize: 16,width: 50}}>{amount}</Text>
        <Text style={{fontSize: 16,width: 50}}>{unit}</Text>
        <Text style={{fontSize: 16,}}>{ingredient}</Text>
    </View>)
}