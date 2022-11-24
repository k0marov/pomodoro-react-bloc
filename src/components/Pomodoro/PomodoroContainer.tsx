import { useEffect, useState } from "react";
import { restDurationSec, PomodoroState, PomodoroActivity, workDurationSec } from "../../domain/state/PomodoroBloc";
import Pomodoro from "./Pomodoro";

function PomodoroContainer() {
    const [activity, setActivity] = useState(PomodoroActivity.work); 
    const [isPaused, setIsPaused] = useState(false);
    const [secondsLeft, setSecondsLeft] = useState(workDurationSec); 

    const handleClick = () => setIsPaused(!isPaused);

    useEffect(() => {
        if (isPaused) return; 
        if (!secondsLeft) {
            const newActivity = activity == PomodoroActivity.work ? PomodoroActivity.rest : PomodoroActivity.work;
            setActivity(newActivity);
            setSecondsLeft(newActivity == PomodoroActivity.work ? workDurationSec : restDurationSec);
            return;
        }
        const intervalId = setTimeout(() => {
            setSecondsLeft(secondsLeft-1);
        }, 1000);
        return () => clearInterval(intervalId);
    }, [secondsLeft, isPaused]);




    return <Pomodoro onClick={handleClick} state={new PomodoroState(activity, secondsLeft, isPaused)}/>
}

export default PomodoroContainer; 