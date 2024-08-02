export interface IStoreItem {
  size: number;
  quantity: number;
}

export interface IOrderItem {
  id: number;
  size: number[];
  masterSize?: string;
}

export interface IStats {
  size: number;
  quantity: number;
}

export interface IAssignment {
  id: number;
  size: number;
}

export interface IResult {
  stats: IStats[];
  assignment: IAssignment[];
  mismatches: number;
}
