import { Grid } from '@domain/grid'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

const fetchGrid = async (id: string): Promise<Grid> => {
  const response = await axios.get<Grid>(`http://localhost:3000/grids/${id}`)
  return response.data
}

export function useGridQuery(id: string) {
  return useQuery({
    queryKey: ['grids', id],
    queryFn: () => fetchGrid(id),
  })
}
