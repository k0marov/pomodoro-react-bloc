export enum PomodoroActivity {
    work, 
    rest, 
}

export const workDurationSec = 10;//25*60; 
export const restDurationSec = 5;//5*60; 

export class PomodoroState {
    constructor(
        readonly type: PomodoroActivity, 
        readonly secondsLeft: number,
        readonly isPaused: boolean,
    ) {}
}

class PomodoroBLoC {

}

export default PomodoroBLoC; 