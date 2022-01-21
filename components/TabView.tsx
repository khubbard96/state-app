import React from "react";
import {
    Text,
    Column,
    useTheme,
    Theme,
    View
} from "native-base";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen } from "./screens/HomeScreen";
import WorkoutScreenStack from "./navigators/WorkoutsStackNavigator";

const Tab = createBottomTabNavigator();

const bottomNavHeight = 80;

const Tabs: React.FC = () => {
    return (
        <Tab.Navigator
            screenOptions={
                {
                    tabBarShowLabel: false,
                    headerShown: false,
                    tabBarStyle: {
                        height: bottomNavHeight,
                        position: "relative"
                    }
                }
            }
        >
            <Tab.Screen name="start-workouts" component={WorkoutScreenStack} options={{
                tabBarIcon: ({ focused }) => (
                    <View><Text color={focused ? "white" : "gray.500"}>Workouts</Text></View>
                )
            }} />

            <Tab.Screen name="home" component={HomeScreen} options={{
                tabBarIcon: ({ focused }) => (
                    <View><Text color={focused ? "white" : "gray.500"}>Home</Text></View>
                )
            }} />

        </Tab.Navigator>
    )
}

const AppTabView: React.FC = ({ children }) => {
    const theme = useTheme();
    //@ts-ignore
    return (
        <Column h={{ base: "100%" }} _dark={{ bg: "blueGray.900" }} safeAreaTop >
            <NavigationContainer theme={theme as Theme}>
                <Tabs />
            </NavigationContainer>
        </Column>

    )

}



/*
            <KeyboardAvoidingView flex={1}
                keyboardVerticalOffset={bottomNavHeight}
                h={{
                    base: "400",
                    lg: "auto",
                }}
                w={{
                    base: "100%"
                }}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
            >

            </KeyboardAvoidingView>

                            <Box flex="1" h={{
                    base: isKeyboardOpen ? "260" : "0"
                }}><Text>asdf</Text></Box>
*/



export default AppTabView;