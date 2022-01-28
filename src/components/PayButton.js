import { useEffect } from 'react'
import Image from 'next/image'

import ChevronsIcon from '@hashicorp/flight-icons/svg/chevrons-right-24.svg'

export default function PayButton(props) {
  const isVault = props.id == 3
    
  const handleClick = async (event) => {
    props.setPaymentFormIsVisible(true);
  };
  
  return (
    <button className={`${isVault ? 'text-black' : 'text-white'} relative flex items-center justify-between w-full h-[72px] px-8 text-left rounded-lg shadow-low group transition duration-500 ease-in-out overflow-hidden translate-x-0`} onClick={handleClick} style={{backgroundColor: `${props.color}`}}>
      <span className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-black/20 transition duration-500 ease-in-out rounded-lg mix-blend-overlay"></span>
      <span className="absolute left-0 top-0 bottom-0 w-1/2 bg-gradient-to-r from-white/0 via-white/20 to-white/0 shimmer"></span>
      <span className="relative uppercase tracking-widest text-lg">Purchase now</span>
      <span className={`${!isVault && 'invert'} flex items-center opacity-75 group-hover:opacity-100 group-hover:translate-x-[8px] transition duration-500 ease-in-out`}>
        <Image src={ChevronsIcon} />
      </span>
    </button>
  )
}
