import { useCallback, useEffect, useState } from 'react';
import { Filter, LoaderCircle } from 'lucide-react';
import { useApi } from '../../service/api/api';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '../../components/ui/sheet';
import { Button } from '../../components/ui/button';
import { DateTime } from 'luxon';
import { Separator } from '../../components/ui/separator';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '../../components/ui/popover';
import { Command, CommandItem } from '../../components/ui/command';
import { SalesBarChart, SalesData } from '../../components/sales-bar-chart';
import { OrdersBarChart } from '../../components/orders-bar-chart';

const COLORS = [
  '#1f77b4',
  '#ff7f0e',
  '#2ca02c',
  '#d62728',
  '#9467bd',
  '#8c564b',
  '#e377c2',
  '#7f7f7f',
  '#bcbd22',
  '#17becf',
  '#aec7e8',
  '#ffbb78',
  '#98df8a',
  '#ff9896',
  '#c5b0d5',
  '#c49c94',
  '#f7b6d2',
  '#c7c7c7',
  '#dbdb8d',
  '#9edae5',
];

export function Home() {
  const api = useApi();

  const [salesData, setSalesData] = useState<SalesData[]>([]);
  const [orderData, setOrdersData] = useState<SalesData[]>([]);
  const [salesCities, setSalesCities] = useState<string[]>([]);
  const [ordersCities, setOrdersCities] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const [countriesOptions, setCountriesOptions] = useState<string[]>([]);
  const [citiesOptions, setCitiesOptions] = useState<string[]>([]);

  const startYear = 2003;
  const endYear = 2005;

  const years = Array.from({ length: endYear - startYear + 1 }, (_, i) =>
    DateTime.fromObject({ year: startYear + i }),
  ).reverse();

  const [temporalRange, setTemporalRange] = useState<DateTime[]>([
    years[0].startOf('year'),
    years[0].endOf('year'),
  ]);

  const [citiesFilter, setCitiesFilter] = useState<string[]>([]);
  const [countriesFilter, setCountriesFilter] = useState<string[]>([]);

  const getData = useCallback(async () => {
    setLoading(true);
    try {
      const { data: salesResponse } = await api.chart.getChart(175, {
        datasource: {
          id: 10,
          type: 'table',
        },
        force: false,
        queries: [
          {
            filters: [
              {
                col: 'order_date',
                op: 'TEMPORAL_RANGE',
                val: `${temporalRange[0].toISODate()} : ${temporalRange[1].toISODate()}`,
              },
              ...(countriesFilter.length > 0
                ? [
                    {
                      col: 'country',
                      op: 'IN',
                      val: countriesFilter,
                    },
                  ]
                : []),

              ...(citiesFilter.length > 0
                ? [
                    {
                      col: 'city',
                      op: 'IN',
                      val: citiesFilter,
                    },
                  ]
                : []),
            ],
            extras: {
              time_grain_sqla: 'P1M',
              having: '',
              where: '',
            },
            applied_time_extras: {},
            columns: [
              {
                timeGrain: 'P1M',
                columnType: 'BASE_AXIS',
                sqlExpression: 'order_date',
                label: 'order_date',
                expressionType: 'SQL',
              },
              'city',
            ],
            metrics: [
              {
                aggregate: 'SUM',
                column: {
                  advanced_data_type: null,
                  certification_details: null,
                  certified_by: null,
                  column_name: 'sales',
                  description: null,
                  expression: null,
                  filterable: true,
                  groupby: true,
                  id: 444,
                  is_certified: false,
                  is_dttm: false,
                  python_date_format: null,
                  type: 'DOUBLE PRECISION',
                  type_generic: 0,
                  verbose_name: null,
                  warning_markdown: null,
                },
                datasourceWarning: false,
                expressionType: 'SIMPLE',
                hasCustomLabel: false,
                label: 'SUM(sales)',
                optionName: 'metric_1drwpth6gg7_6gd3ttl1u3',
                sqlExpression: null,
              },
            ],
            orderby: [
              [
                {
                  aggregate: 'SUM',
                  column: {
                    advanced_data_type: null,
                    certification_details: null,
                    certified_by: null,
                    column_name: 'sales',
                    description: null,
                    expression: null,
                    filterable: true,
                    groupby: true,
                    id: 444,
                    is_certified: false,
                    is_dttm: false,
                    python_date_format: null,
                    type: 'DOUBLE PRECISION',
                    type_generic: 0,
                    verbose_name: null,
                    warning_markdown: null,
                  },
                  datasourceWarning: false,
                  expressionType: 'SIMPLE',
                  hasCustomLabel: false,
                  label: 'SUM(sales)',
                  optionName: 'metric_1drwpth6gg7_6gd3ttl1u3',
                  sqlExpression: null,
                },
                false,
              ],
            ],
            annotation_layers: [],
            row_limit: 10000,
            series_columns: ['city'],
            series_limit: 0,
            order_desc: true,
            url_params: {
              permalink_key: 'ayVJA43w4Qe',
              slice_id: '175',
            },
            custom_params: {},
            custom_form_data: {},
            time_offsets: [],
            post_processing: [
              {
                operation: 'pivot',
                options: {
                  index: ['order_date'],
                  columns: ['city'],
                  aggregates: {
                    'SUM(sales)': {
                      operator: 'mean',
                    },
                  },
                  drop_missing_columns: false,
                },
              },
              {
                operation: 'rename',
                options: {
                  columns: {
                    'SUM(sales)': null,
                  },
                  level: 0,
                  inplace: true,
                },
              },
              {
                operation: 'flatten',
              },
            ],
          },
        ],
        form_data: {
          datasource: '10__table',
          viz_type: 'echarts_timeseries_bar',
          slice_id: 175,
          url_params: {
            permalink_key: 'ayVJA43w4Qe',
            slice_id: '175',
          },
          x_axis: 'order_date',
          time_grain_sqla: 'P1M',
          x_axis_sort_asc: true,
          x_axis_sort_series: 'name',
          x_axis_sort_series_ascending: true,
          metrics: [
            {
              aggregate: 'SUM',
              column: {
                advanced_data_type: null,
                certification_details: null,
                certified_by: null,
                column_name: 'sales',
                description: null,
                expression: null,
                filterable: true,
                groupby: true,
                id: 444,
                is_certified: false,
                is_dttm: false,
                python_date_format: null,
                type: 'DOUBLE PRECISION',
                type_generic: 0,
                verbose_name: null,
                warning_markdown: null,
              },
              datasourceWarning: false,
              expressionType: 'SIMPLE',
              hasCustomLabel: false,
              label: 'SUM(sales)',
              optionName: 'metric_1drwpth6gg7_6gd3ttl1u3',
              sqlExpression: null,
            },
          ],
          groupby: ['city'],
          adhoc_filters: [
            {
              clause: 'WHERE',
              comparator: 'No filter',
              datasourceWarning: false,
              expressionType: 'SIMPLE',
              filterOptionName: 'filter_262g4tpxm6c_720x9iqufnm',
              isExtra: false,
              isNew: false,
              operator: 'TEMPORAL_RANGE',
              sqlExpression: null,
              subject: 'order_date',
            },
          ],
          order_desc: true,
          row_limit: 10000,
          truncate_metric: true,
          show_empty_columns: true,
          comparison_type: 'values',
          annotation_layers: [],
          forecastPeriods: 10,
          forecastInterval: 0.8,
          orientation: 'vertical',
          x_axis_title_margin: 15,
          y_axis_title_margin: 15,
          y_axis_title_position: 'Left',
          sort_series_type: 'sum',
          color_scheme: 'supersetColors',
          stack: 'Stack',
          only_total: true,
          show_legend: true,
          legendType: 'scroll',
          legendOrientation: 'top',
          x_axis_time_format: 'smart_date',
          y_axis_format: 'SMART_NUMBER',
          truncateXAxis: true,
          y_axis_bounds: [null, null],
          rich_tooltip: true,
          tooltipTimeFormat: 'smart_date',
          extra_form_data: {},
          force: false,
          result_format: 'json',
          result_type: 'full',
        },
        result_format: 'json',
        result_type: 'full',
      });
      setSalesData(salesResponse.result[0].data);
      setSalesCities(salesResponse.result[0].colnames.slice(1));

      const { data: orderResponse } = await api.chart.getChart(136, {
        datasource: {
          id: 10,
          type: 'table',
        },
        force: false,
        queries: [
          {
            filters: [
              {
                col: 'order_date',
                op: 'TEMPORAL_RANGE',
                val: `${temporalRange[0].toISODate()} : ${temporalRange[1].toISODate()}`,
              },
              ...(countriesFilter.length > 0
                ? [
                    {
                      col: 'country',
                      op: 'IN',
                      val: countriesFilter,
                    },
                  ]
                : []),

              ...(citiesFilter.length > 0
                ? [
                    {
                      col: 'city',
                      op: 'IN',
                      val: citiesFilter,
                    },
                  ]
                : []),
            ],
            extras: {
              time_grain_sqla: 'P1M',
              having: '',
              where: '',
            },
            applied_time_extras: {},
            columns: [
              {
                timeGrain: 'P1M',
                columnType: 'BASE_AXIS',
                sqlExpression: 'order_date',
                label: 'order_date',
                expressionType: 'SQL',
              },
              'country',
            ],
            metrics: [
              {
                aggregate: 'COUNT',
                column: {
                  advanced_data_type: null,
                  certification_details: null,
                  certified_by: null,
                  column_name: 'sales',
                  description: null,
                  expression: null,
                  filterable: true,
                  groupby: true,
                  id: 444,
                  is_certified: false,
                  is_dttm: false,
                  python_date_format: null,
                  type: 'DOUBLE PRECISION',
                  type_generic: 0,
                  verbose_name: null,
                  warning_markdown: null,
                },
                datasourceWarning: false,
                expressionType: 'SIMPLE',
                hasCustomLabel: false,
                label: 'COUNT(sales)',
                optionName: 'metric_mspauv83hxf_mfx8288mn2p',
                sqlExpression: null,
              },
            ],
            orderby: [
              [
                {
                  aggregate: 'COUNT',
                  column: {
                    advanced_data_type: null,
                    certification_details: null,
                    certified_by: null,
                    column_name: 'sales',
                    description: null,
                    expression: null,
                    filterable: true,
                    groupby: true,
                    id: 444,
                    is_certified: false,
                    is_dttm: false,
                    python_date_format: null,
                    type: 'DOUBLE PRECISION',
                    type_generic: 0,
                    verbose_name: null,
                    warning_markdown: null,
                  },
                  datasourceWarning: false,
                  expressionType: 'SIMPLE',
                  hasCustomLabel: false,
                  label: 'COUNT(sales)',
                  optionName: 'metric_mspauv83hxf_mfx8288mn2p',
                  sqlExpression: null,
                },
                false,
              ],
            ],
            annotation_layers: [],
            row_limit: 10000,
            series_columns: ['country'],
            series_limit: 0,
            order_desc: true,
            url_params: {
              permalink_key: 'DVARgknMKzN',
              slice_id: '136',
            },
            custom_params: {},
            custom_form_data: {},
            time_offsets: [],
            post_processing: [
              {
                operation: 'pivot',
                options: {
                  index: ['order_date'],
                  columns: ['country'],
                  aggregates: {
                    'COUNT(sales)': {
                      operator: 'mean',
                    },
                  },
                  drop_missing_columns: false,
                },
              },
              {
                operation: 'rename',
                options: {
                  columns: {
                    'COUNT(sales)': null,
                  },
                  level: 0,
                  inplace: true,
                },
              },
              {
                operation: 'flatten',
              },
            ],
          },
        ],
        form_data: {
          datasource: '10__table',
          viz_type: 'echarts_timeseries_bar',
          slice_id: 136,
          url_params: {
            permalink_key: 'DVARgknMKzN',
            slice_id: '136',
          },
          x_axis: 'order_date',
          time_grain_sqla: 'P1M',
          x_axis_sort_asc: true,
          x_axis_sort_series: 'name',
          x_axis_sort_series_ascending: true,
          metrics: [
            {
              aggregate: 'COUNT',
              column: {
                advanced_data_type: null,
                certification_details: null,
                certified_by: null,
                column_name: 'sales',
                description: null,
                expression: null,
                filterable: true,
                groupby: true,
                id: 444,
                is_certified: false,
                is_dttm: false,
                python_date_format: null,
                type: 'DOUBLE PRECISION',
                type_generic: 0,
                verbose_name: null,
                warning_markdown: null,
              },
              datasourceWarning: false,
              expressionType: 'SIMPLE',
              hasCustomLabel: false,
              label: 'COUNT(sales)',
              optionName: 'metric_mspauv83hxf_mfx8288mn2p',
              sqlExpression: null,
            },
          ],
          groupby: ['country'],
          adhoc_filters: [
            {
              clause: 'WHERE',
              comparator: 'No filter',
              expressionType: 'SIMPLE',
              operator: 'TEMPORAL_RANGE',
              subject: 'order_date',
            },
          ],
          order_desc: true,
          row_limit: 10000,
          truncate_metric: true,
          show_empty_columns: true,
          comparison_type: 'values',
          annotation_layers: [],
          forecastPeriods: 10,
          forecastInterval: 0.8,
          orientation: 'vertical',
          x_axis_title_margin: 15,
          y_axis_title_margin: 15,
          y_axis_title_position: 'Left',
          sort_series_type: 'sum',
          color_scheme: 'supersetColors',
          stack: 'Stack',
          only_total: true,
          show_legend: true,
          legendType: 'scroll',
          legendOrientation: 'top',
          x_axis_time_format: 'smart_date',
          y_axis_format: 'SMART_NUMBER',
          truncateXAxis: true,
          y_axis_bounds: [null, null],
          rich_tooltip: true,
          tooltipTimeFormat: 'smart_date',
          extra_form_data: {},
          force: false,
          result_format: 'json',
          result_type: 'full',
        },
        result_format: 'json',
        result_type: 'full',
      });

      setOrdersData(orderResponse.result[0].data);
      setOrdersCities(orderResponse.result[0].colnames.slice(1));

      // const { data: foundCountries } = await api.chart.getCountries();
      // setCountries(foundCountries.result);
      setCountriesOptions([
        'Spain',
        'Switzerland',
        'Italy',
        'Belgium',
        'Sweden',
        'Norway',
        'France',
        'USA',
        'Austria',
        'UK',
        'Australia',
        'Ireland',
        'Germany',
        'Japan',
        'Denmark',
        'Singapore',
        'Canada',
        'Philippines',
        'Finland',
      ]);

      // const { data: foundCities } = await api.chart.getCities();
      // setCities(foundCities.result);
      setCitiesOptions([
        'Las Vegas',
        'Nashua',
        'Newark',
        'Cowes',
        'Paris',
        'New Bedford',
        'Burlingame',
        'Chatswood',
        'San Francisco',
        'Brisbane',
        'Lyon',
        'Lille',
        'Glendale',
        'Salzburg',
        'Singapore',
        'Gensve',
        'Bruxelles',
        'Manchester',
        'Barcelona',
        'Montreal',
        'Reims',
        'Koln',
        'Oulu',
        'Bergen',
        'Versailles',
        'New Haven',
        'Brickhaven',
        'Sevilla',
        'Boston',
        'South Brisbane',
        'Helsinki',
        'Glen Waverly',
        'Marseille',
        'Espoo',
        'North Sydney',
        'Melbourne',
        'San Rafael',
        'Bergamo',
        'Strasbourg',
        'Reggio Emilia',
        'Toulouse',
        'Charleroi',
        'Allentown',
        'Burbank',
        'Tsawassen',
        'London',
        'Stavern',
        'Philadelphia',
        'Kobenhavn',
        'Munich',
        'Torino',
        'Graz',
        'San Diego',
        'Boras',
        'Pasadena',
        'Osaka',
        'Bridgewater',
        'Los Angeles',
        'Madrid',
        'Minato-ku',
        'Dublin',
        'Vancouver',
        'Makati City',
        'Lule',
        'White Plains',
        'Aaarhus',
        'Liverpool',
        'NYC',
        'Oslo',
        'Frankfurt',
        'San Jose',
        'Cambridge',
        'Nantes',
      ]);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  }, [api.chart, citiesFilter, countriesFilter, temporalRange]);

  useEffect(() => {
    getData();
  }, [getData]);

  const updateTemporalRange = useCallback((date: string) => {
    const startDate = DateTime.fromISO(date).startOf('year');
    const endDate = DateTime.fromISO(date).endOf('year');
    setTemporalRange([startDate, endDate]);
  }, []);

  const handleSelectCities = (value: string) => {
    const newValues = [...citiesFilter];

    const index = newValues.indexOf(value);
    if (index === -1) {
      newValues.push(value);
    } else {
      newValues.splice(index, 1);
    }

    setCitiesFilter(newValues);
  };

  const handleSelectCountries = (value: string) => {
    const newValues = [...countriesFilter];

    const index = newValues.indexOf(value);
    if (index === -1) {
      newValues.push(value);
    } else {
      newValues.splice(index, 1);
    }

    setCountriesFilter(newValues);
  };

  const handleCleanFilters = () => {
    setCitiesFilter([]);
    setCountriesFilter([]);
  };

  const [isSheetOpen, setSheetOpen] = useState<boolean>();

  return (
    <div className="p-4">
      {loading ? (
        <div className="flex items-center justify-center min-h-screen">
          <LoaderCircle className="rotate w-[2rem] h-[2rem]" />
        </div>
      ) : (
        <div className="w-[100%]">
          <div className="w-[100%] flex justify-between items-center">
            <Select
              defaultValue={years[years.length - 1]?.toISO() as string}
              onValueChange={updateTemporalRange}
              value={temporalRange[0].toISO() as string}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a year" />
              </SelectTrigger>
              <SelectContent>
                {years.map((date) => (
                  <SelectItem key={date.year} value={date.toISO() as string}>
                    {date.year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button onClick={() => setSheetOpen(true)}>
              <Filter />
              Filter
            </Button>
            <Sheet open={isSheetOpen} onOpenChange={setSheetOpen}>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                  <Separator />
                  <div className="w-full flex justify-end">
                    <Button onClick={handleCleanFilters} type="button">
                      Clear
                    </Button>
                  </div>
                </SheetHeader>
                <div className="px-4 flex flex-col gap-2">
                  <div>Country</div>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full flex justify-between"
                        type="button"
                      >
                        Select Countries
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent>
                      <Command>
                        {countriesOptions.map((option) => (
                          <CommandItem
                            key={option}
                            onSelect={() => handleSelectCountries(option)}
                          >
                            {option}
                          </CommandItem>
                        ))}
                      </Command>
                    </PopoverContent>
                  </Popover>

                  <div className="flex gap-2 overflow-x-auto">
                    {countriesFilter.map((c, index) => {
                      const bgColor = COLORS[index % COLORS.length];
                      return (
                        <div
                          key={c}
                          className={`text-white p-1 rounded-md px-2 text-xs`}
                          style={{
                            background: bgColor,
                          }}
                        >
                          {c}
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className=" px-4 flex flex-col gap-2">
                  <div>City</div>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full flex justify-between"
                        type="button"
                      >
                        Select Cities
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent>
                      <Command>
                        {citiesOptions.map((option) => (
                          <CommandItem
                            key={option}
                            onSelect={() => handleSelectCities(option)}
                          >
                            {option}
                          </CommandItem>
                        ))}
                      </Command>
                    </PopoverContent>
                  </Popover>

                  <div className="flex gap-2 overflow-x-auto">
                    {citiesFilter.map((c, index) => {
                      const bgColor = COLORS[index % COLORS.length];
                      return (
                        <div
                          key={c}
                          className={`text-white p-1 rounded-md px-2 text-xs`}
                          style={{
                            background: bgColor,
                          }}
                        >
                          {c}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
          <div className="flex md:flex-row flex-col justify-around items-center md:h-[80vh] h-[90vh]">
            <SalesBarChart
              data={salesData}
              cities={salesCities}
              label="Monthly Sales By City"
            />
            <OrdersBarChart
              data={orderData}
              cities={ordersCities}
              label="Monthly Orders By City"
            />
          </div>
        </div>
      )}
    </div>
  );
}
