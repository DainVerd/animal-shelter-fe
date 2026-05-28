export interface BaseResponse<T> {
    data: T | null;
    statusCode: number;
    isSuccess: boolean;
    errorMessages: string[];
}

export default BaseResponse;