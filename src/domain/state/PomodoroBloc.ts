export enum Type {
    work, 
    rest, 
}

export const workDurationSec = 10;//25*60; 
export const restDurationSec = 5;//5*60; 

export class State {
    constructor(readonly type: Type, readonly secondsLeft: number) {}
}

class PomodoroBLoC {

}

export default PomodoroBLoC; 