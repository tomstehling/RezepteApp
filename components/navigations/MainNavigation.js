import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import AddRecipeOverview from "../pages/AddRecipeOverview";
import AddRecipeEditMode from "../pages/AddRecipeEditMode";
import TabNavigation from  "./TabNavigation";
import RecipePage from "../pages/RecipePage";
import Recipe from "../models/Recipe";
import storage from "../helpers/Storage";
import colors from "../constants/colors";
import { TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";


export default function MainNavigation ()
{
  const [tempRecipe, setTempRecipe] = useState({link:""})
  const [dataSet, setDataSet] = useState([]);
  const Stack = createNativeStackNavigator();


  useEffect(() => {
    const createTestData = async ()=>
    {
      await storage.createData([new Recipe(2,'Food','Beef',
      [
        {amount:'3',ingredient:'beef'},
        {amount:'3',ingredient:'Salt'}
      ]
      ,['Just Put that salt on da beef'],'a beefy recipe',"3hrs","3port"),
      new Recipe(1,'Brick','Yerkeys',
      [
        {amount:'2',ingredient:'beef'},
        {amount:'3',ingredient:'Salt'}
      ]
      ,['Just Put that salt on da beef'],'a beefuy recipe',"3hrs","3port"),
      new Recipe(3,'Brick','Yerkeasdys',
      [
        {amount:'2',ingredient:'beasdef'},
        {amount:'3',ingredient:'Saasdlt'}
      ]
      ,['Just Put thatasd salt on da beef'],'a beefuy recipe',"3hrs","3port")])

      //Sets the Data to test
      const ROFLLMAO = await storage.getData();
      setDataSet(ROFLLMAO);

    }
    createTestData();
  }, []);

  const navigation = useNavigation();
  const BackButton = () =>{
    return(
    <TouchableOpacity 
      style={{marginRight: 10}}
      onPress={()=>{navigation.navigate("TabScreen")}}
    >
      <Ionicons name="arrow-back-outline" size={24}/>
    </TouchableOpacity>
    )
  }

  return(

      <Stack.Navigator initialRouteName='EditPages' screenOptions={{headerLeft: BackButton}}>

          <Stack.Screen name = "TabScreen" options={{headerShown : false}}>
            {(props) => <TabNavigation {...props} dataSet={dataSet}/> }
          </Stack.Screen>

          <Stack.Screen name="AddRecipeOverview" options={{ headerStyle:{backgroundColor: colors.primary}, title: "Neues Rezept"}}>
            {(props) => <AddRecipeOverview {...props} setTempRecipe={ setTempRecipe } />}
          </Stack.Screen>

          <Stack.Screen name="AddRecipeEditMode" options={{ headerStyle:{backgroundColor: colors.primary}, headerShown: false}}>
            {(props) => <AddRecipeEditMode {...props} tempRecipe={tempRecipe} setTempRecipe = {setTempRecipe} />}
          </Stack.Screen>

          <Stack.Screen name="RecipePage" options={{ headerStyle:{backgroundColor: colors.primary}, title:"Rezept"}}>
            {(props) => <RecipePage {...props}/>}
          </Stack.Screen>
      </Stack.Navigator>)
}