export interface IMoodRegistry {
  userId: number;
  date: Date;
  value: number;
  observations: string;
}

export interface IMoodRegistryBody {
  userId: number;
  date: Date;
  value: number;
  observations: string;
}
