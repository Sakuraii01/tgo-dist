import { BaseAxios } from "./base.axios";

export class RemoteA extends BaseAxios {
  constructor() {
    super({
      baseURL: import.meta.env.VITE_APP_API_V1 + "/api/v1",
    });
  }
}
