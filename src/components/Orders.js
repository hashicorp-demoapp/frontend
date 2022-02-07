import axios from 'axios'
import useSWR from 'swr'
import Image from 'next/image'
import NumberFormat from 'react-number-format'

import CheckIcon from '@hashicorp/flight-icons/svg/check-circle-16.svg'
import FailIcon from '@hashicorp/flight-icons/svg/x-square-16.svg'

export default function Orders(props) {   
  const fetcher = async (url) => await axios.get(url).then((res) => res.data);
  const { data, error } = useSWR("/api/get-orders", fetcher);
  
  return (
    <>
      <h2 className="font-semibold text-2xl sm:text-3xl leading-none sm:leading-tight sm:truncate">Order history</h2>
      
      <div className="flex flex-col">
        {data ? (
          <ul className="flex flex-col w-full divide-y dark:divide-white/10">
            {data.map((order) => (
              <Order key={order.id} id={order.id} total={order.total} card={order.card} items={order.items} status={order.status[0]} encryption={order.encryption[0]} />
            ))}
          </ul>
        ) : (
          <p className="py-8">No orders</p>
        )}
      </div>
    </>
  )
}

function Order(props) {
  return (
    <li className="flex flex-col xs:flex-row flex-1 xs:space-x-6 pt-6 pb-8">
      <div className="flex items-center justify-center shadow-high dark:shadow-highlight bg-gray-100/25 dark:bg-black/10 rounded-lg w-[90px] h-[90px] mb-3 overflow-hidden">
        <div className="flex items-center justify-center -space-x-16">
          {props.items.map((item) => (
            <img key={item.coffee[0].id} className="relative flex-shrink-0" src={`/images/thumbnails${item.coffee[0].image}`} width={80} height={80} />
          ))}
        </div>
      </div>
      <div className="flex flex-1 flex-col pt-1">
        <div className="flex flex-1 justify-between pb-2">
          <span className="font-medium text-lg">Order #{props.id}</span>
          <NumberFormat displayType={'text'} prefix="$" value={(props.total/100).toFixed(2)} className="text-lg" />
        </div>
        
        <ul className="pb-4">
          {props.items.map((item) => (
            <li key={item.id} className="flex items-center justify-between text-sm">
              <span>{item.amount} x {item.coffee[0].name}</span>
              <NumberFormat displayType={'text'} prefix="$" value={(item.price/100).toFixed(2)} className="opacity-75" />
            </li>
          ))}
        </ul>
        
        <p className="flex space-x-2">
          {props.status.state == "success" ? (
            <Image src={CheckIcon} className="icon-green" />
          ) : (
            <Image src={FailIcon} className="icon-red" />
          )}
          <span>{props.status.message}</span>
        </p>
        
        <p className="flex space-x-2 pb-4">
          {props.encryption.state == "success" ? (
            <Image src={CheckIcon} className="icon-green" />
          ) : (
            <Image src={FailIcon} className="icon-red" />
          )}
          <span>{props.encryption.message}</span>
        </p>
        
        <div className="flex flex-col items-start space-y-0 px-3 py-2 bg-gray-100/50 dark:bg-white/5 shadow-stroke dark:shadow-highlight rounded-lg">
          <p className="text-sm text-black/75 dark:text-white/75">Plain text card number</p>
          <NumberFormat className="font-mono" format="#### #### #### ####" value={props.card} displayType="text" />
        </div>
      </div>
    </li>
  )
}