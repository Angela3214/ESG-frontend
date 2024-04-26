import { ChartData } from 'chart.js';
import { IAggregateTextResultItem } from '../../api/generated/data-contracts';
import { formatDate, groupBy } from '../../lib/helpers';
import { generateRGB, generateColorsFromRGB } from '../../modules/line-chart/helpers';

type Dataset = {
  label: string;
  data: { x: string; y: number }[];
  borderColor: string;
  backgroundColor: string;
};

export const formatChartData = (
  aggregatedData: IAggregateTextResultItem[],
): ChartData<'line', number[], string> => {
  const labels = [...new Set(aggregatedData.map((item) => formatDate(item.date)))];

  const datasets: Dataset[] = [];

  const dataGroupedByName = groupBy(aggregatedData, 'bank_name');

  dataGroupedByName.forEach((items, key) => {
    const baseColorRGB = generateRGB();
    const baseColor = generateColorsFromRGB(baseColorRGB.red, baseColorRGB.green, baseColorRGB.blue);
    // const colorDiff = 20;
    datasets.push({
      label: key,
      data: items.map((item) => ({ x: formatDate(item.date), y: item.index ?? 0 })),
      borderColor: baseColor.borderColor,
      backgroundColor: baseColor.backgroundColor,
    });
    // const color10thPercentile = generateColorsFromRGB(baseColorRGB.red - colorDiff, baseColorRGB.green - colorDiff, baseColorRGB.blue - colorDiff);
    // datasets.push({
    //   label: key + ' 10 percentile',
    //   data: items.map((item) => ({ x: formatDate(item.date), y: item.index_10_percentile ?? 0 })),
    //   borderColor: color10thPercentile.borderColor,
    //   backgroundColor: color10thPercentile.backgroundColor,
    // });
    // const color90thPercentile = generateColorsFromRGB(baseColorRGB.red + colorDiff, baseColorRGB.green + colorDiff, baseColorRGB.blue + colorDiff);
    // datasets.push({
    //   label: key + ' 90th percentile',
    //   data: items.map((item) => ({ x: formatDate(item.date), y: item.index_90_percentile ?? 0 })),
    //   borderColor: color90thPercentile.borderColor,
    //   backgroundColor: color90thPercentile.backgroundColor,
    // });
  });

  return {
    labels,
    datasets: datasets as any,
  };
};
