import React, { useState, useRef, useMemo, useCallback } from 'react'
import { useParams } from 'react-router-dom'

import * as FlexLayout from 'flexlayout-react'

import { useReportQuery } from '@application/getReports'

import { Grid } from '@ui/grid'
import { useUpdateReportMutation } from '@application/saveReport'
import { useQueryClient } from '@tanstack/react-query'

export const Report = () => {
  const { id, name } = useParams()
  document.title = name ?? 'Reporting Template'
  // const { status, data, error } = useGridQuery()
  const queryClient = useQueryClient()
  const {
    status: reportStatus,
    data: reportData,
    error: reportError,
  } = useReportQuery(id ?? '-1')

  const updateReportMutation = useUpdateReportMutation(queryClient)

  // const [model, setModel] = useState(reportData?.model)

  const factory = (node: FlexLayout.TabNode) => {
    const gridId = node.getComponent()
    return <Grid id={gridId} />
  }

  return (
    <>
      {reportStatus === 'success' && (
        <FlexLayout.Layout
          model={FlexLayout.Model.fromJson(reportData.model)}
          // onModelChange={() => {}}
          factory={factory}
        />
      )}
    </>
  )
}
