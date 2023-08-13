import React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeScreen from "../pages/HomeScreen";
import RecipesOverview from "../pages/RecipesOverview";
import CategoryScreen from "../pages/CategoryScreen";
import Ionicons from 'react-native-vector-icons/Ionicons';
import color from "../constants/colors";
import { Button } from "react-native-elements";

export default function TabNavigation({navigation, dataSet})
{
  const Tab = createBottomTabNavigator();


  function handleOnPress()
  {
      navigation.navigate("AddRecipeOverview")
  }
  
  return (
    <Tab.Navigator
        screenOptions={({ route }) => ({
          headerRight: ()=>{return <Button containerStyle={{marginRight : 10}} onPress={handleOnPress} type="clear" icon={<Ionicons name="ios-add" size={32} color={color.textPrimary}/>}/>},
          headerStyle: {
            backgroundColor: color.primary
          },
          tabBarShowLabel: false,
          tabBarStyle:{
          backgroundColor: color.primary,
            borderRadius: 100,
            marginHorizontal:20,
            marginBottom: 10,
          },
          tabBarActiveBackgroundColor: color.secondary,
          tabBarItemStyle:{
            borderRadius: 100
          },
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused
                ? 'home'
                : 'home-outline';
            } else if (route.name === 'Recipes') {
              iconName = focused ? 'ios-list' : 'ios-list-outline';
            }else if (route.name === 'Categorys') {
              iconName = focused ? 'bookmark' : 'bookmark-outline';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },

          tabBarActiveTintColor: color.textPrimary,
          tabBarInactiveTintColor: color.iconPrimary,
        })}
      >

      <Tab.Screen name = "Home" options={{title:"Heimat"}}>
        {(props) => <HomeScreen {...props} dataSet={dataSet}/>}
      </Tab.Screen>
      <Tab.Screen name = "Recipes" options={{title:"Rezepte"}}>
        {(props) => <RecipesOverview {...props} dataSet={dataSet}/>}
      </Tab.Screen>
      <Tab.Screen name = "Categorys" options={{title:"Kategorien"}}>
      {(props) => <CategoryScreen {...props} dataSet={dataSet}/>}
      </Tab.Screen>
      
    </Tab.Navigator>
  )
}