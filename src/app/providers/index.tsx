import compose from 'compose-function'

import { withContext } from '@app/providers/with-context'
import { withQueryRouter } from '@app/providers/with-query-router'
import { withStore } from '@app/providers/with-store'

// withQueryRouter has to come last here due to it's return type
export const withProviders = compose(withStore, withContext, withQueryRouter)
