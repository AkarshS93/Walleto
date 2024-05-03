import React from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import { LocalProvider } from '../../../utils/context'

const Layout = ({children}) => {
  return (
    <LocalProvider>
      <main>
        <Header />
        {children}
        <Footer />
      </main>
    </LocalProvider>
  )
}

export default Layout