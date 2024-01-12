export interface IHabit {
  id: number;
  name: string;
  isBoolean: Boolean;
  weight: number;
  createdAt: Date;
  userId: number;
  weekDays: number[];
}
export interface IHabitBody {
  name: string;
  isBoolean: Boolean;
  weight: number;
  userId: number;
  weekDays: number[];
}
export interface IHabitRegistry {
  habitId: number;
  date: Date;
  value: number;
}

export interface IHabitRegistryBody {
  habitId: number;
  date: string;
  value: number;
}
