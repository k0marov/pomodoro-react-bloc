import React from 'react';
import PomodoroBloc, { LoadedState, PomodoroActivity, PomodoroState } from "../../../domain/state/PomodoroBloc";
import { AsyncSnapshot } from "../../utils/BlocBuilderFactory";
import "./Pomodoro.css";
import { PomodoroBuilder } from "./PomodoroContainer";

function Pomodoro({}) {
    const builder = (bloc: PomodoroBloc, snapshot: AsyncSnapshot<PomodoroState>) => {
        if (snapshot.data == null) {
            if (snapshot.error != null) {
                return <p>{snapshot.error.message}</p>;
            } 
            return <p>Loading...</p>;
        }
        const state = snapshot.data!;
        const className = state.isPaused ? "paused" :  state.activity == PomodoroActivity.work ? "work" : "rest"; 
        return (

            <div onClick={bloc.pausePressed} className={className} id="pomodoro">
                <p>{state.secondsLeft}</p>
                <p>{state.iterations} Iterations</p>
            </div>
        );
    }

    return <PomodoroBuilder builder={builder} />
}

export default Pomodoro; 