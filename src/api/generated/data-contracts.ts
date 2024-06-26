/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

/** AggregateTetResultResponse */
export interface IAggregateTetResultResponse {
  /** Items */
  items: IAggregateTextResultItem[];
}

/** AggregateTextResultItem */
export interface IAggregateTextResultItem {
  /** Year */
  year: number;
  /** Quarter */
  quarter: number;
  /**
   * Date
   * @format date
   */
  date: string;
  /** Bank Name */
  bank_name: string;
  /** Bank Id */
  bank_id: number;
  /** Model Name */
  model_name: string;
  /** Source Type */
  source_type: string;
  /** Index */
  index?: number;
  /** Index 10 Percentile */
  index_10_percentile?: number;
  /** Index 90 Percentile */
  index_90_percentile?: number;
}

/** BankModel */
export interface IBankModel {
  /** Id */
  id: number;
  /** Bank Name */
  bank_name: string;
  /** Licence */
  licence: string;
  /** Description */
  description?: string;
}

/** CreateSource */
export interface ICreateSource {
  /** Site */
  site: string;
  /** Source Type */
  source_type: string;
}

/** GetBankList */
export interface IGetBankList {
  /** Items */
  items: IBankModel[];
}

/** GetModel */
export interface IGetModel {
  /** Items */
  items: IGetModelItem[];
}

/** GetModelItem */
export interface IGetModelItem {
  /** Id */
  id: number;
  /** Name */
  name: string;
  /** Model Type Id */
  model_type_id: number;
  /** Model Type */
  model_type: string;
}

/** GetModelType */
export interface IGetModelType {
  /** Items */
  items: IModelTypeModel[];
}

/** GetSource */
export interface IGetSource {
  /** Items */
  items: ISourceModel[];
}

/** GetSourceTypes */
export interface IGetSourceTypes {
  /** Items */
  items: ISourceTypesModel[];
}

/** GetTextResult */
export interface IGetTextResult {
  /** Items */
  items: IGetTextResultItem[];
}

/** GetTextResultItem */
export interface IGetTextResultItem {
  /** Id */
  id: number;
  /** Text Sentence Id */
  text_sentence_id: number;
  /** Result */
  result: number[];
  /** Model Id */
  model_id: number;
}

/** GetTextSentences */
export interface IGetTextSentences {
  /** Items */
  items: IGetTextSentencesItem[];
}

/** GetTextSentencesItem */
export interface IGetTextSentencesItem {
  /** Sentence Id */
  sentence_id: number;
  /** Sentence */
  sentence: string;
}

/** GetTopsisCompaniesResponse */
export interface IGetTopsisCompaniesResponse {
  /**
   * Data
   * @example [{"id":1,"name":"Company Name"}]
   */
  data: IGetTopsisCompaniesResponseItem[];
}

/** GetTopsisCompaniesResponseItem */
export interface IGetTopsisCompaniesResponseItem {
  /**
   * Id
   * @example 1
   */
  id: number;
  /**
   * Name
   * @example "Company Name"
   */
  name: string;
}

/** GetTopsisCompanyTypeResponse */
export interface IGetTopsisCompanyTypeResponse {
  /**
   * Data
   * @example [{"id":1,"name":"rspp"}]
   */
  data: IGetTopsisCompanyTypeResponseItem[];
}

/** GetTopsisCompanyTypeResponseItem */
export interface IGetTopsisCompanyTypeResponseItem {
  /**
   * Id
   * @example 1
   */
  id: number;
  /**
   * Name
   * @example "rspp"
   */
  name: string;
}

/** GetTopsisResponse */
export interface IGetTopsisResponse {
  /**
   * Data
   * @example [{"company_id":1,"company_name":"Company Name","year":2019,"value":0.5}]
   */
  data: IGetTopsisResponseItem[];
}

