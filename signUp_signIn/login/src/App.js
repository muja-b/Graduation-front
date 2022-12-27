import { useState } from 'react';
import { ThemeProvider } from "styled-components";
import DefaultKeyboard from './Components/features/DefaultKeyboard'
import FooterMenu from './Components/features/FooterMenu'
import { defaultTheme, themesOptions } from "./style/theme";
import { GlobalStyles } from "./style/global.js";
import useLocalPersistState from "./hooks/useLocalPersistState";
import {
  SOUND_MODE,
  soundOptions,
  DEFAULT_SOUND_TYPE,
  DEFAULT_SOUND_TYPE_KEY,
} from "./Components/features/sound/sound";
import React from 'react';

function App() {
  const [theme, setTheme] = useState(() => {
    const stickyTheme = window.localStorage.getItem("theme");
    if (stickyTheme !== null) {
      const localTheme = JSON.parse(stickyTheme);
      const upstreamTheme = themesOptions.find(
        (e) => e.label === localTheme.label
      ).value;
      // we will do a deep equal here. In case we want to support customized local theme.
      const isDeepEqual = localTheme === upstreamTheme;
      return isDeepEqual ? localTheme : upstreamTheme;
    }
    return defaultTheme;
  });

  // local persist game mode setting
  const [soundMode, setSoundMode] = useLocalPersistState(true, SOUND_MODE);

  const [soundType, setSoundType] = useLocalPersistState(
    DEFAULT_SOUND_TYPE,
    DEFAULT_SOUND_TYPE_KEY
  );
  const handleThemeChange = (e) => {
    window.localStorage.setItem("theme", JSON.stringify(e.value));
    setTheme(e.value);
  };
   const toggleSoundMode = () => {
    setSoundMode(!soundMode);
  };

  const toggleMusicMode = () => {
    setIsMusicMode(!isMusicMode);
  };
    const handleSoundTypeChange = (e) => {
    setSoundType(e.label);
  };
   const toggleFocusedMode = () => {
    setIsFocusedMode(!isFocusedMode);
  };
    const [isFocusedMode, setIsFocusedMode] = useState(
    localStorage.getItem("focused-mode") === "true"
  );
  const [isMusicMode, setIsMusicMode] = useState(false);
  return (
    <ThemeProvider theme={theme}>
      <div className='canvas'>
        <GlobalStyles>
        </GlobalStyles>
          <div className="App">
          <DefaultKeyboard letters={["ص","ض"]} soundMode={soundMode}
              soundType={soundType}>
          </DefaultKeyboard> 
      </div> 
      </div>
      <FooterMenu
            themesOptions={themesOptions}
            theme={theme}
            soundMode={soundMode}
            toggleSoundMode={toggleSoundMode}
            soundOptions={soundOptions}
            soundType={soundType}
            handleSoundTypeChange={handleSoundTypeChange}
            handleThemeChange={handleThemeChange}
            toggleFocusedMode={toggleFocusedMode}
            toggleMusicMode={toggleMusicMode}
            isFocusedMode={isFocusedMode}
          ></FooterMenu>
    </ThemeProvider>
    
  );
}

export default App;
