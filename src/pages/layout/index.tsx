import React from 'react'
import { Outlet } from 'react-router-dom'
import { MdDarkMode } from 'react-icons/md'
import { GoLogoGithub, GoLinkExternal } from 'react-icons/go'
import { RxNotionLogo } from 'react-icons/rx'
import { RiArrowDropDownLine } from 'react-icons/ri'
import { HiPlus } from 'react-icons/hi'

import styles from './layout.module.css'

const AppLayout = () => {
  return (
    <div className={styles.appShell}>
      <header className={styles.appShellHeader}>
        <a href="/" className={styles.mainLogoAnchorContainer}>
          <RxNotionLogo size={42} className={styles.headerMainLogo} />
        </a>
        <button className={styles.recentAction}>
          <span>Recent</span>
          <RiArrowDropDownLine size={20} className={styles.dropdownIcon} />
        </button>
        <button className={styles.favoriteAction}>
          <span>Favorites</span>
          <RiArrowDropDownLine size={20} className={styles.dropdownIcon} />
        </button>
        <button className={styles.templateAction}>
          <span>Templates</span>
          <RiArrowDropDownLine size={20} className={styles.dropdownIcon} />
        </button>
        <button className={styles.createReportAction}>
          <HiPlus className={styles.plusIcon} />
        </button>
        <div className={styles.iconActionsContainer}>
          <a
            href="https://github.com/chrisdoram/reporting-template"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.githubAnchorContainer}
          >
            <GoLogoGithub className={styles.githubLogoLink} />
            <GoLinkExternal className={styles.externalLinkLogo} />
          </a>
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
            onKeyDown={(e) => {
              if (e.code == 'Enter') {
                const theme = localStorage.getItem('theme')
                if (theme == 'dark') {
                  localStorage.setItem('theme', 'light')
                  document.body.classList.remove('dark')
                } else {
                  localStorage.setItem('theme', 'dark')
                  document.body.classList.add('dark')
                }
              }
            }}
            tabIndex={0}
          >
            <MdDarkMode className={styles.themeToggle} />
          </div>
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
