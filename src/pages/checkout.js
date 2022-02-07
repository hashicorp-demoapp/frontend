import axios from 'axios'
import useSWR from 'swr'
import { useState } from 'react'
import { useRouter } from 'next/router'
import NumberFormat from 'react-number-format'

import Header from 'components/Header'
import Footer from 'components/Footer'
import CoffeeMenu from 'components/CoffeeMenu'
import Cart from 'components/Cart'
import PaymentForm from 'components/PaymentForm'

export default function Checkout(props) {
  const router = useRouter();
  
  const fetcher = async (url) => await axios.get(url).then((res) => res.data);
  const { data, error } = useSWR("/api/get-cart", fetcher);
  
  const [hasPaid, setHasPaid] = useState(false);
  const [paymentFormIsVisible, setPaymentFormIsVisible] = useState(true);
  
  const dismiss = async (event) => {
    router.back()
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header accountVisible={props.accountVisible} setAccountVisible={props.setAccountVisible} isAuthed={props.isAuthed} setIsAuthed={props.setIsAuthed} />

      <main className="relative flex flex-col items-center justify-center w-full flex-1 space-y-12 py-12 px-8 text-center z-30">
        <header className="flex items-center justify-between max-w-[1080px] w-full xs:px-8 space-x-4">
          <div className="flex flex-col text-left space-y-2">
            <h1 className="font-semibold text-4xl sm:text-5xl leading-none sm:leading-tight capitalize sm:truncate">Checkout</h1>
            <p className="text-black/75 dark:text-white/75 text-sm sm:text-base">Review and pay for your order <span className="opacity-50">(except not really)</span></p>
          </div>
          
          <button className="flex items-center justify-center px-4 h-10 border border-gray-500/25 dark:border-white/20 rounded-lg uppercase tracking-widest text-sm text-black/75 dark:text-white/75 hover:text-black/100 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-white/10 transition" onClick={dismiss}>
            {hasPaid ? (
              <span>Done</span>
            ) : (
              <span>Cancel</span>
            )}
          </button>
        </header>
      
        <section className="relative max-w-[1080px] w-full bg-white dark:bg-[#0B0B0B] rounded-xl shadow-high dark:shadow-highlight pt-2 overflow-hidden">
          <Cart cartVisible={true} isInline={true} />
          
          {data && (
            <div className="flex flex-col items-start bg-gray-50 dark:bg-black/25 border-t border-gray-100 dark:border-white/10 mt-2 px-8 py-4">
              <p className="text-black/75 dark:text-white/75 text-sm sm:text-base">Total to pay</p>
              <p className="text-black/75 dark:text-white/75 font-semibold text-2xl sm:text-4xl"><NumberFormat displayType={'text'} prefix="$" value={(data[0].total/100).toFixed(2)} /></p>
            </div>
          )}
        </section>
        
        <section className="relative max-w-[1080px] w-full bg-white dark:bg-[#0B0B0B] rounded-xl shadow-high dark:shadow-highlight">
          <PaymentForm hasPaid={hasPaid} setHasPaid={setHasPaid} paymentFormIsVisible={paymentFormIsVisible} setPaymentFormIsVisible={setPaymentFormIsVisible} />
        </section>
      </main>

      <Footer />
    </div>
  )
}