/** GetTopsisResponseItem */
export interface IGetTopsisResponseItem {
  /**
   * Company Name
   * @example "Company Name"
   */
  company_name: string;
  /**
   * Year
   * @example 2019
   */
  year: number;
  /**
   * Value
   * @example 0.5
   */
  value: number;
  /** @example "average" */
  aggregate_type: ITopsisAggregateType;
}

/** GetTopsisWithESGResponse */
export interface IGetTopsisWithESGResponse {
  /**
   * Data
   * @example [{"company_id":1,"company_name":"Company Name","year":2019,"value":0.5,"environmental":0.5,"social":0.5,"governance":0.5}]
   */
  data: IGetTopsisWithESGResponseItem[];
}

/** GetTopsisWithESGResponseItem */
export interface IGetTopsisWithESGResponseItem {
  /**
   * Company Name
   * @example "Company Name"
   */
  company_name: string;
  /**
   * Year
   * @example 2019
   */
  year: number;
  /**
   * Value
   * @example 0.5
   */
  value: number;
  /** @example "average" */
  aggregate_type: ITopsisAggregateType;
  /**
   * Environmental
   * @example 0.5
   */
  environmental: number;
  /**
   * Social
   * @example 0.5
   */
  social: number;
  /**
   * Governance
   * @example 0.5
   */
  governance: number;
}

/** HTTPValidationError */
export interface IHTTPValidationError {
  /** Detail */
  detail?: IValidationError[];
}

/**
 * IndexTypeVal
 * An enumeration.
 */
export enum IIndexTypeVal {
  IndexBase = 'index_base',
  IndexMean = 'index_mean',
  IndexStd = 'index_std',
  IndexSafe = 'index_safe',
}

/** ModelTypeModel */
export interface IModelTypeModel {
  /** Id */
  id: number;
  /** Model Type */
  model_type: string;
}

/** PatchSource */
export interface IPatchSource {
  /** Parser State */
  parser_state?: string;
  /**
   * Last Update
   * @format date-time
   */
  last_update?: string;
}

/** PostModel */
export interface IPostModel {
  /** Model Name */
  model_name: string;
  /** Model Type */
  model_type: string;
}

/** PostModelResponse */
export interface IPostModelResponse {
  /** Model Id */
  model_id: number;
}

/** PostTextItem */
export interface IPostTextItem {
  /** Items */
  items: ITextItem[];
  /** Parser State */
  parser_state?: string;
  /**
   * Date
   * @format date-time
   */
  date?: string;
}

/** PostTextResult */
export interface IPostTextResult {
  /** Items */
  items: IPostTextResultItem[];
}

/** PostTextResultItem */
export interface IPostTextResultItem {
  /** Text Result */
  text_result: number[];
  /** Model Id */
  model_id: number;
  /** Text Sentence Id */
  text_sentence_id: number;
}

/** PostTopsisCompanyRequest */
export interface IPostTopsisCompanyRequest {
  /**
   * Data
   * @example [{"name":"Company Name","company_type_id":1}]
   */
  data: IPostTopsisCompanyRequestItem[];
}

/** PostTopsisCompanyRequestItem */
export interface IPostTopsisCompanyRequestItem {
  /**
   * Name
   * @example "Company Name"
   */
  name: string;
  /**
   * Company Type Id
   * @example 1
   */
  company_type_id: number;
}

/** PostTopsisCompanyRequestResponse */
export interface IPostTopsisCompanyRequestResponse {
  /**
   * Data
   * @example [{"id":1,"name":"rspp","company_type_id":1}]
   */
  data: IPostTopsisCompanyRequestResponseItem[];
}

/** PostTopsisCompanyRequestResponseItem */
export interface IPostTopsisCompanyRequestResponseItem {
  /**
   * Id
   * @example 1
   */
  id: number;
  /**
   * Name
   * @example "rspp"
   */
  name: string;
  /**
   * Company Type Id
   * @example 1
   */
  company_type_id: number;
}

