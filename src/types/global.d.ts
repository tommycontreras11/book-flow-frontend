/* eslint-disable unused-imports/no-unused-vars */
declare global {
	interface IResponse<T> {
		data: T;
        message?:string
	}

	interface IComment<T> {
		comments: T;
		totalComments: number;
	}
	
	interface ICommentResponse<T> {
		data: IComment<T>
		message?:string
	}

	interface IErrorResponse {
		message: string;
		title?: string;
	}

}

export {};
