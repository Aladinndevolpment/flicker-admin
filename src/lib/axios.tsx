import rnAxios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

export class Axios {
  static abortControllers = new AbortController();
  static axiosInstance = rnAxios.create({
    headers: {},
    timeout: 2 * 10000,
    signal: Axios.abortControllers.signal,
  });

  static requestInterceptor = async (config: any) => {
    try {
      console.debug(
        "============================REQUEST============================"
      );
      console.debug("Request Interceptors: ", {
        method: config.method,
        url: config.url,
        headers: config.headers,
      });

      // TODO: Add performance metrics.

      //   const httpMetric = perf().newHttpMetric(
      //     config.url,
      //     config.method.toUpperCase()
      //   );
      //   config.metadata = { httpMetric };

      //   await httpMetric.start();
    } finally {
      return config;
    }
  };

  static responseSuccessInterceptor = async (
    response: AxiosResponse | any
  ): Promise<AxiosResponse> => {
    try {
      console.debug("Response Interceptor:", response.status);
      console.debug(
        "============================REQUEST END============================"
      );

      const { httpMetric } = response.config.metadata;
      // console.log(httpMetric);

      // add any extra metric attributes if needed
      // httpMetric.putAttribute('userId', '12345678');

      httpMetric.setHttpResponseCode(response.status);
      httpMetric.setResponseContentType(response.headers["content-type"]);
      await httpMetric.stop();

      // Handle response metrics if needed
    } finally {
      return response;
    }
  };

  static responseErrorInterceptor = async (
    error: AxiosError | any
  ): Promise<never> => {
    try {
      if (error?.code == "ECONNABORTED") {
        console.debug("Request timeout", error?.code);
        Axios.requestTimeoutHandler();
      }

      const { httpMetric } = error.config.metadata;

      // add any extra metric attributes if needed
      // httpMetric.putAttribute('userId', '12345678');

      httpMetric.setHttpResponseCode(error.response?.status);
      httpMetric.setResponseContentType(
        error.response?.headers["content-type"]
      );
      await httpMetric.stop();

      // Handle error metrics if needed
    } finally {
      // console.log(error);
      //   crashlytics().recordError(error);
      return Promise.reject(error);
    }
  };

  static requestTimeoutHandler = () => {
    // TODO: implement alert
    alert("Request Timeout");
  };

  static cancelRequest() {
    Axios.abortControllers.abort();
  }

  static getInstance() {
    Axios.axiosInstance.interceptors.request.use(Axios.requestInterceptor);
    Axios.axiosInstance.interceptors.response.use(
      Axios.responseSuccessInterceptor,
      Axios.responseErrorInterceptor
    );

    return Axios.axiosInstance;
  }
}

export default Axios.getInstance();
