const ApiResponse = (
  success: boolean,
  msg: string,
  stat: number,
  data?: unknown
) => {
  return Response.json(
    {
      success: success,
      message: msg,
      data: data,
    },
    {
      status: stat,
    }
  );
};

export default ApiResponse;
