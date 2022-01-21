import { useNavigation } from "@react-navigation/native";
import { Button, Column, Heading, Center, AlertDialog, Text, Row } from "native-base";
import React, { useState } from "react";
import { useWorkout, useWorkouts, Workout } from "../../../store/useWorkouts";
import { v4 as uuidv4 } from 'uuid';



const WorkoutStartView: React.FC = () => {
    const routines = ["Chest", "Back/Bis", "Shoulders/Tris", "Lower"];
    const navigation = useNavigation();
    const { setWorkout, workoutId } = useWorkout();
    const { addWorkout, updateWorkout } = useWorkouts();
    const workout: Workout | null = useWorkouts().getWorkout(workoutId);

    const [isAlertOpen, setIsAlertOpen] = useState(false)
    const onClose = () => setIsAlertOpen(false)
    const cancelRef = React.useRef(null)
    const [startingRoutine, setStartingRoutine] = useState<Workout | null>(null);

    const navigateToWorkoutScreen = (workoutId: string) => {
        setWorkout(workoutId);
        //@ts-expect-error
        navigation.navigate("workout");
    }

    const createWorkoutFromRoutine = (routine: Workout): string => {
        let id: string = uuidv4();
        addWorkout({
            id,
            name: "new workout from a routine " + new Date().getTime(),
            isInProgress: true
        } as Workout)
        return id;
        /*setWorkout({
            id: uuidv4(),
            name: "new workout from a routine " + new Date().getTime(),
            isInProgress: true
        } as Workout);*/
    }

    const createEmptyWorkout = (): string => {
        let id: string = uuidv4();
        addWorkout({
            id,
            name: "new workout from scratch " + new Date().getTime(),
            isInProgress: true
        } as Workout);
        return id;
        /*setWorkout({
            id: uuidv4(),
            name: "new workout from scratch " + new Date().getTime(),
            isInProgress: true
        } as Workout);*/
    }

    const startNewWorkout = (routine?: Workout) => {
        if(workout) {
            if(routine) {
                setStartingRoutine(routine);
            }
            setIsAlertOpen(true);
        } else {
            let id = "";
            if(routine) {
                id = createWorkoutFromRoutine(routine)
            } else {
                id = createEmptyWorkout();
            }
            console.log("new workout created: ", id)
            navigateToWorkoutScreen(id);
        }
    }

    const endCurrentWorkout = () => {
        if(workout) {
            let _workout: Workout = Object.assign({}, workout);
            _workout = {
                ..._workout,
                isInProgress: false
            }
            updateWorkout(_workout)
        }
    }

    const alertConfirmEndCurrentStartNew = () => {
        onClose();
        endCurrentWorkout();
        let id = "";
        if(startingRoutine) {
            id = createWorkoutFromRoutine(startingRoutine);
        } else {
            id = createEmptyWorkout();
        }
        navigateToWorkoutScreen(id);
    }

    return (
        <Column space={9}>
            {
                (() => {
                    if (workoutId) {
                        return (
                            <Row space={1}>
                                <Text w={{base: "50%"}}>Workout <Text>{workout?.name}</Text> in progress</Text>
                                <Button onPress={() => navigateToWorkoutScreen(workoutId)}><Text>Go to workout</Text></Button>
                            </Row>
                        )
                    }
                })()
            }

            <Heading textAlign={"center"}>Start workout</Heading>
            <Button size={"lg"} onPress={() => { startNewWorkout() }}>
                Empty workout
            </Button>
            <Heading textAlign={"center"}>Routines</Heading>
            <Column space={5}>
                {
                    routines.map((val: string) => {
                        //TODO: populate buttons with routine data to pass on press.
                        return <Button size={"lg"} onPress={() => { startNewWorkout({} as Workout) }}>{val}</Button>
                    })
                }
            </Column>

            <AlertDialog
                leastDestructiveRef={cancelRef}
                isOpen={isAlertOpen}
                onClose={onClose}
            >
                <AlertDialog.Content>
                    <AlertDialog.CloseButton />
                    <AlertDialog.Header>Workout in progress</AlertDialog.Header>
                    <AlertDialog.Body>
                        There is a workout in progress. End current workout and start new?
                    </AlertDialog.Body>
                    <AlertDialog.Footer>
                        <Button.Group space={2}>
                            <Button
                                variant="unstyled"
                                colorScheme="coolGray"
                                onPress={onClose}
                                ref={cancelRef}
                            >
                                Cancel
                            </Button>
                            <Button onPress={alertConfirmEndCurrentStartNew}>
                                Continue
                            </Button>
                        </Button.Group>
                    </AlertDialog.Footer>
                </AlertDialog.Content>
            </AlertDialog>

        </Column>

    )
}

export default WorkoutStartView;