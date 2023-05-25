import { isDarkAtom } from "src/lib/atoms";
import { toggleIsDarkmodeActivatedOnLocal } from "src/lib/localStorage";

import { IconContext } from "react-icons";
import { BsFillMoonFill } from "react-icons/bs";
import { ImSun } from "react-icons/im";
import { useRecoilState } from "recoil";
import styled from "styled-components";

const ICON_CONTEXT = { size: "90%" };

function DarkmodeSwitch() {
  const [isDark, setIsDark] = useRecoilState(isDarkAtom);

  const toggleSwitch = () => {
    setIsDark((prev) => {
      const $root = document.documentElement;

      if (prev) {
        $root.classList.remove("dark");
      } else {
        $root.classList.add("dark");
      }

      return !prev;
    });
    toggleIsDarkmodeActivatedOnLocal();
  };

  return (
    <article>
      <Button onClick={toggleSwitch}>
        <span className='sr-only'>다크모드 스위치</span>
        <IconContext.Provider value={ICON_CONTEXT}>
          {isDark ? <BsFillMoonFill color='#e5c704' /> : <ImSun color='#e5c704' />}
        </IconContext.Provider>
      </Button>
    </article>
  );
}

const Button = styled.button`
  position: absolute;
  right: -35px;

  display: flex;
  justify-content: center;
  align-items: center;
  width: 26px;
  height: 26px;

  padding: 3px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  transition: scale 0.2s ease;
  :hover {
    scale: 1.1;
  }
  :active {
    scale: 0.8;
  }
  @media (max-width: 800px) {
    position: fixed;
    width: 35px;
    height: 35px;
    bottom: 20px;
    right: 20px;
    padding: 6px;
    box-shadow: ${({ theme }) => theme.darkmodeShadow};
    background-color: ${({ theme }) => theme.navBackgroundColor};
    backdrop-filter: blur(13px);
    border-radius: 50%;
  }
`;

export default DarkmodeSwitch;
