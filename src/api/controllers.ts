import { Bank } from './generated/Bank';
import { Model } from './generated/Model';
import { Source } from './generated/Source';
import { Text } from './generated/Text';
import { TextResult } from './generated/TextResult';
import { Views } from './generated/Views';
import { Topsis } from './generated/Topsis';

export const configuration = {
  get baseHostName() {
    return 'http://localhost:3001';
  },
  get baseUrl() {
    return `${this.baseHostName}/api`;
  }
};

export const AggregateController = new Views(configuration);
export const BankController = new Bank(configuration);
export const ModelController = new Model(configuration);
export const SourceController = new Source(configuration);
export const TextController = new Text(configuration);
export const TextResultController = new TextResult(configuration);
export const TopsisController = new Topsis(configuration);