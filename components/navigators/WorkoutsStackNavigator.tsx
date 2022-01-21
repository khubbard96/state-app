import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import { WorkoutStartScreen } from "../screens/WorkoutStartScreen";
import { WorkoutScreen } from "../screens/WorkoutScreen";

const Stack = createStackNavigator();

const WorkoutScreenStack: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName="start">
      <Stack.Screen name="start" component={WorkoutStartScreen} />
      <Stack.Screen name="workout" component={WorkoutScreen} />
    </Stack.Navigator>
  );
}

export default WorkoutScreenStack;