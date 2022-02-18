import '../styles/globals.css'
import { useState, useEffect } from 'react'
import { ThemeProvider } from 'next-themes'
import withDarkMode from 'next-dark-mode'

import AppContext from 'components/AppContext'

import useLocalStorage from "../useLocalStorage";

function MyApp({ Component, pageProps }) {
  const [currentUser, setCurrentUser] = useLocalStorage("username", '');
  const [token, setToken] = useLocalStorage("token", '');
  const [isAuthed, setIsAuthed] = useLocalStorage("isAuthed", false);
  const [cart, setCart] = useLocalStorage("cart", {});
  const [orders, setOrders] = useLocalStorage("orders", {});
  const [cartVisible, setCartVisible] = useState(false);
  const [accountVisible, setAccountVisible] = useState(false);

  useEffect(() => {
    if (cart && Object.keys(cart).length !== 0) {
      setCartVisible(true)
    } else {
      setCartVisible(false)
    }
  })

  return (
    <ThemeProvider attribute="class" themes={['dark', 'light', 'autoDark', 'autoLight']} value={{ dark: 'dark', light: 'light', autoDark: 'dark', autoLight: 'light' }}>
      <AppContext.Provider
        value={{
          cart: cart,
          setCart: setCart,
          setCartVisible: setCartVisible,
          cartVisible: cartVisible,
          accountVisible: accountVisible,
          setAccountVisible: setAccountVisible,
          isAuthed: isAuthed,
          setIsAuthed: setIsAuthed,
          token: token,
          setToken: setToken,
          currentUser: currentUser,
          setCurrentUser: setCurrentUser,
          orders: orders,
          setOrders: setOrders,
        }}
      >
        <Component {...pageProps} />
      </AppContext.Provider>
    </ThemeProvider>
  )
}

export default withDarkMode(MyApp)
