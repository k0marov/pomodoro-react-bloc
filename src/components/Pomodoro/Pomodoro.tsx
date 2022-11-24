import { State } from "../../domain/state/PomodoroBloc";

interface Props {
    state: State,
}
function Pomodoro({state} : Props) {
    return (
        <div>
            <p>{state.type}</p>
            <p>{state.secondsLeft}</p>
        </div>
    );
}

export default Pomodoro; 