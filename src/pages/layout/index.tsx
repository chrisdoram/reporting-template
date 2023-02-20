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
    <>
      <header>
        <a href="/" className="flex-center">
          <RxNotionLogo data-logo />
        </a>
        <button className={`${styles.ml5} flex-center`}>
          <span>Recent</span>
          <RiArrowDropDownLine />
        </button>
        <button className="flex-center">
          <span>Favorites</span>
          <RiArrowDropDownLine />
        </button>
        <button className="flex-center">
          <span>Templates</span>
          <RiArrowDropDownLine />
        </button>
        <button className={`${styles.plusIconBtn} flex-center`}>
          <HiPlus />
        </button>
        <div className="flex-center">
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
              if (e.code == 'Enter' || e.code == 'Space') {
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
    </>
  )
}

export default AppLayout
