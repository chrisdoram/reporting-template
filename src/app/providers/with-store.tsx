import { Provider } from 'react-redux'

import { store } from '@app/store'
import React from 'react'

export const withStore = (component: () => React.ReactNode) => () =>
  <Provider store={store}>{component()}</Provider>
