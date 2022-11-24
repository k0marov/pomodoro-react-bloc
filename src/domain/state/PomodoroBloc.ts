export enum Type {
    work, 
    rest, 
    pause,
}

export const workDurationSec = 25*60; 

export class State {
    constructor(readonly type: Type, readonly secondsLeft: number) {}
}

class PomodoroBLoC {

}

export default PomodoroBLoC; 