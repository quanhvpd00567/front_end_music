interface Empty { }

export class ApiResponse<T extends Empty> {
    messageError: string;
    codeError: string;
    result: T;
}