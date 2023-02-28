import React, { useState, useMemo, useRef, useCallback } from 'react'
import { AgGridReact } from 'ag-grid-react'
import { GridOptions, RowClickedEvent } from 'ag-grid-community'

import { IOlympic } from '@domain/grid'
import { useGridQuery } from '@application/getGrids'
import _data from '@lib/olympic-winners.json'

import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-balham.css'

const data = _data as IOlympic[]

interface GridProps {
  id: string | undefined
}

export const Grid = (props: GridProps) => {
  const { id } = props
  const { status, data: gridData, error } = useGridQuery(id ?? '-1')
  const gridRef = useRef(null)
  const [rowData, setRowData] = useState(data)

  const gridOptions: GridOptions<IOlympic> = {
    columnDefs: useMemo(() => {
      return [
        { field: 'athlete' },
        { field: 'age' },
        { field: 'country' },
        { field: 'year' },
        { field: 'date' },
        { field: 'sport' },
        { field: 'gold' },
        { field: 'silver' },
        { field: 'bronze' },
        { field: 'total' },
      ]
    }, []),
    onRowClicked: useCallback<(event: RowClickedEvent<IOlympic>) => void>(
      (event) => {
        if (event.data) {
          const age = event.data.age
          window.alert(`${age}`)
        }
      },
      []
    ),
  }
  return (
    <div className="ag-theme-balham" style={{ width: '100%', height: '100%' }}>
      <AgGridReact ref={gridRef} rowData={rowData} gridOptions={gridOptions} />
    </div>
  )
}
