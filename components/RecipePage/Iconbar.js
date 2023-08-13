import React from "react";
import { Text, View, TouchableOpacity} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function Iconbar({portions, time}){
    return (
    <View style= {{display:"flex", flexDirection:"row", flexWrap:'wrap', gap: 30, justifyContent: "center", marginBottom:20}}>
        <View style={{display:"flex", alignItems:"center"}}>
            <Ionicons name="people-outline" size={30} color="black" aria-label="3 port"/>
            <Text style={{fontSize:12}}>{portions}</Text>
        </View>
        <View style={{display:"flex", alignItems:"center"}}>
            <Ionicons name="time-outline" size={30} color="black" aria-label="40 min"/>
            <Text style={{fontSize:12}}>{time}</Text>
        </View>
        <TouchableOpacity onPress= {()=>{console.log("like")}}>
            <Ionicons name="heart-outline" size={30} color="black" />
        </TouchableOpacity>
    </View>
    )
}