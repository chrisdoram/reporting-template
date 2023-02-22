import React from 'react'

import Header from '@ui/header'
import Navigation from '@ui/sidebar'

type AppShellProps = {
  children: React.ReactNode
}

const AppShell = ({ children }: AppShellProps) => {
  return (
    <>
      <Header />
      <section className="flex">
        <Navigation />
        <main>{children}</main>
      </section>
    </>
  )
}

export default AppShell
