import axios from 'axios'
import useSWR from 'swr'
import Image from 'next/image'
import NumberFormat from 'react-number-format'

import CheckIcon from '@hashicorp/flight-icons/svg/check-circle-16.svg'
import FailIcon from '@hashicorp/flight-icons/svg/x-square-16.svg'

export default function Orders(props) {   
  const fetcher = async (url) => await axios.get(url).then((res) => res.data);
  const { data, error } = useSWR("/api/get-orders", fetcher);
   
  const dismiss = async (event) => {
    props.setOrdersVisible(false);
  };
  
  return (
    <>
      <div className={`${props.ordersVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'} fixed inset-0 bg-gray-600/10 dark:bg-black/25 z-50 transition duration-500 ease-in-out`} onClick={dismiss}></div>

      <div className={`${props.ordersVisible ? 'opacity-100 bg-white dark:bg-neutral-900 translate-x-0' : 'opacity-0 translate-x-[120px] pointer-events-none'} fixed top-0 right-0 bottom-0 w-[90%] max-w-[480px] pt-12 dark:text-white/90 shadow-high dark:shadow-highlight overflow-scroll transition duration-500 ease-in-out z-50`}>
      
        <div className="flex flex-col p-8 space-y-2 border-b border-gray-200 dark:border-white/10">
          <h1 className="font-semibold text-4xl sm:text-5xl leading-none sm:leading-tight sm:truncate">Order history</h1>
          <p className="text-black/75 dark:text-white/75 text-sm sm:text-base">Your previous coffee orders</p>
        </div>
        
        <div className="flex flex-col items-center px-8">
          {data ? (
            <ul className="flex flex-col w-full divide-y dark:divide-white/10">
              {data.map((order) => (
                <Order id={order.id} key={order.id} card={order.card} coffee={order.coffee[0]} status={order.status[0]} encryption={order.encryption[0]} />
              ))}
              {data.map((order) => (
                <Order id={order.id} key={order.id} card={order.card} coffee={order.coffee[0]} status={order.status[0]} encryption={order.encryption[0]} />
              ))}
            </ul>
          ) : (
            <p className="py-8">No orders</p>
          )}
        </div>
        
        <button className="absolute top-6 right-6 flex items-center justify-center px-4 h-10 border border-gray-500/25 dark:border-white/20 rounded-lg uppercase tracking-widest text-sm text-black/75 dark:text-white/75 hover:text-black/100 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-white/10 transition" onClick={dismiss}>
          Close
        </button>
      </div>
    </>
  )
}

function Order(props) {
  return (
    <li className="flex flex-col xs:flex-row flex-1 xs:space-x-6 pt-6 pb-8">
      <div className="flex items-center justify-center shadow-high dark:shadow-highlight bg-gray-100/25 dark:bg-black/10 rounded-lg w-[90px] h-[90px] mb-3">
        <img className="flex-shrink-0" src={`/images/thumbnails${props.coffee.image}`} width={80} height={80} />
      </div>
      <div className="flex flex-1 flex-col pt-1">
        <div className="flex flex-1 justify-between pb-2">
          <span className="font-medium text-lg">{props.coffee.name}</span>
          <NumberFormat displayType={'text'} format="$#.##" value={props.coffee.price} className="text-lg" />
        </div>
        <p className="flex space-x-2">
          <Image src={CheckIcon} className="icon-green" />
          <span>Payment processed successfully</span>
        </p>
        
        <p className="flex space-x-2 pb-4">
          <Image src={FailIcon} className="icon-red" />
          <span>Encryption is disabled</span>
        </p>
        
        <div className="flex flex-col items-start space-y-0 px-3 py-2 bg-gray-100/50 dark:bg-white/5 shadow-stroke dark:shadow-highlight rounded-lg">
          <p className="text-sm text-black/75 dark:text-white/75">Plain text card number</p>
          <NumberFormat className="font-mono" format="#### #### #### ####" value={props.card} displayType="text" />
        </div>
      </div>
    </li>
  )
}