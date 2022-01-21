import create from "zustand";
import { combine } from "zustand/middleware";

export declare type ExerciseType = "benchpress" | "hammercurl" | "cablerow"

export declare type ExerciseSet = Identifiable & {
    prevWeight: number
    prevReps: number
    currWeight: number
    currReps: number
    isDone: boolean
}

export declare type Identifiable = {
    id: string
}

export declare type Exercise = Identifiable & {
    type: any //TODO
    setData: { [key: string]: ExerciseSet }
}

export declare type Workout = Identifiable & {
    name: string
    exercises: { [key: string]: Exercise }
    startTime: number
    isInProgress: boolean
}

declare type WorkoutCollection = {
    workouts: { [key: string]: Workout }
}

export const useWorkouts = create(
    combine(
        {
            workouts: {} as { [key: string]: Workout }
        },
        (set, get) => ({
            setWorkouts: (workouts: { [key: string]: Workout }) => set((s) => ({ workouts: workouts })),
            addWorkout: (_w: Workout) => set((s) => {
                return {
                    workouts: {
                        ...s.workouts,
                        [_w.id]: _w
                    }
                }
            }),
            getWorkout: (id?: string): Workout | null => {
                if (id) {
                    return get().workouts[id]
                }
                return null;
            },
            updateWorkout: (_w: Workout) => set((s) => {
                let _workout = Object.assign({}, _w);
                return {
                    workouts: {
                        ...s.workouts,
                        [_w.id]: _workout
                    }
                }
            }),
            deleteWorkout: (id: string): boolean => {
                delete get().workouts[id];
                return !get().workouts[id];
            }
        })
    )
);

export const useWorkout = create(
    combine(
        {
            workoutId: "",
        },
        (set) => ({
            setWorkout: (w: string) => set((s) => ({ workoutId: w })),
            /*endWorkout: () => set((s) => {
                if (s.workout) {
                    let _workout = Object.assign({}, s.workout)
                    return {
                        workout: {
                            ..._workout,
                            isInProgress: false
                        }
                    }
                }
                return {
                    workout: s.workout
                }
            }),
            addExercise: (_e: Exercise) => set((s) => {
                let _workout = Object.assign({}, s.workout);
                _workout.exercises = {
                    ...s.workout?.exercises,
                    [_e.id]: _e
                }
                return {
                    workout: _workout
                }
            }),
            updateExercise: (_e: Exercise) => set((s) => {
                let _workout = Object.assign({}, s.workout);
                _workout.exercises = {
                    ...s.workout?.exercises,
                    [_e.id]: _e
                }
                return {
                    workout: _workout
                }
            })*/
        })
    )
);

