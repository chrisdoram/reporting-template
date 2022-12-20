// If we have very small amounts of global state such as workspaceId
// it might be better to implement a simple provider pattern to supply this value to the components
import React, { useState, createContext, useContext } from 'react'

type CustomContextStore = { workspaceId: string | null }

type CustomContextType = {
  store: CustomContextStore
  updateWorkspaceId: (wsId: string) => void
}

const CustomContext = createContext<CustomContextType | null>(null)

export const useCustomData = (): CustomContextType => {
  const contextState = useContext(CustomContext)
  if (contextState === null) {
    throw new Error('useCustomData must be used within a CustomProvider tag')
  }
  return contextState
}

const CustomProvider: React.FC<{ children: React.ReactNode }> = (props) => {
  const [store, setStore] = useState<CustomContextStore>({ workspaceId: null })
  const updateWorkspaceId = (id: string) => {
    setStore((prev) => {
      return { ...prev, workspaceId: id }
    })
  }
  return (
    <CustomContext.Provider value={{ store, updateWorkspaceId }}>
      {props.children}
    </CustomContext.Provider>
  )
}

export const withContext = (component: () => React.ReactNode) =>
  function getCustomProvider() {
    return <CustomProvider>{component()}</CustomProvider>
  }
