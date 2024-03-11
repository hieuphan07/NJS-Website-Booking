import { redirect } from 'react-router-dom';

export async function action({ request }) {
	const pathname = new URL(request.url).pathname;
	const mode = pathname === '/signup' ? 'signup' : 'login';

	const data = await request.formData();

	const enteredFirstName = data.get('firstName');
	const enteredLastName = data.get('lastName');
	const enteredEmail = data.get('email');
	const enteredPhoneNumber = data.get('phoneNumber');
	const enteredUsername = data.get('username');
	const enteredPassword = data.get('password');
	const enteredIsAdmin = false;

	const enteredUser =
		mode === 'signup'
			? {
					fullName: enteredFirstName + ' ' + enteredLastName,
					email: enteredEmail,
					phoneNumber: enteredPhoneNumber,
					username: enteredUsername,
					password: enteredPassword,
					isAdmin: enteredIsAdmin,
			  }
			: { email: enteredEmail, password: enteredPassword };

	const response = await fetch('http://localhost:5500/' + mode, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(enteredUser),
	});
	if (response.status === 422) {
		return response;
	}
	if (!response.ok) {
		console.log('Something went wrong!');
	}

	const resData = await response.json();
	const { token, user } = resData;

	localStorage.setItem('token', token);
	localStorage.setItem('loginedUser', user.email);
	localStorage.setItem('expiration', user.exp);

	return redirect(mode === 'signup' ? '/login' : '/');
}
