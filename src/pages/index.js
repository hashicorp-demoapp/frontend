import Header from 'components/Header'
import Footer from 'components/Footer'
import CoffeeMenu from 'components/CoffeeMenu'
import Cart from 'components/Cart'

export default function Home(props) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header accountVisible={props.accountVisible} setAccountVisible={props.setAccountVisible} isAuthed={props.isAuthed} setIsAuthed={props.setIsAuthed} />

      <main className="flex flex-col items-center justify-center w-full flex-1 text-center">
        <CoffeeMenu isHero={true} />
      </main>

      <Footer />

      <Cart isSticky={true} cartVisible={props.cartVisible} setCartVisible={props.setCartVisible} />
    </div>
  )
}