/** PostTopsisRequest */
export interface IPostTopsisRequest {
  /**
   * Data
   * @example [{"company_id":1,"year":2019,"environmental":0.5,"social":0.5,"governance":0.5,"on_letters":0.5,"all_topics":0.5,"average":0.5}]
   */
  data: IPostTopsisRequestItem[];
}

/** PostTopsisRequestItem */
export interface IPostTopsisRequestItem {
  /**
   * Company Id
   * @example 1
   */
  company_id: number;
  /**
   * Year
   * @example 2019
   */
  year: number;
  /**
   * Environmental
   * @example 0.5
   */
  environmental: number;
  /**
   * Social
   * @example 0.5
   */
  social: number;
  /**
   * Governance
   * @example 0.5
   */
  governance: number;
  /**
   * On Letters
   * @example 0.5
   */
  on_letters: number;
  /**
   * All Topics
   * @example 0.5
   */
  all_topics: number;
  /**
   * Average
   * @example 0.5
   */
  average: number;
}

/** PostTopsisResponse */
export interface IPostTopsisResponse {
  /**
   * Data
   * @example [{"id":1,"company_id":1,"year":2019,"environmental":0.5,"social":0.5,"governance":0.5,"on_letters":0.5,"all_topics":0.5,"average":0.5}]
   */
  data: IPostTopsisResponseItem[];
}

/** PostTopsisResponseItem */
export interface IPostTopsisResponseItem {
  /**
   * Id
   * @example 1
   */
  id: number;
  /**
   * Company Id
   * @example 1
   */
  company_id: number;
  /**
   * Year
   * @example 2019
   */
  year: number;
  /**
   * Environmental
   * @example 0.5
   */
  environmental: number;
  /**
   * Social
   * @example 0.5
   */
  social: number;
  /**
   * Governance
   * @example 0.5
   */
  governance: number;
  /**
   * On Letters
   * @example 0.5
   */
  on_letters: number;
  /**
   * All Topics
   * @example 0.5
   */
  all_topics: number;
  /**
   * Average
   * @example 0.5
   */
  average: number;
}

/** ReviewsCountItem */
export interface IReviewsCountItem {
  /**
   * Date
   * @format date
   */
  date: string;
  /** Source Site */
  source_site: string;
  /** Source Type */
  source_type: string;
  /** Count */
  count: number;
}

/** ReviewsCountResponse */
export interface IReviewsCountResponse {
  /** Items */
  items: IReviewsCountItem[];
}

/**
 * SentenceCountAggregate
 * An enumeration.
 */
export enum ISentenceCountAggregate {
  Month = 'month',
  Quarter = 'quarter',
}

/** SourceModel */
export interface ISourceModel {
  /** Id */
  id: number;
  /** Site */
  site: string;
  /** Source Type Id */
  source_type_id: number;
  /** Parser State */
  parser_state?: string;
  /**
   * Last Update
   * @format date-time
   */
  last_update?: string;
}

/**
 * SourceSitesEnum
 * An enumeration.
 */
export enum ISourceSitesEnum {
  BankiRu = 'banki.ru',
  BankiRuBroker = 'banki.ru/broker',
  BankiRuNews = 'banki.ru/news',
  BankiRuInsurance = 'banki.ru/insurance',
  BankiRuMfo = 'banki.ru/mfo',
  IrecommendRu = 'irecommend.ru',
  SravniRu = 'sravni.ru',
  SravniRuMfo = 'sravni.ru/mfo',
  SravniRuInsurance = 'sravni.ru/insurance',
  VkComComments = 'vk.com/comments',
  VkComOther = 'vk.com/other',
}

/** SourceTypesModel */
export interface ISourceTypesModel {
  /** Id */
  id: number;
  /** Name */
  name: string;
}

