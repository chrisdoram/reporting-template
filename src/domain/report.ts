// cardinal sin of clean architecture, domain depends on external lib
// this reporting tool is only to be used with flexlayout-react
import { IJsonModel } from 'flexlayout-react'

export type Report = {
  id: UniqueId
  userId: string
  model: IJsonModel
  description: string
  name: string
}
