import axios from 'axios'
import useSWR from 'swr'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import NumberFormat from 'react-number-format'

import Header from 'components/Header'
import Footer from 'components/Footer'

import CheckIcon from '@hashicorp/flight-icons/svg/check-circle-16.svg'
import FailIcon from '@hashicorp/flight-icons/svg/x-square-16.svg'

export default function Coffee(props) {
  const router = useRouter();
  const { id } = router.query
  
  const fetcher = async (url) => await axios.get(url).then((res) => res.data);
  const { data, error } = useSWR(() => '/api/get-order/' + id, fetcher);
  
  const dismiss = async (event) => {
    router.back()
  }
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header accountVisible={props.accountVisible} setAccountVisible={props.setAccountVisible} isAuthed={props.isAuthed} setIsAuthed={props.setIsAuthed} />
      
      <main className="relative flex flex-col items-center justify-center w-full flex-1 space-y-12 py-12 px-8 text-center z-30">
        {data && (
          <>
            <header className="flex items-center items-start max-w-[1080px] w-full xs:px-8 space-x-4">
              <div className="flex flex-col text-left space-y-2">
                <h1 className="font-semibold text-4xl sm:text-5xl leading-none sm:leading-tight sm:truncate">Order confirmation</h1>
                <p className="text-black/75 dark:text-white/75 text-sm sm:text-base">(Order confirmed, but no payment was taken, because this is just a demo)</p>
              </div>
            </header>
          
            <section className="relative max-w-[1080px] w-full bg-white dark:bg-[#0B0B0B] rounded-xl shadow-high dark:shadow-highlight">
            
              <div className="flex items-center justify-center bg-gray-100/25 dark:bg-black/10 border-b border-gray-100 dark:border-white/10 mb-3 overflow-hidden">
                <div className="flex items-center justify-center -space-x-36">
                  {data.items.map((item) => (
                    <img key={item.coffee[0].id} className="relative flex-shrink-0" src={`/images/thumbnails${item.coffee[0].image}`} width={200} height={200} />
                  ))}
                </div>
              </div>
              
              <div className="flex flex-1 flex-col items-start px-8 pt-4 pb-8">
                <p className="font-semibold text-2xl sm:text-4xl pb-6">Order #{data.id}</p>
                
                <div className="flex flex-col items-start space-y-2 mb-5 w-full">
                  <p className="text-black/75 dark:text-white/75">Items</p>
                  <ul className="w-full">
                    {data.items.map((item) => (
                      <li key={item.id} className="flex items-center justify-between border-b border-dashed border-gray-200 dark:border-white/20 last:border-none py-3">
                        <span>{item.amount} x {item.coffee[0].name}</span>
                        <NumberFormat displayType={'text'} prefix="$" value={(item.price/100).toFixed(2)} className="opacity-75" />
                      </li>
                    ))}
                  </ul>
                  <NumberFormat displayType={'text'} prefix="$" value={(data.total/100).toFixed(2)} className="self-end font-semibold text-2xl sm:text-4xl" />
                </div>
                
                <div className="flex flex-col xs:flex-row xs:space-x-6 space-y-6 xs:space-y-0 w-full">
                  <div className="flex flex-col items-start space-y-1 px-6 py-4 bg-gray-100/50 dark:bg-white/5 shadow-stroke dark:shadow-highlight rounded-lg">
                    <p className="text-black/75 dark:text-white/75">Plain text card number</p>
                    <NumberFormat className="font-mono" format="#### #### #### ####" value={data.card} displayType="text" />
                  </div>
                
                  <div className="flex flex-col items-start space-y-1 px-6 py-4 dark:bg-white/5 shadow-stroke dark:shadow-highlight rounded-lg">
                    <p className="text-black/75 dark:text-white/75">Status</p>
                    <p className="flex space-x-3 text-base">
                      {data.status[0].state == "success" ? (
                        <Image src={CheckIcon} className="icon-green" />
                      ) : (
                        <Image src={FailIcon} className="icon-red" />
                      )}
                      <span>{data.status[0].message}</span>
                    </p>
                  </div>
                  
                  <div className="flex flex-col items-start space-y-1 px-6 py-4 dark:bg-white/5 shadow-stroke dark:shadow-highlight rounded-lg">
                    <p className="text-black/75 dark:text-white/75">Encryption Status</p>
                    <p className="flex space-x-3 text-base">
                      {data.encryption[0].state == "success" ? (
                        <Image src={CheckIcon} className="icon-green" />
                      ) : (
                        <Image src={FailIcon} className="icon-red" />
                      )}
                      <span>{data.encryption[0].message}</span>
                    </p>
                  </div>
                </div>
                
                <p className="text-black/75 dark:text-white/75 text-sm mt-6 text-left">Card details returned for demo purposes, not for production.</p>
              </div>
              
            </section>
          </>
        )}
      </main>  
    
      <Footer />
    </div>    
  )
}