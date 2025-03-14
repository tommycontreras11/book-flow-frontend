/* eslint-disable unused-imports/no-unused-vars */
declare global {
	interface IResponse<T> {
		data: T;
        message?:string
	}

	interface IErrorResponse {
		message: string;
		title?: string;
	}

}

export {};
