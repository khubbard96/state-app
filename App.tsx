import 'react-native-gesture-handler';
import React, { useEffect } from "react";
import {
    NativeBaseProvider,
    extendTheme,
} from "native-base";
import { useWorkout, Workout } from "./store/useWorkouts";
import 'react-native-get-random-values';
import AppTabView from "./components/TabView";
import { v4 as uuidv4 } from 'uuid';


// Define the config
const config = {
    useSystemColorMode: false,
    initialColorMode: "dark",
};

// extend the theme
export const theme = extendTheme(
    { 
        config,
        components: {
            Text: {
                
            }
        },

    }
);


export default function App() {
    const setWorkout = useWorkout(state => state.setWorkout);

    //TODO: default workout. remove once persistence is added.
    useEffect(() => {
        /*setWorkout({
            id: uuidv4(),
            name: "new workout from a routine " + new Date().getTime(),
            isInProgress: true
        } as Workout);*/
        setWorkout("");
    }, [])

    return (
        <NativeBaseProvider theme={theme}>
            <AppTabView></AppTabView>
        </NativeBaseProvider>
    )
}


/*
        <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Settings" component={SettingsScreen} />
        </Tab.Navigator>
      </NavigationContainer>


      */

// Color Switch Component
/*function ToggleDarkMode() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <HStack space={2} alignItems="center">
      <Text>Dark</Text>
      <Switch
        isChecked={colorMode === "light" ? true : false}
        onToggle={toggleColorMode}
        aria-label={
          colorMode === "light" ? "switch to dark mode" : "switch to light mode"
        }
      />
      <Text>Light</Text>
    </HStack>
  );
}*/
