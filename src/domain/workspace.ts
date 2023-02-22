// cardinal sin of clean architecture, domain depends on external lib
// this reporting tool is only to be used with flexlayout-react
import { Model } from 'flexlayout-react'

export type Workspace = {
  id: UniqueId
  model: Model
  description: string
  name: string
}
