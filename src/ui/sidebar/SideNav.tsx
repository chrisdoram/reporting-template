import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useReportsQuery } from '@application/getReports'

import styles from './sidebar.module.css'

export const SideNav = () => {
  const location = useLocation()
  const { status, data, error } = useReportsQuery()
  return (
    <nav className={styles.appShellNav}>
      {data?.map((report) => {
        const active = location.pathname === `/r/${report.id}/${report.name}`
        return (
          <Link
            to={`r/${report.id}/${report.name}`}
            className={styles.navOption}
            key={report.id}
          >
            <div
              className={`${styles.navTextPrimary} ${
                active ? styles.navTextPrimaryActive : ''
              }`}
            >
              {report.name}
            </div>
          </Link>
        )
      })}
    </nav>
  )
}
