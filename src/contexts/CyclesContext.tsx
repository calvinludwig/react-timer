import { differenceInSeconds } from 'date-fns'
import { createContext, ReactNode, useEffect, useReducer, useState } from 'react'
import { AddNewCycleAction, FinishCycleAction, InterrupCycleAction } from '../reducers/cycles/actions'
import { Cycle, cyclesReducers } from '../reducers/cycles/reducer'


interface CreateCycleData {
    task: string
    minutesAmount: number
}

interface CyclesContextType {
    cycles: Cycle[]
    activeCycle: Cycle | undefined
    activeCycleId: string | null
    amountSecondsPassed: number
    markCurrentCycleAsFinished: () => void
    interruptCurrentCycle: () => void
    setSecondsPassed: (seconds: number) => void
    createNewCycle: (data: CreateCycleData) => void
}

export const CyclesContext = createContext({} as CyclesContextType)

interface CyclesContextProviderProps {
    children: ReactNode
}

export function CyclesContextProvider({
    children,
}: CyclesContextProviderProps) {
    const stateLocalStoragePath = '@ignite-timer:cycles-state-0.0.1'
    const [cyclesState, dispatch] = useReducer(
        cyclesReducers, 
        {
            cycles: [],
            activeCycleId: null,
        }, 
        (initialState) => {
            const storedStateJson = localStorage.getItem(stateLocalStoragePath)
            if (storedStateJson !== null) {
                return JSON.parse(storedStateJson)
            }
            return initialState
        })
    
    const { cycles, activeCycleId } = cyclesState
    const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)
    const [amountSecondsPassed, setAmountSecondsPassed] = useState(() => {
        if (activeCycle) {
            return differenceInSeconds(
                new Date,
                new Date(activeCycle.startAt)
            )
        }
        return 0
    })
 
    useEffect(() => {
        const stateJson = JSON.stringify(cyclesState)
        localStorage.setItem(stateLocalStoragePath, stateJson)
    }, [cyclesState])

    function markCurrentCycleAsFinished() {
        dispatch(FinishCycleAction())
    }

    function setSecondsPassed(seconds: number) {
        setAmountSecondsPassed(seconds)
    }

    function createNewCycle(data: CreateCycleData) {
        const newCycle: Cycle = {
            id: String(new Date().getTime()),
            task: data.task,
            munitesAmount: data.minutesAmount,
            startAt: new Date(),
        }

        dispatch(AddNewCycleAction(newCycle))
        setAmountSecondsPassed(0)
    }

    function interruptCurrentCycle() {
        dispatch(InterrupCycleAction())
    }

    return (
        <CyclesContext.Provider
            value={{
                activeCycle,
                activeCycleId,
                markCurrentCycleAsFinished,
                amountSecondsPassed,
                setSecondsPassed,
                createNewCycle,
                interruptCurrentCycle,
                cycles,
            }}
        >
            {children}
        </CyclesContext.Provider>
    )
}
