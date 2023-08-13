import React from "react";
import { Dimensions } from "react-native";
import { Text, View, } from "react-native";
import { FlatList } from "react-native";

export default function Steps({text}){
    return (
    <View style={{height: Dimensions.get("window" ).height / 2}}>
        {/*<Text style={{fontSize: 20, fontWeight:"bold",marginBottom: 10}}>Zubereitung</Text>*/}
        <FlatList data = {text}
            renderItem={({item}) => { return <Text style={{fontSize:16, fontWeight:600}}>{item}</Text>}}
        />
    </View>
    )
}