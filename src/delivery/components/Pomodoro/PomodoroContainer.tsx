import React from "react";
import PomodoroBloc, { restDurationSec, LoadedState, PomodoroActivity, workDurationSec, Bloc, PomodoroState } from "../../../domain/state/PomodoroBloc";
import "../../utils/BlocBuilderFactory";
import BlocBuilder from "../../utils/BlocBuilderFactory";
import BlocComponentsFactory from "../../utils/BlocComponentsFactory";
import Pomodoro from "./Pomodoro";


export const { Provider: PomodoroProvider, Builder: PomodoroBuilder } = BlocComponentsFactory<PomodoroState, PomodoroBloc>();

function PomodoroContainer() {
    return <PomodoroProvider create={() => new PomodoroBloc(null)}>
        <Pomodoro />
    </PomodoroProvider>;
}

export default PomodoroContainer; 