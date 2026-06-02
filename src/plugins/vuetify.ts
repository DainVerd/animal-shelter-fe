/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com
 */

// Styles
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";

// Composables
import { createVuetify, type ThemeDefinition } from "vuetify";

// Точная палитра из твоего макета Figma
const shelterLightTheme: ThemeDefinition = {
  dark: false,
  colors: {
    
    background: "#FAF9F6", 
    surface: "#FFFFFF",  
    
    primary: "#009EE1",    
    secondary: "#EA7423",  
   
    "main-black": "#04080A", 
    "main-grey": "#4B4B4B",  
    "border-grey": "#CACACA", 

    error: "#FF5252",
    info: "#2196F3",
    success: "#4CAF50",
    warning: "#FB8C00",
  },
};

export default createVuetify({
  theme: {
    defaultTheme: "shelterLightTheme",
    themes: {
      shelterLightTheme,
    },
  },
});