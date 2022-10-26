const useHeaders = (token: string | null) => {
  let headers = {
    // prettier-ignore
    headers: { 'token': token },
  };
  return headers;
};

export default useHeaders;
