import moment from "moment";

class ApiResponse<TData> {
  public readonly code: number;
  public readonly message: string;
  public readonly respondedAt: string;
  public readonly data?: TData;

  private constructor(code: number, message: string, data?: TData) {
    this.code = code;
    this.message = message;
    this.data = data;
    this.respondedAt = moment().format();
  }

  public static success<TData>(data?: TData): ApiResponse<TData> {
    return new ApiResponse(200, "Success", data);
  }

  public static error<TData>(
    code: number = 500,
    message: string = "Internal error."
  ): ApiResponse<TData> {
    return new ApiResponse(code, message);
  }
}

export { ApiResponse };
