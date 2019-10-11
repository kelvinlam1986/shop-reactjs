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
      let json = response.json();
      // console.log("we are here 2", response.json());
      return json.then(Promise.reject.bind(Promise));
    }
  }
}

export default handleJSONResponse;
