import { useEffect } from 'react'
import Scroll from 'react-scroll'
import axios from 'axios'
import useSWR from 'swr'
import Link from 'next/link'

var Element = Scroll.Element
var scroller = Scroll.scroller

export default function CoffeeMenu(props) {
  const fetcher = async (url) => await axios.get(url).then((res) => res.data);
  const { data, error } = useSWR("/api/get-coffees", fetcher);
  
  const activeItem = 'coffee-' + props.isActive
  
  useEffect(() => {
    if (data) {
      scroller.scrollTo(activeItem, {
        duration: 500,
        delay: 50,
        offset: -120,
        smooth: true,
        horizontal: true,
        containerId: 'containerElement',
      })
    }
  })
  
  return (
    <>
      {props.isHero == true ? (
        <ul className="grid xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-0 xs:gap-8 pt-8 pb-16 items-center justify-center">
          {data && data.map((coffee) => (
            <CoffeeMenuItem isInHero={props.isHero} coffee={coffee} key={coffee.id} />
          ))}
        </ul>
      ) : (
        <nav className="relative z-10 flex items-center justify-center px-0 bg-white/50 dark:bg-black/25 shadow-low dark:shadow-highlight">
          <Element id="containerElement" className="flex items-center h-[180px] overflow-x-auto scroll-style">
            {data && data.map((coffee) => (
              <Element name={`coffee-${coffee.id}`} key={coffee.id} className="flex-shrink-0">
                <CoffeeMenuItem coffee={coffee} isActive={props.isActive} />
              </Element>
            ))}
          </Element>
        </nav>
      )}
    </>
  )
}

function CoffeeMenuItem(props) {
  const activeState = props.coffee.id == props.isActive
  
  return (
    <>
      {props.isInHero == true ? (
        <li className="flex">
          <Link href={`/coffee/${props.coffee.id}`}>
            <a className="relative flex flex-col items-center group bg-white/0 hover:bg-white/100 dark:hover:bg-white/5 hover:shadow-high dark:hover:shadow-highlight rounded-xl pb-4 transition ease-in-out duration-500">
              <img className="flex-shrink-0 group-hover:scale-125 transition ease-in-out duration-500" src={`/images/thumbnails${props.coffee.image}`} width={200} height={200} />
              <span className="font-medium text-black/75 dark:text-white/90 text-center">{`${props.coffee.name}`}</span>
            </a>
          </Link>
        </li>
      ) : (
        <li className="flex flex-shrink-0 overflow-visible">
          <Link href={`/coffee/${props.coffee.id}`} scroll={false}>
            <a className="relative flex flex-col items-center group">
              <div className="flex flex-col items-center w-full h-full overflow-hidden">
                <img className={`${activeState ? 'scale-125' : 'scale-100'} flex-shrink-0 group-hover:scale-125 transition ease-in-out duration-500`} src={`/images/thumbnails${props.coffee.image}`} width={120} height={120} />
              </div>
              <span className="absolute left-1/2 bottom-2 translate-x-[-50%] translate-y-[4px] group-hover:translate-y-0 whitespace-nowrap text-black/75 uppercase text-[10px] tracking-widest text-center bg-gray-50 backdrop-blur-md py-0.5 px-2 shadow-mid rounded-full opacity-0 group-hover:opacity-100 transition ease-in-out duration-500 hover:delay-500">{`${props.coffee.name}`}</span>
              <span className={`${activeState ? 'opacity-100 group-hover:translate-y-[8px]' : 'opacity-0'} flex bg-black/75 dark:bg-white/75 w-1.5 h-1.5 rounded-full transition duration-300`}></span>
            </a>
          </Link>
        </li>
      )}
    </>
  );
}