import { IApiResponse } from '../interfaces/response/api-response';

export const ApiResponse = ({
  res,
  statusCode,
  message,
  data,
}: IApiResponse) => {
  res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};
