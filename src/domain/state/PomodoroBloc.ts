import { start } from "repl";
import { asapScheduler, asyncScheduler, firstValueFrom, Observable, observeOn, Subject } from "rxjs";
import { Bloc } from "../../delivery/utils/bloc/Bloc";

export enum PomodoroActivity {
    work,
    rest,
}

export const workDurationSec = 10;//25*60; 
export const restDurationSec = 5;//5*60; 

export interface PomodoroState {
    readonly activity: PomodoroActivity,
    readonly secondsLeft: number,
    readonly isPaused: boolean,
    readonly iterations: number,
}

const oneSecond = 1000;
class PomodoroBloc extends Bloc<PomodoroState> {
    private _timer: NodeJS.Timer;

    constructor() {
        const startingState: PomodoroState = {
            isPaused: false, 
            activity: PomodoroActivity.work, 
            secondsLeft: workDurationSec, 
            iterations: 0, 
        };
        super(startingState);
        // TODO: think about whether this .bind() calls are really necessary 
        this._onTimerTick = this._onTimerTick.bind(this);
        this.pausePressed = this.pausePressed.bind(this);
        this._timer = setInterval(this._onTimerTick, oneSecond);
    }
    dispose() {
        super.dispose();
        clearInterval(this._timer);
    }

    private async _onTimerTick() {
        const current = this.state;
        if (current.isPaused) return;
        if (!current.secondsLeft) {
            return this._onActivitySwitched();
        }
        this.emit({
            ...current,
            secondsLeft: current.secondsLeft - 1,
        });
    }

    private async _onActivitySwitched() {
        const current = this.state;
        const newActivity = current.activity == PomodoroActivity.work ? PomodoroActivity.rest : PomodoroActivity.work;
        const secondsLeft = newActivity == PomodoroActivity.work ? workDurationSec : restDurationSec;
        const iterations = newActivity == PomodoroActivity.work ? current.iterations + 1 : current.iterations
        this.emit({
            ...current,
            activity: newActivity,
            secondsLeft: secondsLeft,
            iterations: iterations,
        });
        return;
    }

    async pausePressed() {
        this.emit({
            ...this.state,
            isPaused: !this.state.isPaused,
        });
    }

}

export default PomodoroBloc; 