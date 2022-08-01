import { ActionType } from './actions'
import { produce } from 'immer'

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
        return produce(state, draft => {
            draft.cycles.push(action.payload.newCycle)
            draft.activeCycleId = action.payload.newCycle.id
        })
    case ActionType.InterruptCycle: {
        const currentCycleIndex = state.cycles.findIndex(cycle => cycle.id === state.activeCycleId)
        if (currentCycleIndex < 0) {
            return state
        }
        return produce(state, draft => {
            draft.cycles[currentCycleIndex].stoppedAt = new Date
            draft.activeCycleId = null
        })
    }
    case ActionType.FinishCycle: {
        const currentCycleIndex = state.cycles.findIndex(cycle => cycle.id === state.activeCycleId)
        if (currentCycleIndex < 0) {
            return state
        }
        return produce(state, draft => {
            draft.cycles[currentCycleIndex].finishedAt = new Date
            draft.activeCycleId = null
        })
    }
    default:
        return state
    }
}
