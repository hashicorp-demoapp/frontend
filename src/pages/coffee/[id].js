import axios from 'axios'
import useSWR from 'swr'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import NumberFormat from 'react-number-format'

import Header from 'components/Header'
import Footer from 'components/Footer'
import CoffeeMenu from 'components/CoffeeMenu'
import CartButton from 'components/CartButton'
import Cart from 'components/Cart'

import PrevIcon from '@hashicorp/flight-icons/svg/chevron-left-24.svg'
import NextIcon from '@hashicorp/flight-icons/svg/chevron-right-24.svg'
import MinusIcon from '@hashicorp/flight-icons/svg/minus-circle-24.svg'
import PlusIcon from '@hashicorp/flight-icons/svg/plus-circle-24.svg'

export default function Coffee(props) {
  const router = useRouter();
  const { id } = router.query
  
  const prev_id = id - 1
  const next_id = parseInt(id) + 1
  
  const [amount, setAmount] = useState(1)
  
  const incCoffeeCount = () => {
    const count = amount;
    if (count <= 10) {
      setAmount(count + 1)
    }
  };
  
  const decCoffeeCount = () => {
    const count = amount;
    if (count > 1) {
      setAmount(count - 1)
    }
  };
  
  const fetcher = async (url) => await axios.get(url).then((res) => res.data);
  const { data, error } = useSWR(() => '/api/get-coffee/' + id, fetcher);
  
  const { prev, prevError } = useSWR(() => '/api/get-coffee/' + prev_id, fetcher);
  const { next, nextError } = useSWR(() => '/api/get-coffee/' + next_id, fetcher);
  
  useEffect(() => {
    setAmount(1)
  }, [router.asPath])
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header accountVisible={props.accountVisible} setAccountVisible={props.setAccountVisible} isAuthed={props.isAuthed} setIsAuthed={props.setIsAuthed} />
      
      <CoffeeMenu isActive={id} />
    
      <main className="relative flex items-center justify-center w-full flex-1 py-12 px-8 text-center z-30">
      
        <PrevCoffee id={id} />
        
        <section className="relative flex flex-col md:flex-row flex-shrink-0 max-w-[1080px] w-full md:h-[640px] bg-white dark:bg-[#0B0B0B] rounded-xl shadow-high dark:shadow-highlight overflow-hidden z-20">
          {data ? (
            <>
              <aside className={`${props.paymentFormIsVisible ? 'translate-y-[-85px] md:translate-y-0' : 'bg-gray-50 dark:bg-transparent md:bg-transparent'} relative flex items-center justify-center md:w-2/5 xl:w-1/2 h-[250px] md:h-full md:overflow-hidden z-10 transition duration-500 ease-in-out`}>
                <img className={`${props.paymentFormIsVisible && 'md:translate-x-[-33%]'} scale-50 translate-y-[-40px] md:translate-y-[-10px] md:scale-100 max-w-min transition duration-500 ease-in-out`} src={`/images${data.image}`} width={800} height={800} />
              </aside>
              
              <article className={`${props.paymentFormIsVisible ? 'opacity-0 translate-x-[20px]' : 'opacity-100'} relative flex flex-col justify-between w-full md:w-3/5 xl:w-1/2 p-6 space-y-4 md:space-y-0 text-left md:bg-gradient-to-r from-gray-50 dark:from-black/50 via-white dark:via-black/0 to-white dark:to-black/0 dark:text-white/90 shadow-crease dark:shadow-darkCrease md:shadow-fold dark:md:shadow-darkFold transition duration-500 ease-in-out z-20`}>
              
                <div className="flex flex-col md:p-8 md:pt-4 space-y-2">
                  <h1 className="font-semibold text-4xl sm:text-5xl leading-none sm:leading-tight capitalize sm:truncate">{data.name}</h1>
                  <p className="text-black/75 dark:text-white/75 text-sm sm:text-base">{data.teaser}</p>
                </div>
                
                <div className="flex flex-col md:px-8">
                  <dl className="grid sm:grid-cols-3">
                    <dt className="text-black/75 dark:text-white/75 text-sm sm:border-b border-gray-200 dark:border-white/10 sm:py-2 pt-2 sm:pt-3">Collection</dt>
                    <dd className="text-lg col-span-2 border-b border-gray-200 dark:border-white/10 py-2 pt-0 sm:pt-2">{data.collection}</dd>
                    <dt className="text-black/75 dark:text-white/75 text-sm sm:border-b border-gray-200 dark:border-white/10 sm:py-2 pt-4 sm:pt-3">Origin</dt>
                    <dd className="text-lg col-span-2 border-b border-gray-200 dark:border-white/10 py-2 pt-0 sm:pt-2">{data.origin}</dd>
                    <dt className="text-black/75 dark:text-white/75 text-sm sm:py-2 pt-4 sm:pt-3">Ingredients</dt>
                    <dd className="col-span-2 py-2 pt-2.5">
                      <span className="block line-clamp-1">20ml Espresso</span>
                      <span className="block line-clamp-1">30ml Semi Skimmed Milk</span>
                    </dd>
                  </dl>
                </div>
                
                <div className="flex flex-col xs:flex-row w-full xs:space-x-4 space-y-4 xs:space-y-0 pt-8">
                  <p className="flex xs:w-1/2 py-3 items-center justify-between font-semibold tracking-tight bg-gray-200/25 dark:bg-white/10 rounded-lg select-none">
                    <CountButton action={decCoffeeCount} icon={MinusIcon} disabled={amount == 1} />
                    <span className="text-2xl lg:text-4xl">
                      <NumberFormat displayType={'text'} prefix="$" value={((data.price/100).toFixed(2) * amount).toFixed(2)} />
                    </span>
                    <CountButton action={incCoffeeCount} icon={PlusIcon} disabled={amount == 10} />
                  </p>
                  <CartButton color={data.color} id={data.id} amount={amount} setCartVisible={props.setCartVisible} />
                </div>
                
              </article>
            </>
          ) : (
            <div className="flex justify-center items-center w-full h-full min-h-[280px]">
              <span className="animate-ping w-3 h-3 rounded-full bg-gray-200 dark:bg-white/25"></span>
            </div>
          )}
        </section>
        
        <NextCoffee id={id} />
        
      </main>  
    
      <Footer />
      
      <Cart isSticky={true} cartVisible={props.cartVisible} setCartVisible={props.setCartVisible} />
    </div>    
  )
}

