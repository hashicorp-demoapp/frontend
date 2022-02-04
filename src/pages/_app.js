import '../styles/globals.css'
import { useState, useEffect } from 'react'
import { ThemeProvider } from 'next-themes'
import withDarkMode from 'next-dark-mode'

function MyApp({ Component, pageProps }) {
  const [cartVisible, setCartVisible] = useState(false);
  
  return (
    <ThemeProvider attribute="class" themes={['dark', 'light', 'autoDark', 'autoLight']} value={{ dark: 'dark', light: 'light', autoDark: 'dark', autoLight: 'light' }}>
      <Component {...pageProps} setCartVisible={setCartVisible} cartVisible={cartVisible} />
    </ThemeProvider>
  )
}

export default withDarkMode(MyApp)
