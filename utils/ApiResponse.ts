const ApiResponse = (
  success: boolean,
  msg: string,
  stat: number,
  data?: any
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
