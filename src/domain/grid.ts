export type Grid = {
  id: UniqueId
  reportId: string
}

export interface IOlympic {
  athlete: string
  age: number
  country: string
  year: number
  date: string
  sport: string
  gold: number
  silver: number
  bronze: number
  total: number
}
