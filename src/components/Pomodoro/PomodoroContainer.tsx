import { useEffect, useState } from "react";
import { State, Type, workDurationSec } from "../../domain/state/PomodoroBloc";
import Pomodoro from "./Pomodoro";

function PomodoroContainer() {
    const [state, setState] = useState(new State(Type.work, workDurationSec));
    useEffect(() => {
        const intervalId = setTimeout(() => {
            setState(new State(state.type, state.secondsLeft-1));
        }, 1000);
        return () => clearInterval(intervalId);
    }, [state]);
    return <Pomodoro state={state}/>
}

export default PomodoroContainer; 