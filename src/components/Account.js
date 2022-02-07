import axios from 'axios'
import useSWR from 'swr'
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import NumberFormat from 'react-number-format'

import Field from 'components/Field'
import Orders from 'components/Orders'

import ChevronsIcon from '@hashicorp/flight-icons/svg/chevrons-right-24.svg'
import AvatarIcon from '@hashicorp/flight-icons/svg/user-circle-16.svg'

export default function Account(props) {
  const router = useRouter();
  
  const timer = useRef(null);
  
  const [isCreatingAccount, setIsCreatingAccount] = useState(false)
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
   
  const dismiss = async (event) => {
    props.setAccountVisible(false);
  };
  
  const switchToNewAccount = async (event) => {
    setIsCreatingAccount(true);
  };
  
  const switchToSignIn = async (event) => {
    setIsCreatingAccount(false);
  };
  
  const signIn = async (event) => {
    event.preventDefault();
    
    if (router.pathname == '/checkout') {
      props.setAccountVisible(false)
      
      timer.current = setTimeout(() => {
        props.setIsAuthed(true);
      }, 500);
    } else {
      props.setIsAuthed(true);
    }
  };

  const signOut = async (event) => {
    event.preventDefault();
    props.setIsAuthed(false);
  };
  
  const signinComplete = username != "" && password != '';
  const signupComplete = username != "" && password != '' && confirmPassword != '';
  
  useEffect(() => {
    return () => clearTimeout(timer.current);
  }, []);
  
  return (
    <>
      <div className={`${props.accountVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'} fixed inset-0 bg-gray-600/10 dark:bg-black/25 z-50 transition duration-500 ease-in-out`} onClick={dismiss}></div>

      <div className={`${props.accountVisible ? 'opacity-100 bg-white dark:bg-neutral-900 translate-x-0' : 'opacity-0 translate-x-[120px] pointer-events-none'} fixed top-0 right-0 bottom-0 w-[90%] max-w-[480px] pt-12 dark:text-white/90 shadow-high dark:shadow-highlight overflow-scroll transition duration-500 ease-in-out z-50`}>
      
        <div className="flex flex-col p-8 space-y-2 border-b border-gray-200 dark:border-white/10">
          {props.isAuthed ? (
            <>
              <h1 className="font-semibold text-4xl sm:text-5xl leading-none sm:leading-tight sm:truncate">Your account</h1>
              <div className="flex items-center justify-between">
                <p className="flex items-center text-black/75 dark:text-white/75 text-sm sm:text-base">Signed in as <span className="flex items-center ml-2 mr-1 opacity-75"><Image src={AvatarIcon} className="dark:invert" /></span> <b>dizzyup</b></p>
                <button onClick={signOut} className="relative whitespace-nowrap text-black/50 dark:text-white/50 hover:text-red-600 dark:hover:text-red-500 hover:bg-red-600/10 rounded-md px-2 py-1 -mx-2 -mx-1 uppercase text-[11px] tracking-widest text-center transition">Sign out</button>
              </div>
            </>
          ) : (
            <>
              {isCreatingAccount ? (
                <>
                  <h1 className="font-semibold text-4xl sm:text-5xl leading-none sm:leading-tight sm:truncate">Create account</h1>
                  <p className="text-black/75 dark:text-white/75 text-sm sm:text-base">Already have an account? <button className="text-blue-500 dark:text-blue-400 underline hover:bg-blue-50 dark:hover:bg-blue-500/25 pt-0.5 pb-1 px-1 -mx-1 -my-1 rounded-lg transition" onClick={switchToSignIn}>Sign in</button></p>
                </>
              ) : (
                <>
                  <h1 className="font-semibold text-4xl sm:text-5xl leading-none sm:leading-tight sm:truncate">Sign in</h1>
                  <p className="text-black/75 dark:text-white/75 text-sm sm:text-base">Or create a <button className="text-blue-500 dark:text-blue-400 underline hover:bg-blue-50 dark:hover:bg-blue-500/25 pt-0.5 pb-1 px-1 -mx-1 -my-1 rounded-lg transition" onClick={switchToNewAccount}>new account</button></p>
                </>
              )}
            </>
          )}
        </div>
        
        <div className="flex flex-col px-8 pt-6">
          {props.isAuthed ? (
            <>
              <Orders setAccountVisible={props.setAccountVisible} />
            </>
          ) : (
            <form onSubmit={signIn}>
              {isCreatingAccount ? (
                <>
                  <fieldset className="flex">
                    <Field value={username} setter={setUsername} id="username" type="text" label="Username" placeholder="Enter username" />
                  </fieldset>
                  <fieldset className="flex">
                    <Field value={password} setter={setPassword} id="password" type="password" label="Password" placeholder="Enter password" />
                  </fieldset>
                  <fieldset className="flex">
                    <Field value={confirmPassword} setter={setConfirmPassword} id="confirmPassword" type="password" label="Confirm password" placeholder="Confirm password" />
                  </fieldset>
                  
                  <SignInButton disabled={!signupComplete} signUp={true} />
                </>
              ) : (
                <>
                  <fieldset className="flex">
                    <Field value={username} setter={setUsername} id="username" type="text" label="Username" placeholder="Enter username" />
                  </fieldset>
                  <fieldset className="flex">
                    <Field value={password} setter={setPassword} id="password" type="password" label="Password" placeholder="Enter password" />
                  </fieldset>
                  
                  <SignInButton disabled={!signinComplete} />
                </>
              )}
            </form>
          )}
        </div>
        
        <button className="absolute top-6 right-6 flex items-center justify-center px-4 h-10 border border-gray-500/25 dark:border-white/20 rounded-lg uppercase tracking-widest text-sm text-black/75 dark:text-white/75 hover:text-black/100 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-white/10 transition" onClick={dismiss}>
          Close
        </button>
      </div>
    </>
  )
}

function SignInButton(props) {
  
  return (
    <button className={`${props.disabled ? 'bg-gray-200 dark:bg-white/5 text-black/25 dark:text-white/25' : 'bg-black/90 dark:bg-white/90 hover:bg-black dark:hover:bg-white text-white dark:text-black/75 shadow-subtle'} relative flex items-center justify-between w-full h-[72px] px-8 mt-12 text-left text-white rounded-lg  group transition duration-500 ease-in-out overflow-hidden translate-x-0`} disabled={props.disabled}>
      <span className={`${props.disabled ? 'opacity-0' : 'opacity-100'} absolute left-0 top-0 bottom-0 w-1/2 bg-gradient-to-r from-white/0 via-white/20 dark:via-white/75 to-white/0 shimmer transition ease-in-out`}></span>
      <span className="uppercase tracking-widest text-lg">{props.signUp == true ? 'Create account' : 'Sign In'}</span>
      <span className={`${props.disabled ? 'opacity-0' : 'opacity-75 group-hover:opacity-100'} flex items-center invert dark:invert-0 group-hover:translate-x-[8px] transition duration-500 ease-in-out`}>
        <Image src={ChevronsIcon} />
      </span>
    </button>
  )
}