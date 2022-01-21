import React from "react";
import WorkoutView from "../views/workout/WorkoutView";
import AppScreen from "../util/AppScreen";

export const WorkoutScreen: React.FC = () => {

    return (
        <AppScreen>
            <WorkoutView></WorkoutView>
        </AppScreen>
    );
}
