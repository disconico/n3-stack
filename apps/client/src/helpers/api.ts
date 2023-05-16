import axios from 'axios';
import { getToken } from './auth';

const instance = axios.create();

instance.interceptors.request.use((config) => {
	const token = getToken();
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

export async function login(username: string, password: string) {
	const response = await instance.post('/server/auth/login', {
		username,
		password,
	});
	return response.data;
}

export async function logout() {
	const response = await instance.post('/server/auth/logout');
	return response.data;
}

export async function getUser() {
	const response = await instance.get('/server/users/profile');
	console.log(response.data);
	return response.data;
}
