interface DataSource {
  id: number;
  type: string;
}

interface Filter {
  col: string;
  op: string;
  val: string | string[];
}

interface Extras {
  time_grain_sqla: string;
  having: string;
  where: string;
}

interface Column {
  timeGrain?: string;
  columnType?: string;
  sqlExpression?: string;
  label?: string;
  expressionType?: string;
}

type Metric = {
  aggregate: string;
  column: {
    column_name: string;
    type: string;
    id: number;
    filterable: boolean;
    groupby: boolean;
    is_certified: boolean;
  };
  expressionType: string;
  hasCustomLabel: boolean;
  label: string;
  optionName: string;
  sqlExpression?: string;
};

interface OrderBy {
  0: Metric;
  1: boolean;
}

interface PostProcessing {
  operation: string;
  options?: any;
}

interface Query {
  filters: Filter[];
  extras: Extras;
  applied_time_extras: object;
  columns: (Column | string)[];
  metrics: Metric[];
  orderby: OrderBy[];
  annotation_layers: any[];
  row_limit: number;
  series_columns: string[];
  series_limit: number;
  order_desc: boolean;
  url_params: Record<string, string>;
  custom_params: object;
  custom_form_data: object;
  time_offsets: any[];
  post_processing: PostProcessing[];
}

interface FormData {
  datasource: string;
  viz_type: string;
  slice_id: number;
  url_params: Record<string, string>;
  x_axis: string;
  time_grain_sqla: string;
  x_axis_sort_asc: boolean;
  x_axis_sort_series: string;
  x_axis_sort_series_ascending: boolean;
  metrics: Metric[];
  groupby: string[];
  adhoc_filters: any[];
  order_desc: boolean;
  row_limit: number;
  truncate_metric: boolean;
  show_empty_columns: boolean;
  comparison_type: string;
  annotation_layers: any[];
  forecastPeriods: number;
  forecastInterval: number;
  orientation: string;
  x_axis_title_margin: number;
  y_axis_title_margin: number;
  y_axis_title_position: string;
  sort_series_type: string;
  color_scheme: string;
  stack: string;
  only_total: boolean;
  show_legend: boolean;
  legendType: string;
  legendOrientation: string;
  x_axis_time_format: string;
  y_axis_format: string;
  truncateXAxis: boolean;
  y_axis_bounds: (number | null)[];
  rich_tooltip: boolean;
  tooltipTimeFormat: string;
  extra_form_data: object;
  force: boolean;
  result_format: string;
  result_type: string;
}

export interface QueryRequest {
  datasource: DataSource;
  force: boolean;
  queries: Query[];
  form_data: FormData;
  result_format: string;
  result_type: string;
}
