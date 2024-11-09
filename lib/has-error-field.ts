export function hasErrorField(err: unknown): err is { response: { data: { message: string } } } {
  return (
    typeof err === 'object' &&
    err !== null &&
    'response' in err &&
    typeof err.response === 'object' &&
    err.response !== null &&
    'data' in err.response &&
    typeof err.response.data === 'object' &&
    err.response.data !== null &&
    'message' in err.response.data &&
    typeof err.response.data.message === 'string'
  );
}
