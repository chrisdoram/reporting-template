import { Provider } from 'react-redux'

import { store } from '@app/store'
import React from 'react'

export const withStore = (component: () => React.ReactNode) =>
  function getProvider() {
    return <Provider store={store}>{component()}</Provider>
  }
