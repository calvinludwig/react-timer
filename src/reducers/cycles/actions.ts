import { Cycle } from './reducer'

export enum ActionType {
    AddNewCycle,
    InterruptCycle,
    FinishCycle,
}


export function AddNewCycleAction(newCycle: Cycle) {
    return {
        type: ActionType.AddNewCycle,
        payload: {
            newCycle
        }
    }
}

export function FinishCycleAction() {
    return {
        type: ActionType.FinishCycle,
    }
}

export function InterrupCycleAction() {
    return {
        type: ActionType.InterruptCycle,
    }
}
