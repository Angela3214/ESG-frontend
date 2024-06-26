/* eslint-disable max-lines */
/* eslint-disable complexity */
import React, { useMemo, useState } from 'react';
import { Button, CircularProgress } from '@mui/material';
import { useGetAggregateTextResultQuery } from '../../api/queries/aggregate';
import {
  useGetBanksQuery,
  useGetBrokersQuery,
  useGetInsurancesQuery,
  useGetMfoQuery,
} from '../../api/queries/bank';
import { useGetModelsQuery } from '../../api/queries/model';
import { useGetSourceTypesQuery } from '../../api/queries/source';
import { Select } from '../../components/Select';
import { availableYears, fieldItems, FieldTypes } from '../../lib/const';
import { LineChart } from '../../modules/line-chart';
import { formatChartData } from './helpers';
import { noop } from '../../lib/helpers';
import { Autocomplete } from '../../components/Autocomplete';
import { IBankModel } from '../../api/generated/data-contracts';
import { GraphDescription } from '../ConstData/GraphText';

export const ComparisonPage = () => {
  const [selectedFields, setSelectedFields] = useState<FieldTypes[]>([]);
  const [selectedBanks, setSelectedBanks] = useState<IBankModel[]>([]);
  const [selectedBrokers, setSelectedBrokers] = useState<IBankModel[]>([]);
  const [selectedMfo, setSelectedMfo] = useState<IBankModel[]>([]);
  const [selectedInsurances, setSelectedInsurances] = useState<IBankModel[]>([]);
  const [selectedModels, setSelectedModels] = useState<string[]>([]);
  const [selectedSourceTypes, setSelectedSourceTypes] = useState<string[]>([]);
  const [selectedStartYear, setSelectedStartYear] = useState<string[]>([]);
  const [selectedEndYear, setSelectedEndYear] = useState<string[]>([]);

  const { data: banksData, isLoading: loadingBanks } = useGetBanksQuery();
  const { data: brokersData, isLoading: loadingBrokers } = useGetBrokersQuery();
  const { data: mfoData, isLoading: loadingMfo } = useGetMfoQuery();
  const { data: insurancesData, isLoading: loadingInsurances } = useGetInsurancesQuery();
  const { data: modelsData, isLoading: loadingModels } = useGetModelsQuery();
  const { data: sourceTypesData, isLoading: loadingSourceTypes } = useGetSourceTypesQuery();

  const {
    data: aggregatedData,
    isLoading: isLoadingAggregatedData,
    refetch: refetchAggregatedData,
  } = useGetAggregateTextResultQuery({
    bank_ids: [
      ...(selectedFields[0] === FieldTypes.bank ? selectedBanks.map(({ id }) => id) : []),
      ...(selectedFields[0] === FieldTypes.broker ? selectedBrokers.map(({ id }) => id) : []),
      ...(selectedFields[0] === FieldTypes.mfo ? selectedMfo.map(({ id }) => id) : []),
      ...(selectedFields[0] === FieldTypes.insurance ? selectedInsurances.map(({ id }) => id) : []),
    ],
    model_names: selectedModels,
    source_type: selectedSourceTypes,
    start_year: selectedStartYear[0] ? Number(selectedStartYear[0]) : undefined,
    end_year: selectedEndYear[0] ? Number(selectedEndYear[0]) : undefined,
    aggregate_by_year: false,
  });

  const chartData = useMemo(() => {
    if (aggregatedData) return formatChartData(aggregatedData?.items);
    return null;
  }, [aggregatedData]);

  const loading =
    loadingBanks ||
    loadingBrokers ||
    loadingInsurances ||
    loadingMfo ||
    loadingModels ||
    loadingSourceTypes ||
    isLoadingAggregatedData;

  const buttonDisabled =
    loading ||
    (selectedFields[0] === FieldTypes.bank && selectedBanks.length === 0) ||
    (selectedFields[0] === FieldTypes.broker && selectedBrokers.length === 0) ||
    (selectedFields[0] === FieldTypes.mfo && selectedMfo.length === 0) ||
    (selectedFields[0] === FieldTypes.insurance && selectedInsurances.length === 0) ||
    selectedModels.length === 0 ||
    selectedSourceTypes.length === 0;

  return (
    <div>
      <div className="text-4xl mt-4 font-semibold">Сравнение компаний</div>
      <div className="flex mt-8 gap-4">
        <Select
          selectedValue={selectedFields}
          onChange={setSelectedFields as any}
          label="Отрасль"
          labelId="fields"
          items={fieldItems}
          itemToString={(item) => item.name}
          itemToValue={(item) => item.id}
        />
        {selectedFields.length === 0 && (
          // Mock Select
          <Select
            disabled
            selectedValue={[]}
            onChange={noop}
            label="Компании (выбор до 5 шт.)"
            labelId="mock"
            items={[]}
            itemToString={() => ''}
            itemToValue={() => ''}
          />
        )}
        {selectedFields[0] === FieldTypes.bank && (
          <Autocomplete
            id="banks"
            label="Компании (выбор до 5 шт.)"
            selectedValue={selectedBanks}
            items={banksData?.items ?? []}
            itemToString={(bank) => bank.bank_name}
            multiple={true}
            onChange={setSelectedBanks}
          />
        )}
        {selectedFields[0] === FieldTypes.broker && (
          <Autocomplete
            id="brokers"
            label="Компании (выбор до 5 шт.)"
            selectedValue={selectedBrokers}
            items={brokersData?.items ?? []}
            itemToString={(broker) => broker.bank_name}
            multiple={true}
            onChange={setSelectedBrokers}
          />
        )}
        {selectedFields[0] === FieldTypes.mfo && (
          <Autocomplete
            id="mfo"
            label="Компании (выбор до 5 шт.)"
            selectedValue={selectedMfo}
            items={mfoData?.items ?? []}
            itemToString={(mfo) => mfo.bank_name}
            multiple={true}
            onChange={setSelectedMfo}
          />
        )}
        {selectedFields[0] === FieldTypes.insurance && (
          <Autocomplete
            id="insurance"
            label="Компании (выбор до 5 шт.)"
            selectedValue={selectedInsurances}
            items={insurancesData?.items ?? []}
            itemToString={(insurance) => insurance.bank_name}
            multiple={true}
            onChange={setSelectedInsurances}
          />
        )}
        <Select
          selectedValue={selectedModels}
          onChange={setSelectedModels}
          label="Модель"
          labelId="models"
          items={modelsData?.items ?? []}
          itemToString={(model) => model.name}
          itemToValue={(model) => model.name}
        />
        <Select
          selectedValue={selectedSourceTypes}
          onChange={setSelectedSourceTypes}
          label="Источники"
          labelId="sources"
          items={sourceTypesData?.items ?? []}
          itemToString={(sourceType) => sourceType.name}
          itemToValue={(sourceType) => sourceType.name}
        />
        <Select
          selectedValue={selectedStartYear}
          onChange={setSelectedStartYear}
          label="Первый год"
          labelId="startYear"
          items={availableYears}
          itemToString={(year) => String(year)}
          itemToValue={(year) => String(year)}
        />
        <Select
          selectedValue={selectedEndYear}
          onChange={setSelectedEndYear}
          label="Последний год"
          labelId="endYear"
          items={availableYears}
          itemToString={(year) => String(year)}
          itemToValue={(year) => String(year)}
        />
      </div>
      <div className="mt-4">
        <Button
          disabled={buttonDisabled}
          variant="contained"
          onClick={() => refetchAggregatedData()}
        >
          Обновить данные
        </Button>
      </div>
      {loading && (
        <div className="mt-[100px] flex justify-center">
          <CircularProgress data-testid="loading" />
        </div>
      )}
      {!loading && (
        <div className="w-full mt-4">
          {chartData && chartData.labels?.length === 0 ? (
            <div className="flex justify-center mt-[100px] text-xl">
              Нет данных по выбранным параметрам
            </div>
          ) : (
            <>{chartData && <LineChart title="" chartData={chartData} />}</>
          )}
        </div>
      )}
      {GraphDescription()}
    </div>
  );
};
