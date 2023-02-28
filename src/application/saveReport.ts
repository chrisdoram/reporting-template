import { Report } from '@domain/report'
import { QueryClient, useMutation } from '@tanstack/react-query'
import axios from 'axios'

const updateReport = async (newReport: Report) => {
  const response = await axios<Report>({
    method: 'put',
    url: `http://localhost:3000/reports/${newReport.id}`,
    data: newReport,
  })
  return response.data
}

export function useUpdateReportMutation(queryClient: QueryClient) {
  return useMutation({
    mutationFn: (newReport) => updateReport(newReport),
    onMutate: async (newReport: Report) => {
      await queryClient.cancelQueries({ queryKey: ['reports'] })
      const prevReports = queryClient.getQueryData<Report[]>(['reports'])
      if (prevReports) {
        queryClient.setQueryData<Report[]>(['reports'], () => [
          ...prevReports.filter((report) => report.id !== newReport.id),
          newReport,
        ])
      }
      return { prevReports }
    },
    onError: (err, variables, context) => {
      if (context?.prevReports) {
        queryClient.setQueryData<Report[]>(['reports'], context.prevReports)
      }
    },
    onSettled: () => {
      void queryClient.invalidateQueries({ queryKey: ['reports'] })
    },
  })
}
