const requestInterceptor = ({ getState, dispatch, getSourceAction }, req) => {
    const { auth } = getState();
    const { token } = auth; //현재 상태의 토큰을 넣어줌
    let { headers, url } = req;
  
    //bearer토큰 존재하면 atuhorization header를 교체
    if (token !== undefined && token !== null && url !== '/oauth/token') { //토큰이 없으면
      const { access_token } = token; //토큰 세팅
  
      if (access_token !== undefined && access_token !== null) { //접근할 수 있는 토큰이 있니?
        headers = { ...headers, 'Authorization': `Bearer ${access_token}` }; //있으면 접근할 수 있게 권한 주자
      }
    }
    return { ...req, headers };
  };
  
  const interceptors = {
    request: [
      requestInterceptor
    ]
  };
  
  export default interceptors;
  