import { ActionType } from './actions'

export interface Cycle {
    id: string
    task: string
    munitesAmount: number
    startAt: Date
    stoppedAt?: Date
    finishedAt?: Date
}

interface CyclesState {
    cycles: Cycle[],
    activeCycleId: string | null,
}

export function cyclesReducers(state: CyclesState, action: any) {
    switch(action.type) {
    case ActionType.AddNewCycle:
        return {
            ...state,
            cycles: [...state.cycles, action.payload.newCycle],
            activeCycleId: action.payload.newCycle.id,
        }
    case ActionType.InterruptCycle:
        return {
            ...state,
            cycles: state.cycles.map(cycle => {
                if (cycle.id === state.activeCycleId) {
                    return {...cycle, interruptCurrentCycle: new Date}
                } else {
                    return cycle
                }
            }),
            activeCycleId: null,
        }
    case ActionType.FinishCycle:
        return {
            ...state,
            cycles: state.cycles.map(cycle => {
                if (cycle.id === state.activeCycleId) {
                    return {...cycle, ffinishedDate: new Date}
                } else {
                    return cycle
                }
            }),
            activeCycleId: null,
        }
    default:
        return state
    }
}
