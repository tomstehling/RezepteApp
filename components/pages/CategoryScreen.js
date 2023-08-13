import React, {useEffect, useState} from "react";
import { Text } from "react-native";
import { Dimensions } from "react-native";
import { TouchableOpacity } from "react-native";
import { FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import storage from "../helpers/Storage";
import colors from "../constants/colors";

export default function CategoryScreen({navigation, dataSet}){
  [category, setCategory] = useState([]);

  async function Update()
  {
    const data = await storage.getData();

    if(data != null){
      const unique = [];
      for (const item of data) {
        const isDuplicate = unique.find((obj) => obj.categoryID === item.categoryID);
        if (!isDuplicate) {
          unique.push(item);
        }
      }
      setCategory(unique)
    }
  }

  useEffect(()=>{
    const unsubscribe = navigation.addListener('focus', () => {
      Update();
    });
    return unsubscribe;
  },[navigation, dataSet])

  function CategoryTile({name}) {
    return (
    <TouchableOpacity onPress={()=>{navigation.navigate("Recipes",{categoryID: name})}} >
      <Text style={{fontSize:17, fontWeight: 600, backgroundColor:colors.accent, borderRadius: 50, paddingHorizontal: 15, paddingVertical : 5}}>
          {name}
      </Text>
    </TouchableOpacity>)
  }

  return (
      <SafeAreaView>
        <FlatList 
          numColumns={3}
          data = {category}
          renderItem={({item}) => <CategoryTile name = {item.categoryID}/>}
          columnWrapperStyle={{
            justifyContent: "space-between",
            margin: (Dimensions.get("window").width * 0.3) / 4
          }}
        />
      </SafeAreaView>
  )
} 