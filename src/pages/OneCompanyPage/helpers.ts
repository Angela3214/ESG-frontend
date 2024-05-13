import { IGetTopsisResponseItem } from '../../api/generated/data-contracts';
import { groupBy } from '../../lib/helpers';

type TableData = {
  companyName: string;
  year: string;
  value: number;
}[];

export const formatTableData = (aggregatedData: IGetTopsisResponseItem[]): TableData => {
  const dataGroupedByModelName = groupBy(aggregatedData, 'company_name');
  const tableData: TableData = [];

  dataGroupedByModelName.forEach((items, companyName) => {
    items.forEach((item) => {
      tableData.push({
        companyName,
        year: item.year.toString(),
        value: item.value ?? 0,  // Using 0 as default if no value is present
      });
    });
  });

  return tableData;
};
