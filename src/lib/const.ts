import { generateArrayOfYears } from './helpers';
import { ITopsisAggregateType, ITopsisCompanyType } from '../api/generated/data-contracts';

export enum FieldTypes {
  bank = 'bank',
  broker = 'broker',
  mfo = 'mfo',
  insurance = 'insurance',
}

export const fieldItems = [
  { id: FieldTypes.bank, name: 'Банки' },
  { id: FieldTypes.broker, name: 'Брокеры' },
  { id: FieldTypes.mfo, name: 'Микрофинансовые организации' },
  { id: FieldTypes.insurance, name: 'Страховые компании' },
];

export const availableYears = generateArrayOfYears();

export const topsisFieldItems = [
  { id: ITopsisCompanyType.Rspp, name: 'Компании' },
  { id: ITopsisCompanyType.NonRspp, name: 'Банки' },
];

export const topsisIndexItems = [
  { id: ITopsisAggregateType.Average.toString(), name: 'Среднее' },
  { id: ITopsisAggregateType.AllLetters.toString(), name: 'На буквах' },
  { id: ITopsisAggregateType.AllTopics.toString(), name: 'На всех топиках' },
];
