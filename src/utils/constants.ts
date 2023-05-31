export const development: boolean = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

export const APIHost = development ? `https://api-training.hrm.div4.pgtest.co/api/v1` : 'https://google.com';

export const APIUrl = development ? process.env.REACT_APP_API_URL : 'https://google.com';

export const ACCESS_TOKEN_KEY = 'token';