function CountButton(props) {
  return (
    <button onClick={props.action} className={`${props.disabled ? 'opacity-0 pointer-events-none' : 'opacity-50 hover:opacity-75 active:opacity-100'} flex items-center px-3 select-none flex-shrink-0 transition dark:invert`}><Image src={props.icon} /></button>
  )
}

function PrevCoffee(props) {
  const prev_id = parseInt(props.id) - 1
  
  const fetcher = async (url) => await axios.get(url).then((res) => res.data);
  const { data, error } = useSWR(() => '/api/get-coffee/' + prev_id, fetcher);
  
  return (
    <div className="hidden 2xl:flex flex-1 flex-col items-center justify-center relative -mx-8 h-full overflow-hidden">
      {data ? (
        <HoverLink id={prev_id} image={data.image} icon={PrevIcon} direction="prev" />
      ) : (
        <div />
      )}
    </div>
  )
}

function NextCoffee(props) {
  const next_id = parseInt(props.id) + 1
  
  const fetcher = async (url) => await axios.get(url).then((res) => res.data);
  const { data, error } = useSWR(() => '/api/get-coffee/' + next_id, fetcher);
  
  return (
    <div className="hidden 2xl:flex flex-1 flex-col items-center justify-center relative -mx-8 h-full overflow-hidden">
      {data ? (
        <HoverLink id={next_id} image={data.image} icon={NextIcon} direction="next" />
      ) : (
        <div></div>
      )}
    </div>
  )
}

function HoverLink(props) {
  return (
    <Link href={`/coffee/${props.id}`} scroll={false}>
      <a className="relative group">
        <span className={`${props.direction == 'next' ? 'translate-x-[-10px]' : 'translate-x-[10px]'} absolute left-1/2 top-1/2 w-16 h-16 -ml-8 -mt-8 flex items-center justify-center bg-black/75 backdrop-blur-md shadow-high rounded-full opacity-0 group-hover:opacity-100 scale-95 group-hover:scale-100 group-hover:translate-x-0 z-20 transition duration-500 ease-in-out`}>
          <Image src={props.icon} className="invert" />
        </span>
        <img className="relative max-w-min transition duration-500 ease-in-out opacity-50 group-hover:opacity-75" src={`/images${props.image}`} width={640} height={640} />
      </a>
    </Link>
  )
}