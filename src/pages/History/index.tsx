import { formatDistanceToNow } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { useContext } from 'react'
import { CyclesContext } from '../../contexts/CyclesContext'
import { HistoryContainer, HistoryList, Status } from './styles'

export function History() {

	const {cycles} = useContext(CyclesContext)

	return (
		<HistoryContainer>
			<h1>Meu histórico</h1>
			<HistoryList>
				<table>
					<thead>
						<tr>
							<th>Tarefa</th>
							<th>Duração</th>
							<th>Início</th>
							<th>Status</th>
						</tr>
					</thead>
					<tbody>{cycles.map(cycle => {
						return (
							<tr key={cycle.id}>
								<td>{cycle.task}</td>
								<td>{cycle.munitesAmount} minutos</td>
								<td>{formatDistanceToNow(cycle.startAt, {
									addSuffix: true,
									locale: ptBR
								})}</td>
								<td>
									{ cycle.finishedAt && (<Status statusColor="green">Concluído</Status>)}
									{ cycle.stoppedAt && (<Status statusColor="red">Interrompido</Status>)}
									{ (!cycle.finishedAt && !cycle.stoppedAt) && (<Status statusColor="yellow">Em andamento</Status>)}
								</td>
							</tr>
						)
					})}
					</tbody>
				</table>
			</HistoryList>
		</HistoryContainer>
	)
}
