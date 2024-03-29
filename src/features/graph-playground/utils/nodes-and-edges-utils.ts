import { Node } from 'reactflow';

export type IScorecardLevel = 'GOLD' | 'SILVER' | 'BRONZE' | null;
export type ISourceType = 'API' | 'APM' | 'AWS' | 'YAML' | null;
export enum SourceType {
  API = 'API',
  APM = 'APM',
  AWS = 'AWS',
  YAML = 'YAML',
}

export type NodeBaseRequiredData = {
  sourceType: ISourceType;
  resourceType: string | null;
  scorecardLevel: IScorecardLevel;
};

export type NodeBase<T> = Node<NodeBaseRequiredData & T>;
