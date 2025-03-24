import { useCallback, useEffect, useState } from "react";
import { StackedBarChart, SalesData } from "../../components/stacked-bar-chart";
import { LoaderCircle } from "lucide-react";
import { useApi } from "../../service/api/api";

export function Home() {
  const api = useApi();

  const [salesData, setSalesData] = useState<SalesData[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const getData = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await api.chart.getChart(175, {
        datasource: {
          id: 10,
          type: "table",
        },
        force: false,
        queries: [
          {
            filters: [
              {
                col: "order_date",
                op: "TEMPORAL_RANGE",
                val: "No filter",
              },
            ],
            extras: {
              time_grain_sqla: "P1M",
              having: "",
              where: "",
            },
            applied_time_extras: {},
            columns: [
              {
                timeGrain: "P1M",
                columnType: "BASE_AXIS",
                sqlExpression: "order_date",
                label: "order_date",
                expressionType: "SQL",
              },
              "city",
            ],
            metrics: [
              {
                aggregate: "SUM",
                column: {
                  advanced_data_type: null,
                  certification_details: null,
                  certified_by: null,
                  column_name: "sales",
                  description: null,
                  expression: null,
                  filterable: true,
                  groupby: true,
                  id: 444,
                  is_certified: false,
                  is_dttm: false,
                  python_date_format: null,
                  type: "DOUBLE PRECISION",
                  type_generic: 0,
                  verbose_name: null,
                  warning_markdown: null,
                },
                datasourceWarning: false,
                expressionType: "SIMPLE",
                hasCustomLabel: false,
                label: "SUM(sales)",
                optionName: "metric_1drwpth6gg7_6gd3ttl1u3",
                sqlExpression: null,
              },
            ],
            orderby: [
              [
                {
                  aggregate: "SUM",
                  column: {
                    advanced_data_type: null,
                    certification_details: null,
                    certified_by: null,
                    column_name: "sales",
                    description: null,
                    expression: null,
                    filterable: true,
                    groupby: true,
                    id: 444,
                    is_certified: false,
                    is_dttm: false,
                    python_date_format: null,
                    type: "DOUBLE PRECISION",
                    type_generic: 0,
                    verbose_name: null,
                    warning_markdown: null,
                  },
                  datasourceWarning: false,
                  expressionType: "SIMPLE",
                  hasCustomLabel: false,
                  label: "SUM(sales)",
                  optionName: "metric_1drwpth6gg7_6gd3ttl1u3",
                  sqlExpression: null,
                },
                false,
              ],
            ],
            annotation_layers: [],
            row_limit: 10000,
            series_columns: ["city"],
            series_limit: 0,
            order_desc: true,
            url_params: {
              permalink_key: "ayVJA43w4Qe",
              slice_id: "175",
            },
            custom_params: {},
            custom_form_data: {},
            time_offsets: [],
            post_processing: [
              {
                operation: "pivot",
                options: {
                  index: ["order_date"],
                  columns: ["city"],
                  aggregates: {
                    "SUM(sales)": {
                      operator: "mean",
                    },
                  },
                  drop_missing_columns: false,
                },
              },
              {
                operation: "rename",
                options: {
                  columns: {
                    "SUM(sales)": null,
                  },
                  level: 0,
                  inplace: true,
                },
              },
              {
                operation: "flatten",
              },
            ],
          },
        ],
        form_data: {
          datasource: "10__table",
          viz_type: "echarts_timeseries_bar",
          slice_id: 175,
          url_params: {
            permalink_key: "ayVJA43w4Qe",
            slice_id: "175",
          },
          x_axis: "order_date",
          time_grain_sqla: "P1M",
          x_axis_sort_asc: true,
          x_axis_sort_series: "name",
          x_axis_sort_series_ascending: true,
          metrics: [
            {
              aggregate: "SUM",
              column: {
                advanced_data_type: null,
                certification_details: null,
                certified_by: null,
                column_name: "sales",
                description: null,
                expression: null,
                filterable: true,
                groupby: true,
                id: 444,
                is_certified: false,
                is_dttm: false,
                python_date_format: null,
                type: "DOUBLE PRECISION",
                type_generic: 0,
                verbose_name: null,
                warning_markdown: null,
              },
              datasourceWarning: false,
              expressionType: "SIMPLE",
              hasCustomLabel: false,
              label: "SUM(sales)",
              optionName: "metric_1drwpth6gg7_6gd3ttl1u3",
              sqlExpression: null,
            },
          ],
          groupby: ["city"],
          adhoc_filters: [
            {
              clause: "WHERE",
              comparator: "No filter",
              datasourceWarning: false,
              expressionType: "SIMPLE",
              filterOptionName: "filter_262g4tpxm6c_720x9iqufnm",
              isExtra: false,
              isNew: false,
              operator: "TEMPORAL_RANGE",
              sqlExpression: null,
              subject: "order_date",
            },
          ],
          order_desc: true,
          row_limit: 10000,
          truncate_metric: true,
          show_empty_columns: true,
          comparison_type: "values",
          annotation_layers: [],
          forecastPeriods: 10,
          forecastInterval: 0.8,
          orientation: "vertical",
          x_axis_title_margin: 15,
          y_axis_title_margin: 15,
          y_axis_title_position: "Left",
          sort_series_type: "sum",
          color_scheme: "supersetColors",
          stack: "Stack",
          only_total: true,
          show_legend: true,
          legendType: "scroll",
          legendOrientation: "top",
          x_axis_time_format: "smart_date",
          y_axis_format: "SMART_NUMBER",
          truncateXAxis: true,
          y_axis_bounds: [null, null],
          rich_tooltip: true,
          tooltipTimeFormat: "smart_date",
          extra_form_data: {},
          force: false,
          result_format: "json",
          result_type: "full",
        },
        result_format: "json",
        result_type: "full",
      });
      setSalesData(data.result[0].data);
      setCities(data.result[0].colnames.slice(1));
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }, [api.chart]);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <div className="flex items-center justify-center min-h-[90vh]">
      {loading ? (
        <LoaderCircle className="rotate w-[2rem] h-[2rem]" />
      ) : (
        <StackedBarChart data={salesData} cities={cities} />
      )}
    </div>
  );
}
