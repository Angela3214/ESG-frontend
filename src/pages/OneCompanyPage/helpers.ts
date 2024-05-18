import { IGetTopsisWithESGResponseItem } from '../../api/generated/data-contracts';

type TableData = {
  companyName: string;
  year: number;
  average: string;
  environmental: string;
  social: string;
  governance: string;
}[];

export const formatTableData = (aggregatedData: IGetTopsisWithESGResponseItem[]): TableData => {
  return aggregatedData.map(item => ({
    companyName: item.company_name,
    year: item.year,
    average: item.value.toFixed(3),
    environmental: item.environmental.toFixed(3),
    social: item.social.toFixed(3),
    governance: item.governance.toFixed(3),
  }));
};
