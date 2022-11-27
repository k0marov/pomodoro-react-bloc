import { asapScheduler, asyncScheduler, firstValueFrom, Observable, observeOn, Subject } from "rxjs";
import { reduceEachTrailingCommentRange } from "typescript";

export interface Bloc<State> {
    dispose(): void,
    get stream(): Observable<State>
    get state(): State;
}

export enum PomodoroActivity {
    work,
    rest,
}

export const workDurationSec = 10;//25*60; 
export const restDurationSec = 5;//5*60; 

export interface LoadedState {
    readonly activity: PomodoroActivity,
    readonly secondsLeft: number,
    readonly isPaused: boolean,
    readonly iterations: number,
}

export type PomodoroState = LoadedState | null;

const oneSecond = 1000;
class PomodoroBloc implements Bloc<PomodoroState> {
    private readonly _subject: Subject<PomodoroState>;
    private _timer: NodeJS.Timer;
    private _state: PomodoroState;

    constructor(initial: PomodoroState) {
        this._subject = new Subject();
        this._state = initial; 
        this._subject.next(initial);
        // TODO: think about whether this .bind() calls are really necessary 
        this._emit = this._emit.bind(this);
        this.dispose = this.dispose.bind(this);
        this._onTimerTick = this._onTimerTick.bind(this);
        this.pausePressed = this.pausePressed.bind(this);

        this._timer = setInterval(this._onTimerTick, oneSecond);
    }
    dispose() {
        this._subject.complete();
        clearInterval(this._timer);
    }

    _emit(newState: PomodoroState) {
        this._state = newState;
        this._subject.next(newState);
    }


    async _onTimerTick() {
        const current = this.state;
        if (current == null) {
            const startingState: PomodoroState = {
                isPaused: false, 
                activity: PomodoroActivity.work, 
                secondsLeft: workDurationSec, 
                iterations: 0, 
            };
            this._emit(startingState);
            return;
        }
        if (current.isPaused) return;
        if (!current.secondsLeft) {
            const newActivity = current.activity == PomodoroActivity.work ? PomodoroActivity.rest : PomodoroActivity.work;
            const secondsLeft = newActivity == PomodoroActivity.work ? workDurationSec : restDurationSec;
            const iterations = newActivity == PomodoroActivity.work ? current.iterations + 1 : current.iterations
            this._emit({
                ...current,
                activity: newActivity,
                secondsLeft: secondsLeft,
                iterations: iterations,
            });
            return;
        }
        this._emit({
            ...current,
            secondsLeft: current.secondsLeft - 1,
        });
    }
    async pausePressed() {
        const current = this.state;
        if (current == null) return; 
        this._emit({
            ...current,
            isPaused: !current.isPaused,
        });
    }

    get state() {
        return this._state;
    }
    get stream(): Observable<PomodoroState> {
        return this._subject;
    }


}

export default PomodoroBloc; 