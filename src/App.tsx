import { ThemeProvider } from "styled-components";
import { useRecoilState } from "recoil";
import { isDarkAtom } from "./atoms";
import { lightTheme, darkTheme } from "./theme";

function App() {
  const [isDark, setIsDark] = useRecoilState(isDarkAtom);

  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <div className="App"></div>
    </ThemeProvider>
  );
}

export default App;
