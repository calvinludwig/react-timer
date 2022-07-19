import { createContext, ReactNode, useState } from 'react'

interface Cycle {
	id: string
	task: string
	munitesAmount: number
	startAt: Date
	stoppedAt?: Date
	finishedAt?: Date
}

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

interface  CyclesContextProviderProps {
	children: ReactNode
}

export function CyclesContextProvider ({children}: CyclesContextProviderProps) {
	const [cycles, setCycles] = useState<Cycle[]>([])
	const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
	const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

	const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

	function markCurrentCycleAsFinished() {
		setCycles((state) =>
			state.map((cycle) => {
				if (cycle.id === activeCycleId) {
					return { ...cycle, finishedAt: new Date() }
				}

				return cycle
			}),
		)
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

		setCycles((state) => [...state, newCycle])
		setActiveCycleId(newCycle.id)
		setAmountSecondsPassed(0)
	}

	function interruptCurrentCycle() {
		setCycles((state) =>
			state.map((cycle) => {
				if (cycle.id === activeCycleId) {
					return { ...cycle, stoppedAt: new Date() }
				}

				return cycle
			}),
		)
		setActiveCycleId(null)
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
				cycles
			}}
		>
			{children}
		</CyclesContext.Provider>
	)
}
