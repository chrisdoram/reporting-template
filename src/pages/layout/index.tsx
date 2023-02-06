import React from 'react'
import { Outlet } from 'react-router-dom'

import styles from './layout.module.css'

const AppLayout = () => {
  return (
    <div className={styles.appShell}>
      <header className={styles.appShellHeader}>Header</header>
      <section className={styles.appShellBody}>
        <nav className={styles.appShellNav}>Side Nav</nav>
        <main className={styles.appShellMain}>
          <Outlet />
        </main>
      </section>
    </div>
  )
}

export default AppLayout
