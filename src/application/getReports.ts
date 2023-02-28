import { useCallback } from 'react'
import { Report, DBReport } from '@domain/report'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { IJsonModel } from 'flexlayout-react'

const deserializeModel = (data: DBReport): Report => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const deserializedModel: IJsonModel = JSON.parse(data.model)
  return { ...data, model: deserializedModel }
}

const fetchReports = async (): Promise<DBReport[]> => {
  const response = await axios.get<DBReport[]>(
    'http://localhost:3000/users/0/reports'
  )
  return response.data
}

export function useReportsQuery() {
  return useQuery({
    queryKey: ['reports'],
    queryFn: fetchReports,
    select: useCallback<(data: DBReport[]) => Report[]>(
      (data) => data.map((dbReport) => deserializeModel(dbReport)),
      []
    ),
  })
}

const fetchReport = async (id: string): Promise<DBReport> => {
  const response = await axios.get<DBReport>(
    `http://localhost:3000/reports/${id}`
  )
  return response.data
}

export function useReportQuery(id: string) {
  return useQuery({
    queryKey: ['reports', id],
    queryFn: () => fetchReport(id),
    select: deserializeModel,
  })
}