/** TextItem */
export interface ITextItem {
  /** Source Id */
  source_id: number;
  /**
   * Date
   * @format date-time
   */
  date: string;
  /** Title */
  title: string;
  /** Text */
  text: string;
  /** Bank Id */
  bank_id: number;
  /** Link */
  link: string;
  /** Comments Num */
  comments_num?: number;
}

/**
 * TopsisAggregateType
 * An enumeration.
 */
export enum ITopsisAggregateType {
  Average = 'average',
  AllTopics = 'all_topics',
  AllLetters = 'all_letters',
}

/**
 * TopsisCompanyType
 * An enumeration.
 */
export enum ITopsisCompanyType {
  Rspp = 'rspp',
  NonRspp = 'non_rspp',
}

/** ValidationError */
export interface IValidationError {
  /** Location */
  loc: any[];
  /** Message */
  msg: string;
  /** Error Type */
  type: string;
}

export interface IGetSentencesTextSentencesGetParams {
  /**
   * Sources
   * @example ["example.com"]
   */
  sources: string[];
  /** Model Id */
  model_id: number;
  /**
   * Limit
   * total values
   * @default 100
   */
  limit?: number;
}

export interface IGetAggregateTextResultViewsAggregateTextResultGetParams {
  /**
   * Bank Ids
   * Список id банков
   * @example [1]
   */
  bank_ids: number[];
  /**
   * Model Names
   * Список названий моделей
   * @example ["model"]
   */
  model_names: string[];
  /**
   * Source Type
   * Список типов источников
   * @example ["review"]
   */
  source_type: string[];
  /**
   * Start Year
   * Первый год рассматриваемого периода
   * @min 1970
   * @max 2024
   * @default 1970
   */
  start_year?: number;
  /**
   * End Year
   * Последний год рассматриваемого периода
   * @min 1970
   * @max 2024
   * @default 2024
   */
  end_year?: number;
  /**
   * Aggregate By Year
   * Типы агрегации год/квартал
   * @default false
   */
  aggregate_by_year?: boolean;
  /**
   * Тип индекса
   * @default "index_safe"
   */
  index_type?: IIndexTypeVal;
}

export interface IGetReviewsCountViewsReviewsCountGetParams {
  /** Список сайтов */
  source_sites: ISourceSitesEnum[];
  /**
   * Start Date
   * Начальная дата рассматриваемого периода
   * @format date
   * @default "1970-01-01"
   */
  start_date?: string;
  /**
   * End Date
   * Конечная дата рассматриваемого периода
   * @format date
   * @default "2024-05-12"
   */
  end_date?: string;
  /**
   * Тип агрегации
   * @default "month"
   */
  aggregate_by?: ISentenceCountAggregate;
}

export interface IGetTopsisTopsisTopsisGetParams {
  /**
   * Company Ids
   * @example [1]
   */
  company_ids: number[];
  /**
   * @uniqueItems true
   * @example ["average"]
   */
  aggregate_types: ITopsisAggregateType[];
  /**
   * Year Start
   * @min 1970
   * @max 2024
   * @default 1970
   * @example 2019
   */
  year_start?: number;
  /**
   * Year End
   * @min 1970
   * @max 2024
   * @default 2024
   * @example 2020
   */
  year_end?: number;
}

export interface IGetTopsisWithEsgTopsisTopsisEsgGetParams {
  /**
   * Company Ids
   * @example [1]
   */
  company_ids: number[];
  /**
   * @uniqueItems true
   * @example ["average"]
   */
  aggregate_types: ITopsisAggregateType[];
  /**
   * Year Start
   * @min 1970
   * @max 2024
   * @default 1970
   * @example 2019
   */
  year_start?: number;
  /**
   * Year End
   * @min 1970
   * @max 2024
   * @default 2024
   * @example 2020
   */
  year_end?: number;
}

export interface IGetTopsisCompaniesTopsisCompaniesGetParams {
  /** An enumeration. */
  company_type_name: ITopsisCompanyType;
}
