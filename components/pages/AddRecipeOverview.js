import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

import * as cheerio from "cheerio";
import colors from "../constants/colors";
import { TouchableOpacity } from "react-native";
import storage from "../helpers/Storage";
import Recipe from "../models/Recipe";

export default function AddRecipeOverview({ navigation, setTempRecipe }) {
  const [link, setLink] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [chefkochID, setChefkochID] = useState();

  const saveChefkochToData = async (recipeJSON) => {
    const allRecipes = await storage.getData();
    const newID = storage.generateIDFromData(allRecipes);
    await storage.addData(
      new Recipe(
        newID,
        recipeJSON.category,
        recipeJSON.title,
        recipeJSON.ingredients,
        recipeJSON.instructions,
        recipeJSON.description,
        recipeJSON.portionSize,
        recipeJSON.time,
        recipeJSON.image
      )
    );
    navigation.navigate("RecipePage", { id: newID });
  };
  const handleChefkoch = () => {
    getChefkochData(link, setIsLoading).then((recipeJSON) => {
      saveChefkochToData(recipeJSON);
    });
  };

  const handleNewRecipe = () => {
    navigation.navigate("AddRecipeEditMode");
  };

  return (
    <View style={{ marginHorizontal: 20 }}>
      <Text style={{ marginTop: 10, fontSize: 14, fontWeight: 400 }}>
        {" "}
        Chefkoch Gericht:{" "}
      </Text>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss}>
        <View>
          <TextInput
            style={{
              height: 40,
              borderColor: colors.accent,
              borderWidth: 2,
              borderRadius: 5,
              overflow: "scroll",
              textAlign: "center",
            }}
            placeholder="Chefkoch Link"
            onChangeText={(text) => setLink(text)}
            value={link}
          />
        </View>
      </TouchableWithoutFeedback>

      <TouchableOpacity
        style={{
          backgroundColor: colors.primary,
          padding: 5,
          borderRadius: 5,
          marginTop: 10,
        }}
        onPress={handleChefkoch}
      >
        <Text style={{ textAlign: "center" }}>Import</Text>
      </TouchableOpacity>

      <View
        style={{
          display: "flex",
          marginVertical: 20,
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <View style={{ backgroundColor: "gray", width: 150, height: 1 }} />
        <Text
          style={{ width: 50, textAlign: "center", marginHorizontal: "auto" }}
        >
          {" "}
          oder{" "}
        </Text>
        <View style={{ backgroundColor: "gray", width: 150, height: 1 }} />
      </View>

      <TouchableOpacity
        style={{ backgroundColor: colors.primary, padding: 5, borderRadius: 5 }}
        onPress={handleNewRecipe}
      >
        <Text style={{ textAlign: "center" }}>eigenes Gericht</Text>
      </TouchableOpacity>
    </View>
  );
}

function getChefkochData(link, setIsLoading) {
  return new Promise(async (resolve, reject) => {
    try {
      const searchURL = link;
      setIsLoading(true);
      const response = await fetch(searchURL);
      const htmlString = await response.text();
      const $ = cheerio.load(htmlString);

      let recipeTitle = "";
      let recipeImage = "";
      let zutatenHeadline = "";
      let portionSize = "";
      let description = "";
      let time = "";
      let category = "";
      let recipeIngredients = [];
      let recipeInstructions = [];

      let extractedAmount = "";
      let unit = "";

      const mainJQuery = $("main");
      recipeTitle = mainJQuery
        .find(
          "article.ds-box.ds-grid-float.ds-col-12.ds-col-m-8.recipe-header > div > h1"
        )
        .text();

      mainJQuery.find("#i-amp-0 > img").each((i, el) => {
        recipeImage = $(el).attr("src");
      });

      zutatenHeadline = mainJQuery
        .find(
          "main > article.ds-box.ds-grid-float.ds-col-12.ds-col-m-8.recipe-ingredients.ds-or-1 > h2 "
        )
        .text();
      portionSize = mainJQuery
        .find(
          "main > article.ds-box.ds-grid-float.ds-col-12.ds-col-m-8.recipe-ingredients.ds-or-1 > div.recipe-servings.ds-box > form > input"
        )
        .val();

      //descriptionText
      let descriptionText = $("p.recipe-text");
      description = descriptionText
        .text()
        .trim()
        .replace(/\s{2,}/g, " ");

      let categoryText = $("a.ds-tag");
      let categoryArray = categoryText
        .text()
        .trim()
        .replace(/\s{2,}/g, " ")
        .split(" ");
      category = categoryArray[0];
      //time
      let timeText = $("span.recipe-preptime");
      time = timeText
        .text()
        .trim()
        .replace(/\s{2,}/g, " ")
        .replace("", "")
        .trim();

      //ingredients
      // Tabelle mit den Zutaten auswählen und jede Zeile durchgehen
      $("table.ingredients tr").each((i, el) => {
        let amount = $(el).find("td.td-left span").text().trim();
        let ingredient = $(el).find("td.td-right span").text().trim();

        // Extrahiere Menge und Einheit
        let regex = /^([\d.½]+)\s?([a-zA-ZäöüÄÖÜß]+)/;
        amount = amount.replace(/\s+/g, " ").trim();
        let match = amount.match(regex);
        if (match) {
          extractedAmount = match[1] || "";
          unit = match[2] || "";
        } else {
          extractedAmount = amount || "";
          unit = "";
        }
        // Füge das extrahierte Element dem Array ingredients hinzu
        recipeIngredients.push({ amount: extractedAmount, unit, ingredient });
      });

      //Zubereitung
      mainJQuery
        .find(
          "article.ds-box.ds-grid-float.ds-col-12.ds-col-m-8.ds-or-3 > div:nth-child(3)"
        )
        .each((i, el) => {
          recipeInstructions.push($(el).text().trim());
        });
      setIsLoading(false);
      recipeJSON = {
        title: recipeTitle,
        image: recipeImage,
        description: description,
        portionSize: portionSize,
        time: time,
        category: category,
        ingredients: recipeIngredients,
        instructions: recipeInstructions,
      };
      resolve(recipeJSON);
    } catch (error) {
      console.log(error);
    }
  });
}
