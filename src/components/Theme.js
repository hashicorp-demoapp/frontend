import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { useDarkMode } from 'next-dark-mode'
import Image from 'next/image'

import MonitorIcon from '@hashicorp/flight-icons/svg/monitor-24.svg'
import SunIcon from '@hashicorp/flight-icons/svg/sun-24.svg'
import MoonIcon from '@hashicorp/flight-icons/svg/moon-24.svg'

import MonitorIcon16 from '@hashicorp/flight-icons/svg/monitor-16.svg'
import SunIcon16 from '@hashicorp/flight-icons/svg/sun-16.svg'
import MoonIcon16 from '@hashicorp/flight-icons/svg/moon-16.svg'

import CaretIcon from '@hashicorp/flight-icons/svg/caret-16.svg'
import CheckIcon from '@hashicorp/flight-icons/svg/check-16.svg'

export default function Theme() {
  const { theme, setTheme } = useTheme()
  
  const [mounted, setMounted] = useState(false)
  const [isShowingSettings, setIsShowingSettings] = useState(false)
  
  const {
    autoModeActive, 
    autoModeSupported,
    darkModeActive,
    switchToAutoMode,
    switchToDarkMode,
    switchToLightMode,
  } = useDarkMode()
  
  useEffect(() => {
    if (theme == 'autoDark' || theme == 'autoLight') {
      if (darkModeActive) {
        switchToDarkMode
        setTheme('autoDark')
      } else {
        switchToLightMode
        setTheme('autoLight')
      }
    }
  })
    
  function switchThemeToLight() {
    switchToLightMode
    setIsShowingSettings(false)
    setTheme('light')
  }
  
  function switchThemeToDark() {
    switchToDarkMode
    setIsShowingSettings(false)
    setTheme('dark')
  }
  
  function switchThemeToAuto() {
    switchToAutoMode
    setIsShowingSettings(false)
    if (darkModeActive) {
      setTheme('autoDark')
    } else {
      setTheme('autoLight')
    }
  }
  
  function showSettings() {
    if (isShowingSettings) {
      setIsShowingSettings(false)
    } else {
      setIsShowingSettings(true)
    }
  }
  
  const dismiss = async (event) => {
    setIsShowingSettings(false);
  };
  
  useEffect(() => setMounted(true), [])
  
  if (!mounted) return null
  
  return (
    <div className="hidden xs:block relative ml-6">
      <button
        className="flex items-center opacity-75 hover:opacity-100 transition duration-500 ease-in-out dark:invert"
        onClick={() => showSettings()}
      >
        <span className="flex items-center flex-shrink-0">
          <Image src={(theme == 'light' || theme == 'autoLight') ? SunIcon : (theme == 'dark' || theme == 'autoDark') ? MoonIcon : MonitorIcon} />
        </span>
        <span className="flex items-center flex-shrink-0 ml-0.5 opacity-75">
          <Image src={CaretIcon} />
        </span>
      </button>
      
      <div className={`${isShowingSettings ? 'opacity-100' : 'opacity-0 pointer-events-none'} fixed inset-0 z-40`} onClick={dismiss}></div>
      
      <div className={`${isShowingSettings ? 'opacity-100 bg-white dark:bg-neutral-900 translate-y-0' : 'opacity-0 translate-y-[-6px] pointer-events-none'} absolute top-9 right-0 overflow-hidden flex flex-col rounded-lg dark:text-white/90 shadow-high dark:shadow-highlight transition duration-300 ease-in-out z-50`}>
        <ul className="flex flex-col w-[140px] py-1">
          <li className="flex text-black/50 dark:text-white/50 text-sm py-1 px-3">Theme</li>
          <li className="flex flex-col px-1" onClick={() => switchThemeToAuto()}>
            <ThemeButton theme={theme} label="System" icon={MonitorIcon16} />
          </li>
          <li className="flex flex-col px-1" onClick={() => switchThemeToLight()}>
            <ThemeButton theme={theme} label="Light" icon={SunIcon16} />
          </li>
          <li className="flex flex-col px-1" onClick={() => switchThemeToDark()}>
            <ThemeButton theme={theme} label="Dark" icon={MoonIcon16} />
          </li>
        </ul>
      </div>
    </div>
  )
}

function ThemeButton(props) {
  let isActive
  
  if (props.label == 'System') {
    isActive = (props.theme == 'system' || props.theme == 'autoDark' || props.theme == 'autoLight')
  } else if (props.label == 'Light') {
    isActive = props.theme == 'light'
  } else {
    isActive = props.theme == 'dark'
  }
  
  return (
    <button className="flex items-center space-x-2 py-1 px-3 text-black/75 dark:text-white/75 bg-gray-100/0 hover:bg-gray-100 dark:bg-white/0 dark:hover:bg-white/5 transition duration-300 ease-in-out rounded">
      <span className="flex items-center flex-shrink-0 dark:invert opacity-75"><Image src={props.icon} /></span>
      <span className="flex-1 text-left text-sm sm:text-base">{props.label}</span>
      <span className="flex items-center flex-shrink-0 w-4 h-4 opacity-75 scale-90 translate-x-[4px] dark:invert">{isActive && <Image src={CheckIcon} />}</span>
    </button>
  )
}