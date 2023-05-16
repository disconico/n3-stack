import { useEffect, useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { User } from 'shared';
import { login, logout, getUser } from './helpers/api';
import { setToken, removeToken, isUserAuthenticated } from './helpers/auth';

function Login() {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
		try {
			const data = await login(username, password);
			console.log(data);

			setToken(data.access_token);
		} catch (error) {
			console.error('Failed to login:', error);
		}
	};
	return (
		<form onSubmit={handleSubmit}>
			<input
				type='text'
				value={username}
				onChange={(e) => setUsername(e.target.value)}
			/>
			<input
				type='password'
				value={password}
				onChange={(e) => setPassword(e.target.value)}
			/>
			<button type='submit'>Login</button>
		</form>
	);
}

function Logout() {
	const handleLogout = async () => {
		try {
			await logout();
			removeToken();
		} catch (error) {
			console.error('Failed to logout:', error);
		}
	};

	return <button onClick={handleLogout}>Logout</button>;
}

function App() {
	const [isAuthenticated, setIsAuthenticated] = useState(isUserAuthenticated());
	const [greeting, setGreeting] = useState('');
	const [userName, setUsername] = useState('');

	useEffect(() => {
		setIsAuthenticated(isUserAuthenticated());
	}, []);

	useEffect(() => {
		fetch('/server')
			.then((res) => res.text())
			.then((data) => setGreeting(data));
	}, []);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		try {
			const response = await fetch('/server/users', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ username: userName }),
			});

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const data: User = await response.json();
			console.log(data);
			setUsername('');
			setGreeting(data.username);
		} catch (error) {
			console.error('An error occurred:', error);
		}
	};

	return (
		<>
			{isAuthenticated ? <Logout /> : <Login />}
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
			<div>
				<button onClick={getUser}>Click</button>
			</div>
		</>
	);
}

export default App;
