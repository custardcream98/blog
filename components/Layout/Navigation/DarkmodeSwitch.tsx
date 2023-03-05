import { useRecoilState } from "recoil";
import styled from "styled-components";
import { IconContext } from "react-icons";
import { ImSun } from "react-icons/im";
import { BsFillMoonFill } from "react-icons/bs";

import { isDarkAtom } from "lib/atoms";
import { toggleIsDarkmodeActivatedOnLocal } from "lib/localStorage";

const DarkmodeSwitch = () => {
  const [isDark, setIsDark] = useRecoilState(isDarkAtom);

  const toggleSwitch = () => {
    setIsDark((prev) => !prev);
    toggleIsDarkmodeActivatedOnLocal();
  };

  return (
    <article>
      <Button onClick={toggleSwitch}>
        <span className="sr-only">다크모드 스위치</span>
        <IconContext.Provider value={{ size: "90%" }}>
          {isDark ? (
            <BsFillMoonFill color="#e5c704" />
          ) : (
            <ImSun color="#e5c704" />
          )}
        </IconContext.Provider>
      </Button>
    </article>
  );
};

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
    background-color: ${({ theme }) =>
      theme.navBackgroundColor};
    backdrop-filter: blur(13px);
    border-radius: 50%;
  }
`;

export default DarkmodeSwitch;
