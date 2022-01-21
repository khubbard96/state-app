import { Column, Heading, Text } from "native-base";
import React from "react";
import { useWorkouts, Workout } from "../../../store/useWorkouts";

const HomeView: React.FC = () => {

    const workouts: {[key: string]: Workout} = useWorkouts().workouts;

    return(
        <Column>
            <Heading>Hi Kevin</Heading>
            <Text>Completed workouts</Text>
            {
                Object.entries(workouts).map((val: [string, Workout])=>{
                    if(!val[1].isInProgress) {
                        return (
                            <Text>{val[1].name}</Text>
                        )
                    }
                })
            }
        </Column>
    );
}

export default HomeView;