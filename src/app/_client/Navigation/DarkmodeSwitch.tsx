import { useSetIsDarkmodeActivatedContext } from "src/app/_providers";
import type { PropsWithClassName } from "src/types/props";

import { IconContext } from "react-icons";
import { BsFillMoonFill } from "react-icons/bs";
import { ImSun } from "react-icons/im";
import { utld } from "utility-class-components";

const ICON_CONTEXT = { size: "90%" };

export function DarkmodeSwitch({ className }: PropsWithClassName) {
  const { setIsDarkmodeActivatedToggle, isDarkmodeActivated } = useSetIsDarkmodeActivatedContext();

  return (
    <article className={className}>
      <Button onClick={setIsDarkmodeActivatedToggle} aria-label='다크모드 스위치'>
        <IconContext.Provider value={ICON_CONTEXT}>
          {isDarkmodeActivated ? <BsFillMoonFill color='#e5c704' /> : <ImSun color='#e5c704' />}
        </IconContext.Provider>
      </Button>
    </article>
  );
}

const Button = utld.button`
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

  `;

// mobile:(
//   w-[2.1875rem]
//   h-[2.1875rem]
//   p-[0.375rem]

//   backdrop-blur-md
//   rounded-full
//   bg-nav-bg-light
//   dark:bg-nav-bg-dark
//   shadow
//   shadow-default-light
//   dark:shadow-default-dark
// )
