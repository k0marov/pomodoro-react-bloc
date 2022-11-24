import { useEffect, useState } from "react";
import { restDurationSec, State, Type, workDurationSec } from "../../domain/state/PomodoroBloc";
import Pomodoro from "./Pomodoro";

function PomodoroContainer() {
    const [activity, setActivity] = useState(Type.work); 
    const [secondsLeft, setSecondsLeft] = useState(workDurationSec); 
    useEffect(() => {
        if (!secondsLeft) {
            const newActivity = activity == Type.work ? Type.rest : Type.work;
            setActivity(newActivity);
            setSecondsLeft(newActivity == Type.work ? workDurationSec : restDurationSec);
            return;
        }
        const intervalId = setTimeout(() => {
            setSecondsLeft(secondsLeft-1);
        }, 1000);
        return () => clearInterval(intervalId);
    }, [secondsLeft]);
    return <Pomodoro state={new State(activity, secondsLeft)}/>
}

export default PomodoroContainer; 