import React from 'react'
import { Outlet } from 'react-router-dom'
import { MdDarkMode } from 'react-icons/md'

import styles from './layout.module.css'

const AppLayout = () => {
  return (
    <div className={styles.appShell}>
      <header className={styles.appShellHeader}>
        <h1>Header</h1>
        <div
          className={styles.themeToggleContainer}
          onClick={() => {
            const theme = localStorage.getItem('theme')
            if (theme == 'dark') {
              localStorage.setItem('theme', 'light')
              document.body.classList.remove('dark')
            } else {
              localStorage.setItem('theme', 'dark')
              document.body.classList.add('dark')
            }
          }}
        >
          <MdDarkMode className={styles.themeToggle} />
        </div>
      </header>
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
