import { ApiErrorCode } from './constant.enum';

export class AppError {
    public errorCode: string;
    public message: string
    public data: any;

    constructor(message: string, errorCode: string = ApiErrorCode.Failed, data: any = null) {
        this.errorCode = errorCode;
        this.message = message;
        this.data = data;
    }
}