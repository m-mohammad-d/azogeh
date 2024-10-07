export interface OperationalError extends Error {
  statusCode: number;
  status: string;
  isOperational?: boolean;
}
