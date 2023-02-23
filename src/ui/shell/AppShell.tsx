import React from 'react'

import { Header } from '@ui/header'
import { SideNav } from '@ui/sidebar'

type AppShellProps = {
  children: React.ReactNode
}

export const AppShell = ({ children }: AppShellProps) => {
  return (
    <>
      <Header />
      <section className="flex flex-grow">
        <SideNav />
        <main className="flexlayout-container">{children}</main>
      </section>
    </>
  )
}
