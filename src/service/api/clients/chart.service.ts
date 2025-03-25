import { AxiosInstance } from 'axios';
import { QueryRequest } from '../../../types/charts';

export class ChartService {
  constructor(private api: AxiosInstance) {}

  public getChart(sliceId: number, body: QueryRequest) {
    return this.api.post('/chart/data', body, {
      params: {
        form_data: { slice_id: sliceId },
      },
    });
  }

  public getCities() {
    return this.api.get('/datasource/table/10/column/city/values');
  }

  public getCountries() {
    return this.api.get('/datasource/table/10/column/country/values');
  }
}
