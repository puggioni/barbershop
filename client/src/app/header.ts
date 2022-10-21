const useHeaders = (token: string | undefined) => {
  let headers = {
    headers: {
      token: `Bearer ${token}`,
    },
  };
  return headers;
};

export default useHeaders;
