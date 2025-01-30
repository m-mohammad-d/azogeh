export interface ErrorResponse {
  status: number;
  data: {
    status: string;
    message: string;
  };
}
