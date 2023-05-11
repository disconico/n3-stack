import { useEffect, useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { User } from 'shared';

function App() {
	const [greeting, setGreeting] = useState('');
	const [userName, setUsername] = useState('');

	useEffect(() => {
		fetch('/server')
			.then((res) => res.text())
			.then((data) => setGreeting(data));
	}, []);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		fetch('/server/users', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ username: userName }),
		})
			.then((res) => res.json())
			.then((data: User) => {
				console.log(data);
				setUsername('');
				setGreeting(data.username);
			});
	};

	return (
		<>
			<div>
				<a href='https://vitejs.dev' target='_blank'>
					<img src={viteLogo} className='logo' alt='Vite logo' />
				</a>
				<a href='https://react.dev' target='_blank'>
					<img src={reactLogo} className='logo react' alt='React logo' />
				</a>
			</div>
			<h1>{greeting}</h1>
			<div>
				<form onSubmit={handleSubmit}>
					<label htmlFor='username'>Username: </label>
					<input
						type='text'
						id='username'
						name='username'
						value={userName}
						onChange={(e) => setUsername(e.target.value)}
					/>
					<button type='submit'>submit</button>
				</form>
			</div>
		</>
	);
}

export default App;
