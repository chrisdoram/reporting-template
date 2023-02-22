import React from 'react'
import { MdDarkMode } from 'react-icons/md'
import { GoLogoGithub, GoLinkExternal } from 'react-icons/go'
import { RxNotionLogo } from 'react-icons/rx'
import { RiArrowDropDownLine } from 'react-icons/ri'
import { HiPlus } from 'react-icons/hi'

import { useSetTheme } from '@application/setTheme'

import styles from './header.module.css'

const Header = () => {
  const { theme, setTheme } = useSetTheme()

  const toggleTheme = () => {
    if (theme === 'dark') {
      setTheme('light')
    } else {
      setTheme('dark')
    }
  }

  return (
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
          className={`${styles.themeToggleContainer} theme-toggle`}
          onClick={toggleTheme}
          onKeyDown={(e) => {
            if (e.code == 'Enter' || e.code == 'Space') {
              toggleTheme()
            }
          }}
          tabIndex={0}
        >
          <MdDarkMode className={styles.themeToggle} />
        </div>
      </div>
    </header>
  )
}

export default Header
