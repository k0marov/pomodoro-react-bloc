import { useEffect, useState } from "react";
import { restDurationSec, State, Type, workDurationSec } from "../../domain/state/PomodoroBloc";
import Pomodoro from "./Pomodoro";

function PomodoroContainer() {
    const [occupation, setOccupation] = useState(Type.work); 
    const [secondsLeft, setSecondsLeft] = useState(workDurationSec); 
    useEffect(() => {
        if (!secondsLeft) {
            const newOccupation = occupation == Type.work ? Type.rest : Type.work;
            setOccupation(newOccupation);
            setSecondsLeft(newOccupation == Type.work ? workDurationSec : restDurationSec);
            return;
        }
        const intervalId = setTimeout(() => {
            setSecondsLeft(secondsLeft-1);
        }, 1000);
        return () => clearInterval(intervalId);
    }, [secondsLeft]);
    return <Pomodoro state={new State(occupation, secondsLeft)}/>
}

export default PomodoroContainer; 