import Fetch from "@/lib/axios";

export default class APIController {
  constructor() {
    const token = `SJWT mytoken`;
    APIController.headers = { ...APIController.headers, token: token };
  }

  static headers = { "x-api-key": "api_key", token: "" };
  static async get(url: string, token?: string) {
    try {
      const res = await Fetch.request({
        method: "get",
        url: url,
        headers: { ...APIController.headers, Authorization: "Bearer " + token },
      });
      return res;
    } catch (e) {
      throw e;
    }
  }

  static async post(url: string, body: any, token?: string) {
    try {
      const res = await Fetch.request({
        method: "post",
        url: url,
        body: body,
        headers: { ...APIController.headers, Authorization: "Bearer " + token },
      });

      return res;
    } catch (e) {
      throw e;
    }
  }
}
