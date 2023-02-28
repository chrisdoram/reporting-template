import React, { useState, useRef, useMemo, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { AgGridReact } from 'ag-grid-react'
import { GridOptions, RowClickedEvent } from 'ag-grid-community'
import * as FlexLayout from 'flexlayout-react'

import _json from '@lib/model.json'
import _data from '@lib/olympic-winners.json'

import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-balham.css'

interface IOlympic {
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

const json = _json as FlexLayout.IJsonModel
const data = _data as IOlympic[]

export const Report = () => {
  const { id, name } = useParams()
  const gridRef = useRef(null)
  const [model, setModel] = useState(FlexLayout.Model.fromJson(json))
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

  const factory = (node: FlexLayout.TabNode) => {
    return (
      <div
        className="ag-theme-balham"
        style={{ width: '100%', height: '100%' }}
      >
        <AgGridReact
          ref={gridRef}
          rowData={rowData}
          gridOptions={gridOptions}
        />
      </div>
    )
  }

  return <FlexLayout.Layout model={model} factory={factory} />
}
