import { authService } from '@/services/auth';

export const customFetch = async (
    url: string = '',
    body: object = {},
    overrideOptions: RequestInit = {},
) => {
    const basicOptions: Partial<RequestInit> = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    };
    if (authService.isConnected()) {
        basicOptions.headers = {
            ...basicOptions.headers,
            'x-auth': authService.getUser(),
        };
    }
    if (Object.keys(body).length) overrideOptions.body = JSON.stringify(body);
    const request = await fetch(`http://localhost:3000/${url}`, {
        ...basicOptions,
        ...overrideOptions,
    });
    if (!request.ok) {
        throw new Error(`Response status: ${request.status}`);
    }
    if (request.headers.get('Content-Type')) {
        const response = await request.json();
        return response;
    }
    return true;
};
