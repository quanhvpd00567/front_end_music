export enum HTTPStatusCode {
    Unauthorized = 401,
    Ok = 200,
    bad_request = 400
}

export enum ApiErrorCode {
    ModelStateError = 'E_001',
    Failed = 'E_000'
}

export enum Messages {
    E000 = 'Lỗi server',
    E001 = 'Quá hạn đăng nhập',
    E002 = 'Quá hạn đăng nhập',
    E003 = 'Quá hạn đăng nhập',
    E004 = 'Link get không đúng',
    E005 = 'Url này không hỗ trợ get link',
    E006 = 'Không hỗ trợ get link free',
    E007 = 'Bạn chưa đăng nhập',
    E009 = 'Số coin của bạn không đủ',
    E0010 = 'link get không được rỗng',
}