import React, { useState } from "react";
import { useEffect } from "react";
import { Text, View, TouchableOpacity, Button } from "react-native";
import storage from "../helpers/Storage";
import styles from '../styles/RecipePageStyles'
import ImageBackgroundComp from "../RecipePage/imageBackgroundComp";
import Iconbar from "../RecipePage/Iconbar";
import Category from "../RecipePage/Category";
import IngredientList from "../RecipePage/ingredientList/IngredientList";
import Steps from "../RecipePage/Steps";
import colors from "../constants/colors";
import { Dimensions } from "react-native";

export default function RecipePage(props){
    [data,setData] = useState([]);
    const [mode, setMode] = useState("ingredients");
    [onID, setOnID] = useState("3");

    const changeMode = (newMode) => {
      setMode(newMode);
    };

    useEffect(() => {
        const UpdateRecipe = async()=>
        {
          if(props != null){
            const data = await storage.getDataWithId(props.route.params.id);
            if(data != null){
              setData(data);
              setOnID(props.route.params.id);
              props.navigation.setOptions({
                title: data.title === '' ? 'No title' : data.title,
                headerRight: () => (
                  <Button style={{}} title="Edit" onPress={() =>  {props.navigation.navigate('AddRecipeEditMode', {editingRecipe : data})}}/>
                )
              });
            }
          }
        }
        
        UpdateRecipe()
    }, []);    
    return (
    <View style={{display:"flex"}}>
        <ImageBackgroundComp styles={styles} onID ={onID} />
        <View style={styles.textContainer}>
          <View style={styles.textRow}>
              <TouchableOpacity onPress={() => changeMode("ingredients")} style={{ backgroundColor: mode === "ingredients" ? colors.primary:colors.background, borderRadius:50, paddingHorizontal:15, paddingVertical: 5}}>
                <Text style={styles.textSize}>Zutaten</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => changeMode("steps")} style={{ backgroundColor: mode === "steps" ? colors.primary:colors.background, borderRadius:50, paddingHorizontal:15, paddingVertical: 5}}>
                <Text style={styles.textSize}>Zubereitung</Text>
              </TouchableOpacity>
          </View>


          {mode === "ingredients"?
          <View>
            <Iconbar portions={data.portions} time={data.time}/>
            <Category name = {data.categoryID}/>
            <View style={{backgroundColor:"black", height: 1, marginVertical:10 }}/>
            <IngredientList ingredients={data.ingredients}/>
          </View>
           :<Steps text={data.instructions}/>}
        </View>
    </View>)
}