import Cookies from 'js-cookie';

export function setToken(token: string) {
	Cookies.set('token', token, { expires: 7 }); // token will expire in 7 days
}

export function getToken() {
	return Cookies.get('token');
}

export function removeToken() {
	Cookies.remove('token');
}

export function isUserAuthenticated() {
	return !!getToken();
}
