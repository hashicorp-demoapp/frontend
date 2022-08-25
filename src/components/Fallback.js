import Image from 'next/image'

import ErrorIcon from '@hashicorp/flight-icons/svg/alert-triangle-24.svg'

export default function Fallback(props) {
  return (
    <div className="flex items-center justify-center w-full">
      {props.error ? (
        <div className={`${props.minHeight ? 'min-h-[280px]' : 'min-h-[180px]'} flex flex-col items-center justify-center text-black/75 dark:text-white/75 h-full`}>
          <Image src={ErrorIcon} className="opacity-50 dark:invert" unoptimized={true}/>
          <h4 className="mt-4">{props.message}</h4>
          <p className="text-sm opacity-75">Check the console for error messages</p>
        </div>
      ) : (
        <div className={`${props.minHeight ? 'min-h-[280px]' : 'min-h-[180px]'} flex justify-center items-center w-full h-full`}>
          <span className="animate-ping w-3 h-3 rounded-full bg-gray-200 dark:bg-white/25"></span>
        </div>
      )}
    </div>
  )
}
