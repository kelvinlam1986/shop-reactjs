function handleJSONResponse(response) {
  if (response.ok) {
    return response.json();
  } else {
    if (response.status === 401) {
      return Promise.reject(
        Object.assign(
          {},
          {
            errorCode: "401",
            errorMessage: "Phiên làm việc của bạn đã hết. Xin đăng nhập lại."
          }
        )
      );
    } else {
      return response.json();
    }
  }
}

export default handleJSONResponse;
