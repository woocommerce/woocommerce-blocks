let Headers = window.Headers || null;
Headers = Headers
	? new Headers()
	: { get: () => undefined, has: () => undefined };

export default Headers;
