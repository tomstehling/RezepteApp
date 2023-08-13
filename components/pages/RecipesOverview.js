import React, { useEffect, useState } from "react";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Dimensions,
} from "react-native";

import Tile from "../recipesOverview/Tile";
import colors from "../constants/colors";
import { TextInput } from "react-native";
import { View } from "react-native";
import storage from "../helpers/Storage";

export default function RecipesOverview({navigation, route, dataSet}) {
  [recipe, setRecipe] = useState([]);

  //Temp Solution
  [fullRecipe, setFullRecipe] = useState([])

  const [searchTerm, setSearchTerm] = useState("")


  async function Update()
  {
   
    const data = await storage.getData();
    if(data != null){

      setFullRecipe(data);
      setRecipe(data);

    }

    if(route.params)
    {
      try{
        const tmpArray = new Array();
        setSearchTerm(route.params.categoryID)
        for(let item of fullRecipe)
        {
          if(item.categoryID === route.params.categoryID){
            tmpArray.push(item)
          }
        }
        setRecipe(tmpArray)
      }catch(e)
      {
        console.error(e)
      }
    }
    route.params = undefined
  }

  useEffect(()=>{
    const unsubscribe = navigation.addListener('focus', () => {
      Update();
    });
    return unsubscribe;
  },[navigation, route.params, dataSet])

  const gridFormat = (recipeArray, colums) => {
    if (recipeArray.length % 2 !== 0) {
      recipeArray.push({ ...recipeArray[0], invisible: true });
    }
    return recipeArray;
  };

  const handleSearch = (value)=>
  {
    if(value === "" || value === null)
    {
      setRecipe(fullRecipe)
    }

    else
    {
      const tmpArray = new Array();
      for(let item of fullRecipe)
      {
        if(item.title.includes(value)){
          tmpArray.push(item)
        }

        if(item.categoryID.includes(value)){
          tmpArray.push(item)
        }
      }
      setRecipe(tmpArray)
    }
  }

  return (
    <SafeAreaView>
      <View style={{marginVertical: 10, marginHorizontal: (Dimensions.get("window").width * 0.1) / 4}}>
        <TextInput
          style={{ fontSize: 16, height: 40, borderColor: colors.accent, borderWidth: 2, borderRadius:100,overflow: "scroll", textAlign:"center" }}
          placeholder="Search"
          onChangeText={(value)=>
          {
            handleSearch(value)
            setSearchTerm(value)
          }
          }
          value = {searchTerm}
        />
      </View>
      <FlatList
        data={recipe}
        horizontal={false}
        numColumns={2}
        renderItem={({ item }) => <Tile {...item} navigation={navigation}/>}
        keyExtractor={(item) => item.id}
        style={style.column}
        columnWrapperStyle={style.columnWrapperStyle}
      />
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  column: {
  },
  invisible: {
    backgroundColor: "transparent",
  },
  columnWrapperStyle: {
    marginVertical: (Dimensions.get("window").width * 0.1) / 4,
    justifyContent: "space-around",
    height: Dimensions.get("window").width / 2,
  },
});
