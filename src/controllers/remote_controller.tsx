import Axios from "@/lib/axios";

export default class APIController {
  constructor() {
    const token = `SJWT mytoken`;
    APIController.headers = { ...APIController.headers, token: token };
  }

  static headers = { "x-api-key": "api_key", token: "" };
  static async get(url: string, token?: string) {
    try {
      const { data } = await Axios.get(url, {
        headers: { ...APIController.headers, Authorization: "Bearer " + token },
      });
      return data;
    } catch (e) {
      throw e;
    }
  }

  static async post(url: string, body: any) {
    try {
      const { data } = await Axios.post(url, body);
      return data;
    } catch (e) {
      throw e;
    }
  }
}
