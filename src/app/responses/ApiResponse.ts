interface Empty { }

export class ApiResponse<T extends Empty> {
    messageCode: string;
    errorCode: string;
    result: T;
}