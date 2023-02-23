import React from 'react'
import { Link } from 'react-router-dom'

import styles from './sidebar.module.css'

export const SideNav = () => {
  // get url, test if url matches link to, make color blue if true
  return (
    <nav className={styles.appShellNav}>
      <Link to="r/123/name" className={styles.navOption}>
        <div className={styles.navTextPrimary}>Report</div>
      </Link>
    </nav>
  )
}
