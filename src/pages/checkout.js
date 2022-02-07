import axios from 'axios'
import useSWR from 'swr'
import { useState } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import NumberFormat from 'react-number-format'

import Header from 'components/Header'
import Footer from 'components/Footer'
import CoffeeMenu from 'components/CoffeeMenu'
import Cart from 'components/Cart'
import PaymentForm from 'components/PaymentForm'

import ChevronsIcon from '@hashicorp/flight-icons/svg/chevrons-right-24.svg'
import AvatarIcon from '@hashicorp/flight-icons/svg/user-circle-16.svg'

export default function Checkout(props) {
  const router = useRouter();
  
  const fetcher = async (url) => await axios.get(url).then((res) => res.data);
  const { data, error } = useSWR("/api/get-cart", fetcher);
    
  const dismiss = async (event) => {
    router.back()
  }
  
  const signIn = async (event) => {
    props.setAccountVisible(true)
  }
  
  const signOut = async (event) => {
    props.setIsAuthed(false)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header accountVisible={props.accountVisible} setAccountVisible={props.setAccountVisible} isAuthed={props.isAuthed} setIsAuthed={props.setIsAuthed} />

      <main className="relative flex flex-col items-center justify-center w-full flex-1 space-y-12 py-12 px-8 text-center z-30">
        <header className="flex items-center justify-between max-w-[1080px] w-full xs:px-8 space-x-4">
          <div className="flex flex-col text-left space-y-2">
            <h1 className="font-semibold text-4xl sm:text-5xl leading-none sm:leading-tight sm:truncate">Checkout</h1>
            <p className="text-black/75 dark:text-white/75 text-sm sm:text-base">Review and pay for your order <span className="opacity-50">(except not really)</span></p>
          </div>
          
          <button className="flex items-center justify-center px-4 h-10 border border-gray-500/25 dark:border-white/20 rounded-lg uppercase tracking-widest text-sm text-black/75 dark:text-white/75 hover:text-black/100 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-white/10 transition" onClick={dismiss}>
            <span>Cancel</span>
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
        
        <section className="relative max-w-[1080px] w-full bg-white dark:bg-[#0B0B0B] rounded-xl shadow-high dark:shadow-highlight p-8">
          {props.isAuthed ? (
            <div className="flex items-center justify-between">
              <p className="flex flex-col xs:flex-row xs:items-center text-black/75 dark:text-white/75 text-sm sm:text-base">
                <span className="mr-2">Signed in as</span>
                <span className="inline-flex">
                  <span className="flex items-center mr-1 opacity-75"><Image src={AvatarIcon} className="dark:invert" /></span>
                  <b>dizzyup</b>
                </span>
              </p>
              <button onClick={signOut} className="relative whitespace-nowrap text-black/50 dark:text-white/50 hover:text-red-600 dark:hover:text-red-500 hover:bg-red-600/10 rounded-md px-2 py-1 -mx-2 -mx-1 uppercase text-[11px] tracking-widest text-center transition">Sign out</button>
            </div>
          ) : (
            <button onClick={signIn} className="bg-black/90 dark:bg-white/90 hover:bg-black dark:hover:bg-white text-white dark:text-black/75 shadow-subtle relative flex items-center justify-between w-full h-[72px] px-8 text-left text-white rounded-lg  group transition duration-500 ease-in-out overflow-hidden translate-x-0">
              <span className="absolute left-0 top-0 bottom-0 w-1/2 bg-gradient-to-r from-white/0 via-white/20 dark:via-white/75 to-white/0 shimmer transition ease-in-out"></span>
              <span className="uppercase tracking-widest leading-tight text-lg">Sign in to checkout</span>
              <span className="flex items-center invert dark:invert-0 group-hover:translate-x-[8px] transition duration-500 ease-in-out">
                <Image src={ChevronsIcon} />
              </span>
            </button>
          )}
          
        </section>
        
        {props.isAuthed && (
          <section className="relative max-w-[1080px] w-full bg-white dark:bg-[#0B0B0B] rounded-xl shadow-high dark:shadow-highlight">
            <PaymentForm />
          </section>
        )}
      </main>

      <Footer />
    </div>
  )
}
