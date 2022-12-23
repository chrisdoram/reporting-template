import React from 'react'
import { Outlet } from 'react-router-dom'

const AppLayout = () => {
  return (
    <div>
      <header
        style={{
          top: 0,
          position: 'sticky',
          borderBottom: '1px solid var(--color-neutral-7)',
          height: '64px',
        }}
      >
        Header
      </header>
      <nav
        style={{
          position: 'absolute',
          top: 0,
          width: '260px',
          height: '100vh',
          marginTop: '64px',
          borderRight: '1px solid var(--color-neutral-7)',
        }}
      >
        Nav
      </nav>
      <main
        style={{
          marginLeft: '260px',
        }}
      >
        Main
        <Outlet />
      </main>
    </div>
  )
}

export default AppLayout
