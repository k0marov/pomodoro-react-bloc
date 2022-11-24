import { State, Type } from "../../domain/state/PomodoroBloc";
import "./Pomodoro.css";

interface Props {
    state: State,
}
function Pomodoro({state} : Props) {
    return (
        <div className={state.type == Type.work ? "work" : "rest"} id="pomodoro">
            <p>{state.secondsLeft}</p>
        </div>
    );
}

export default Pomodoro; 