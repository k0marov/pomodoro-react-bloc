import { PomodoroState, PomodoroActivity } from "../../domain/state/PomodoroBloc";
import "./Pomodoro.css";

interface Props {
    state: PomodoroState,
    onClick: () => void, 
}
function Pomodoro({state, onClick} : Props) {
    const className = state.isPaused ? "paused" :  state.type == PomodoroActivity.work ? "work" : "rest"; 
    console.log(className);
    return (

        <div onClick={onClick} className={className} id="pomodoro">
            <p>{state.secondsLeft}</p>
        </div>
    );
}

export default Pomodoro; 