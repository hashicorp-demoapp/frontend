import '../styles/globals.css'
import { ThemeProvider } from 'next-themes'
import withDarkMode from 'next-dark-mode'

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider attribute="class" themes={['dark', 'light', 'autoDark', 'autoLight']} value={{ dark: 'dark', light: 'light', autoDark: 'dark', autoLight: 'light' }}>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default withDarkMode(MyApp)
