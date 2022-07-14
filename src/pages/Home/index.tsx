import {Play} from 'phosphor-react';
import {CountdownContainer, FormContainer, HomeContainer, MinutesAmountInput, Separator, StartCountdownButton, TaskInput} from './style';

export function Home() {
	return (
		<HomeContainer>
			<form>
				<FormContainer>
					<label htmlFor='task'>Vou trabalhar em</label>
					<TaskInput
						id='task'
						type='text'
						placeholder='Dê um nome para o seu projeto'
						list='task-suggestion'
					/>
					<datalist id='task-suggestion'>
						<option value='banana 1'/>
						<option value='banana 2'/>
						<option value='banana 3'/>
					</datalist>
					<label htmlFor='minutesAmount'>durante</label>
					<MinutesAmountInput
						type='number'
						id='minutesAmount'
						placeholder='00'
						step={5}
						min={5}
						max={60}
					/>
					<span>minutos.</span>
				</FormContainer>
				<CountdownContainer>
					<span>0</span>
					<span>0</span>
					<Separator>:</Separator>
					<span>0</span>
					<span>0</span>
				</CountdownContainer>
				<StartCountdownButton
					type='submit'>
					<Play size={24}/>
					Start
				</StartCountdownButton>
			</form>
		</HomeContainer>
	);
}
