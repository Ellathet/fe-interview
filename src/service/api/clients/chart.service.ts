import { AxiosInstance } from "axios";
import { QueryRequest } from "../../../types/charts";

export class ChartService {
  constructor(private api: AxiosInstance) {}

  public getChart(sliceId: number, body: QueryRequest) {
    return this.api.post(
      "/chart/data",
      body,
      {
        params: {
          form_data: { slice_id: sliceId },
        },
      }
    );
  }
}
