import { useContext } from 'react'
import useSWR from 'swr'
import Link from 'next/link'
import Image from 'next/image'
import NumberFormat from 'react-number-format'

import AppContext from 'components/AppContext'
import Fallback from 'components/Fallback'

import CheckIcon from '@hashicorp/flight-icons/svg/check-circle-16.svg'
import FailIcon from '@hashicorp/flight-icons/svg/x-square-16.svg'

import { queryFetcher } from 'gql/apolloClient';
import { ALL_ORDERS_QUERY } from 'gql/gqlQueries';

export default function Orders() {
  const { data, error } = useSWR(ALL_ORDERS_QUERY, queryFetcher);

  // If data exists, set to orders object
  let orders;
  if (data) orders = data.data.orders

  return (
    <>
      <h2 className="font-semibold text-2xl sm:text-3xl leading-none sm:leading-tight sm:truncate">Order history</h2>

      <div className="flex flex-col flex-auto">
        {orders ? (
          <>
            {Object.keys(orders).length !== 0 ? (
              <ul className="flex flex-col w-full divide-y dark:divide-white/10">
                {orders.slice(0).reverse().map((order) => (
                  <Order key={order.id} id={order.id} items={order.items} />
                ))}
              </ul>
            ) : (
              <div className="flex items-center justify-center h-full bg-gray-100/75 dark:bg-black/25 border border-gray-200/50 dark:border-white/10 rounded-lg mt-6 mb-8">
                <p className="py-8 px-4 text-black/50 dark:text-white/50">No orders placed yet</p>
              </div>
            )}
          </>
        ) : (
          <div className="flex items-center justify-center h-full bg-gray-100/75 dark:bg-black/25 border border-gray-200/50 dark:border-white/10 rounded-lg mt-6 mb-8">
            <Fallback error={error} message="Unable to query orders" />
          </div>
        )}
      </div>
    </>
  )
}

function Order(props) {
  const state = useContext(AppContext);

  const orderClick = async (event) => {
    state.setAccountVisible(false)
  }

  const total = props.items.reduce((t, next) => {
    return t + (next.coffee.price * next.quantity)
  }, 0)

  let localOrder = {}

  // if order exists in localStorage, return payment information
  if (state.orders[props.id]) localOrder = state.orders[props.id]

  let hasPayment = false
  if (localOrder.payment) hasPayment = true

  return (
    <li className="flex flex-col xs:flex-row flex-1 xs:space-x-6 pt-6 pb-6">
      <Link href={`/order/${props.id}`}>
        <a onClick={orderClick}>
          <div className="flex items-center justify-center shadow-high dark:shadow-highlight bg-gray-100/25 dark:bg-black/10 rounded-lg w-[90px] h-[90px] mb-3 xs:mb-0 overflow-hidden">
            <div className="flex items-center justify-center -space-x-16">
              {props.items.map((item, index) => (
                <img key={index} className="relative flex-shrink-0" src={`/images/thumbnails${item.coffee.image}`} width={80} height={80} />
              ))}
            </div>
          </div>
        </a>
      </Link>
      <div className="flex flex-1 flex-col">
        <div className="flex items-center justify-between pb-2 pt-1">
          <Link href={`/order/${props.id}`}>
            <a onClick={orderClick} className="font-medium text-lg text-blue-500 dark:text-blue-400 underline hover:bg-blue-50 dark:hover:bg-blue-500/25 py-0.5 px-1 -mx-1 -my-0.5 rounded-lg transition">
              Order #{props.id}
            </a>
          </Link>
          <NumberFormat displayType={'text'} prefix="$" value={(total / 100).toFixed(2)} className="text-lg" />
        </div>

        <ul>
          {props.items.map((item, index) => (
            <li key={index} className="flex items-center justify-between text-sm">
              <span>{item.quantity} x {item.coffee.name}</span>
              <NumberFormat displayType={'text'} prefix="$" value={(item.coffee.price / 100).toFixed(2)} className="opacity-75" />
            </li>
          ))}
        </ul>

        {hasPayment && (
          <>
            <p className="flex space-x-2 pt-3">
              {localOrder.payment.message.includes("success") ? (
                <Image src={CheckIcon} className="icon-green" unoptimized={true}/>
              ) : (
                <Image src={FailIcon} className="icon-red" unoptimized={true}/>
              )}
              <span>{localOrder.payment.message.split(",")[0]}</span>
            </p>

            <p className="flex space-x-2 pb-4">
              {!localOrder.payment.card_ciphertext.includes("Disabled") ? (
                <Image src={CheckIcon} className="icon-green" unoptimized={true}/>
              ) : (
                <Image src={FailIcon} className="icon-red" unoptimized={true}/>
              )}
              <span>{localOrder.payment.card_ciphertext}</span>
            </p>

            <div className="flex flex-col items-start space-y-0 px-3 py-2 bg-gray-100/50 dark:bg-white/5 shadow-stroke dark:shadow-highlight rounded-lg">
              <p className="text-sm text-black/75 dark:text-white/75">Plain text card number</p>
              <NumberFormat className="font-mono" format="#### #### #### ####" value={localOrder.payment.card_plaintext} displayType="text" />
            </div>
          </>
        )}
      </div>
    </li>
  )
}