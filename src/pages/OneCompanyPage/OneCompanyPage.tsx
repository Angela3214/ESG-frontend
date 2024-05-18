/* eslint-disable max-lines */
/* eslint-disable complexity */
import React, { useMemo, useState } from 'react';
import {
  Button,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';

import { Select } from '../../components/Select';
import { topsisFieldItems } from '../../lib/const';
import { formatTableData } from './helpers';
import { noop } from '../../lib/helpers';
import { Autocomplete } from '../../components/Autocomplete';
import {
  IGetTopsisCompaniesResponseItem,
  ITopsisAggregateType,
  ITopsisCompanyType,
} from '../../api/generated/data-contracts';
import {
  useGetTopsisRsppCompaniesQuery,
  useGetTopsisEsgQuery, useGetTopsisNotRsppCompaniesQuery,
} from '../../api/queries/topsis';

type TableRowData = {
  companyName: string;
  year: number;
  average: string;
  environmental: string;
  social: string;
  governance: string;
};

export const OneCompanyPage = () => {
  const [selectedFields, setSelectedFields] = useState<ITopsisCompanyType[]>([]);
  const [selectedRspp, setSelectedRspp] = useState<IGetTopsisCompaniesResponseItem[]>([]);
  const [selectedNotRspp, setSelectedNotRspp] = useState<IGetTopsisCompaniesResponseItem[]>([]);
  const [selectedIndexType] = useState<string[]>([]);

  const { data: rsppData, isLoading: loadingRspp } = useGetTopsisRsppCompaniesQuery();
  const { data: notRsppData, isLoading: loadingNotRspp } = useGetTopsisNotRsppCompaniesQuery();

  const {
    data: topsisData,
    isLoading: isLoadingTopsisData,
    refetch: refetchTopsisData,
  } = useGetTopsisEsgQuery({
    company_ids: [
      ...(selectedFields[0] === ITopsisCompanyType.Rspp ? selectedRspp.map(({ id }) => id) : []),
      ...(selectedFields[0] === ITopsisCompanyType.NonRspp ? selectedNotRspp.map(({ id }) => id) : []),
    ],
    aggregate_types: [ITopsisAggregateType.Average],
  });

  const tableData = useMemo(() => formatTableData(topsisData?.data || []), [topsisData]);

  const loading =
    loadingRspp ||
    loadingNotRspp ||
    isLoadingTopsisData;

  const buttonDisabled =
    loading ||
    (selectedFields[0] === ITopsisCompanyType.Rspp && selectedRspp.length === 0) ||
    (selectedFields[0] === ITopsisCompanyType.NonRspp && selectedNotRspp.length === 0) ||
    selectedIndexType.length === 0;

  function getColor(value: number) {
    if (value >= 0.8) return '#8bc881'; // зелёный
    if (value >= 0.6) return '#f1f1a1'; // светло-жёлтый
    if (value >= 0.4) return '#efd64e'; // тёмно-жёлтый
    if (value >= 0.2) return '#f1788a'; // светло-красный
    return '#ef3939'; // тёмно-красный
  }

  type SortConfig = {
    field: keyof TableRowData;
    direction: 'asc' | 'desc';
  };

  const [sortConfig, setSortConfig] = useState<SortConfig>({ field: 'year', direction: 'desc' });

  const handleSort = (field: keyof TableRowData) => {
    const isAsc = sortConfig.field === field && sortConfig.direction === 'asc';
    setSortConfig({ field, direction: isAsc ? 'desc' : 'asc' });
  };

  const sortedData = useMemo(() => {
    return [...tableData].sort((a, b) => {
      const aValue = a[sortConfig.field];
      const bValue = b[sortConfig.field];

      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [tableData, sortConfig]);

  return (
    <div>
      <div className="text-4xl mt-4 font-semibold">Таблица</div>
      <div className="flex mt-8 gap-4">
        <Select
          selectedValue={selectedFields}
          onChange={setSelectedFields as any}
          label="Тип отчетов"
          labelId="fields"
          items={topsisFieldItems}
          itemToString={(item) => item.name}
          itemToValue={(item) => item.id}
        />
        {selectedFields.length === 0 && (
          <Select
            disabled
            selectedValue={[]}
            onChange={noop}
            label="Компания (выбор одной)"
            labelId="mock"
            items={[]}
            itemToString={() => ''}
            itemToValue={() => ''}
          />
        )}
        {selectedFields[0] === ITopsisCompanyType.Rspp && (
          <Autocomplete
            multiple={false}
            id="rspp"
            label="Компания (выбор одной)"
            selectedValue={selectedRspp}
            items={rsppData?.data ?? []}
            itemToString={(rspp) => rspp.name}
            onChange={setSelectedRspp}
          />
        )}
        {selectedFields[0] === ITopsisCompanyType.NonRspp && (
          <Autocomplete
            multiple={false}
            id="not_rspp"
            label="Компания (выбор одной)"
            selectedValue={selectedNotRspp}
            items={notRsppData?.data ?? []}
            itemToString={(notRspp) => notRspp.name}
            onChange={setSelectedNotRspp}
          />
        )}
      </div>
      <div className="mt-4">
        <Button
          disabled={buttonDisabled}
          variant="contained"
          onClick={() => refetchTopsisData()}
        >
          Обновить данные
        </Button>
      </div>
      {loading ? <CircularProgress /> : (
        <div className="flex">
          <div className="flex-1">
            <TableContainer component={Paper} sx={{ mt: 1 }}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow sx={{ '& > *': { border: 1, borderColor: 'black' } }}>
                    <TableCell>
                      Год
                      <Button onClick={() => handleSort('year')} style={{ color: sortConfig.field === 'year' ? 'blue' : 'gray' }}>
                        {sortConfig.field === 'year' && (sortConfig.direction === 'asc' ? '▲' : '▼')}
                      </Button>
                    </TableCell>
                    <TableCell align="right">Среднее</TableCell>
                    <TableCell align="right">Критерий E</TableCell>
                    <TableCell align="right">Критерий S</TableCell>
                    <TableCell align="right">Критерий G</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {sortedData.map((row, index) => (
                    <TableRow key={index} sx={{ '& > *': { border: 1, borderColor: 'black' } }}>
                      <TableCell component="th" scope="row">{row.year}</TableCell>
                      <TableCell align="right" style={{ backgroundColor: getColor(parseFloat(row.average)) }}>{row.average}</TableCell>
                      <TableCell align="right" style={{ backgroundColor: getColor(parseFloat(row.environmental)) }}>{row.environmental}</TableCell>
                      <TableCell align="right" style={{ backgroundColor: getColor(parseFloat(row.social)) }}>{row.social}</TableCell>
                      <TableCell align="right" style={{ backgroundColor: getColor(parseFloat(row.governance)) }}>{row.governance}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
          <div className="flex-1" style={{ marginLeft: '10px' }}>
            <div style={{ textAlign: 'center', marginBottom: '10px' }}>Оценка критериев E, S, G</div>
            <img src="images/rate_esg.png" alt="Оценка критериев E, S, G" />
          </div>
        </div>
      )}
    </div>
  );
}
