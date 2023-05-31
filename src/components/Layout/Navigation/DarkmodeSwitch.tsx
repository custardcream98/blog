import { toggleIsDarkmodeActivatedOnLocal } from "src/lib/localStorage";

import { useEffect, useState } from "react";
import { IconContext } from "react-icons";
import { BsFillMoonFill } from "react-icons/bs";
import { ImSun } from "react-icons/im";
import { utld } from "utility-class-components";

("use client");

const ICON_CONTEXT = { size: "90%" };

function DarkmodeSwitch() {
  const [isDarkmodeActivated, setIsDarkmodeActivated] = useState(false);

  useEffect(() => {
    const $root = document.documentElement;

    if ($root.classList.contains("dark")) {
      setIsDarkmodeActivated(true);
    } else {
      setIsDarkmodeActivated(false);
    }
  }, []);

  const toggleSwitch = () => {
    const $root = document.documentElement;

    const prev = $root.classList.toggle("dark");

    setIsDarkmodeActivated(prev);

    toggleIsDarkmodeActivatedOnLocal();
  };

  return (
    <article>
      <Button onClick={toggleSwitch}>
        <span className='sr-only'>다크모드 스위치</span>
        <IconContext.Provider value={ICON_CONTEXT}>
          {isDarkmodeActivated ? <BsFillMoonFill color='#e5c704' /> : <ImSun color='#e5c704' />}
        </IconContext.Provider>
      </Button>
    </article>
  );
}

const Button = utld.button`
  absolute
  right-[-2.1875rem]

  flex
  justify-center
  items-center

  w-[1.625rem]
  h-[1.625rem]

  p-[0.1875rem]
  
  transition-transform
  duration-200
  ease-in-out

  hover:scale-[1.1]
  active:scale-[0.8]

  mobile:(
    fixed
    w-[2.1875rem]
    h-[2.1875rem]
    bottom-[1.25rem]
    right-[1.25rem]
    p-[0.375rem]
    
    backdrop-blur-md
    rounded-[50%]
    bg-nav-bg-light
    dark:bg-nav-bg-dark
    shadow-md
    shadow-default-light
    dark:shadow-default-dark
  )
`;

export default DarkmodeSwitch;
