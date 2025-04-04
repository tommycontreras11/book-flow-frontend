import { getCookie } from '@/lib/auth.lib';
import axios, {
	AxiosError,
	AxiosHeaders,
	AxiosInstance,
	AxiosRequestConfig,
	HeadersDefaults,
	RawAxiosRequestHeaders
} from 'axios';

class Base {
	private readonly axios: AxiosInstance;

	constructor(
		api: string,
		config?: AxiosRequestConfig,
		headers?: RawAxiosRequestHeaders | AxiosHeaders | Partial<HeadersDefaults>
	) {
		this.axios = axios.create({
			baseURL: api,
			withCredentials: false,
			...(config || {}),
			headers
		});

		this.axios.interceptors.request.use(
		  async (config) => {
			const jwt = await getCookie(); 
			if (jwt) {
			  config.headers.Authorization = jwt; 
			}
			return config;
		  },
		  (error) => {
			return Promise.reject(error);
		  }
		);
		
	}

	private params(params: Record<string, any>): string {
		return Object.keys(params)
			.map((key) => {
				let value = params[key];
				value = typeof value == typeof {} ? JSON.stringify(value) : value;
				return `${key}=${value}`;
			})
			.join('&');
	}

	private getMessage(error: AxiosError<any>): string {
		const response = error.response;

		const conditionError = response && response.data && response.data.error;
		const conditionWithMessage = response && response.data && response.data.message;

		if (conditionWithMessage) return response.data.message;
		if (conditionError) return response.data.error.message;

		return `${error.message}`;
	}

	protected async get<T extends unknown, P extends Object>(
		url: string,
		params: P = {} as P,
		config: AxiosRequestConfig = {}
	): Promise<T> {
		const _isParam = Object.keys(params).length > 0;

		return new Promise((resolve, reject) => {
			this.axios
				.get<T>(`${url}${_isParam ? `?${this.params(params)}` : ''}`, {
					...config,
					headers: {
						...config.headers
					}
				})
				.then((res) => {
					return resolve(res.data);
				})
				.catch((error: AxiosError<any>) => {
					const message = this.getMessage(error);
					const { status } = error?.response || {};
					return reject({ message, status });
				});
		});
	}

	protected post<T extends unknown, D extends object, P extends object>(
		url: string,
		data: D = {} as D,
		params: P = {} as P,
		config: AxiosRequestConfig = {}
	): Promise<T> {
		const _isParam = Object.keys(params).length > 0;

		return new Promise((resolve, reject) => {
			this.axios
				.post<T>(`${url}${_isParam ? `?${this.params(params)}` : ''}`, data, {
					...config,
					headers: {
						...config.headers
					}
				})
				.then((res) => resolve(res.data))
				.catch((error: AxiosError<any>) => {
					const message = this.getMessage(error);
					const { data, status } = error?.response || {};
					const _data = data?.error || data || {};
					return reject({ message, ..._data, status });
				});
		});
	}

	protected patch<T extends unknown, D extends object>(
		url: string,
		data: D = {} as D,
		config: AxiosRequestConfig = {}
	): Promise<any> {
		return new Promise((resolve, reject) => {
			this.axios
				.patch<T>(url, data, {
					...config,
					headers: {
						...config.headers
					}
				})
				.then((res) => resolve(res.data))
				.catch((error: AxiosError<any>) => {
					const message = this.getMessage(error);
					const { status } = error?.response || {};
					return reject({ message, status });
				});
		});
	}

	protected delete<T extends unknown>(url: string, config: AxiosRequestConfig = {}, data: object = {}): Promise<any> {

	    const token = localStorage.getItem('token')

	    return new Promise((resolve, reject) => {
	        this.axios
	            .delete<T>(url, {
	                ...config,
	                withCredentials: true,
	                data,
	                headers: {
	                    ...config.headers,
	                    token,
	                }
	            })
	            .then((res) => resolve(res.data))
	            .catch((error: AxiosError<any>) => {
	                const message = this.getMessage(error)
	                const { status } = error?.response || {}
	                return reject({ message, status })
	            })
	    })
	}

	protected cancelToken = axios.CancelToken.source();

	protected cancelRequest(message: string) {
		this.cancelToken.cancel(message);
	}
}

export default Base;
