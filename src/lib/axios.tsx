interface Config {
  url: string;
  method: string;
  headers?: HeadersInit;
  body?: BodyInit | null;
  metadata?: any;
  signal?: AbortSignal;
}

interface HttpMetric {
  setHttpResponseCode: (code: number) => void;
  setResponseContentType: (contentType: string) => void;
  stop: () => Promise<void>;
}

class FetchAPI {
  static abortController = new AbortController();

  static async requestInterceptor(config: Config): Promise<Config> {
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
      // const httpMetric: HttpMetric = perf().newHttpMetric(config.url, config.method.toUpperCase());
      // config.metadata = { httpMetric };
      // await httpMetric.start();
    } finally {
      return config;
    }
  }

  static async responseSuccessInterceptor(
    response: Response,
    config: Config
  ): Promise<Response> {
    try {
      console.debug("Response Interceptor:", response.status);
      console.debug(
        "============================REQUEST END============================"
      );

      if (config.metadata && config.metadata.httpMetric) {
        const { httpMetric }: { httpMetric: HttpMetric } = config.metadata;
        httpMetric.setHttpResponseCode(response.status);
        httpMetric.setResponseContentType(
          response.headers.get("content-type") || ""
        );
        await httpMetric.stop();
      }

      // Handle response metrics if needed
    } finally {
      return response;
    }
  }

  static async responseErrorInterceptor(
    error: any,
    config: Config
  ): Promise<never> {
    try {
      if (error.name === "AbortError") {
        console.debug("Request timeout", error.name);
        FetchAPI.requestTimeoutHandler();
      }

      if (config.metadata && config.metadata.httpMetric) {
        const { httpMetric }: { httpMetric: HttpMetric } = config.metadata;
        httpMetric.setHttpResponseCode(error.status || 0);
        httpMetric.setResponseContentType(
          error.headers ? error.headers.get("content-type") || "" : ""
        );
        await httpMetric.stop();
      }

      // Handle error metrics if needed
    } finally {
      return Promise.reject(error);
    }
  }

  static requestTimeoutHandler() {
    // TODO: implement alert
    alert("Request Timeout");
  }

  static cancelRequest() {
    FetchAPI.abortController.abort();
  }

  static async request(config: Config) {
    const interceptedConfig = await FetchAPI.requestInterceptor(config);

    try {
      const response = await fetch(interceptedConfig.url, {
        method: interceptedConfig.method,
        headers: {
          ...interceptedConfig.headers,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(interceptedConfig.body),
        signal: FetchAPI.abortController.signal,
      });

      await FetchAPI.responseSuccessInterceptor(response, interceptedConfig);

      if (!response.ok) {
        const error: any = Error("Network response was not ok");
        error.status = response.status;
        error.headers = response.headers;
        // console.log(await response.text());
        try {
          error.details = await error.response.json();
        } catch (parseError) {
          error.details = { message: "Something went wrong." };
        }

        throw error;
      }
      const res = await response.json();

      return res;
    } catch (error) {
      await FetchAPI.responseErrorInterceptor(error, interceptedConfig);
    }
  }
}

export default FetchAPI;
