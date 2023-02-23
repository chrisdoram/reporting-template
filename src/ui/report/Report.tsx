import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import * as FlexLayout from 'flexlayout-react'

const json: FlexLayout.IJsonModel = {
  global: { tabEnableClose: false },
  borders: [],
  layout: {
    type: 'row',
    weight: 100,
    children: [
      {
        type: 'tabset',
        weight: 50,
        selected: 0,
        children: [
          {
            type: 'tab',
            name: 'One',
            component: 'text',
          },
        ],
      },
      {
        type: 'tabset',
        weight: 50,
        selected: 0,
        children: [
          {
            type: 'tab',
            name: 'Two',
            component: 'text',
          },
          {
            type: 'tab',
            name: 'Three',
            component: 'text',
          },
        ],
      },
    ],
  },
}

export const Report = () => {
  const { id, name } = useParams()
  const [model, setModel] = useState(FlexLayout.Model.fromJson(json))
  const factory = (node: FlexLayout.TabNode) => {
    const component = node.getComponent()
    if (component === 'button') {
      return <button>{node.getName()}</button>
    }
  }

  return <FlexLayout.Layout model={model} factory={factory} />
}
