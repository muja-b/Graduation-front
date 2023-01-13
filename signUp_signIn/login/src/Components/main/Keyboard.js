import { useState, useRef } from "react";
import { GlobalStyles } from "../../style/global.js";
import { ThemeProvider } from "styled-components";
import DefaultKeyboard from "../features/DefaultKeyboard";
import FooterMenu from "../features/FooterMenu";
import { defaultTheme, themesOptions } from "../../style/theme";
import {
  SOUND_MODE,
  soundOptions,
  DEFAULT_SOUND_TYPE,
  DEFAULT_SOUND_TYPE_KEY,
} from "../features/sound/sound";
import useLocalPersistState from "../../hooks/useLocalPersistState";
// import "../../../src/App.css";
const Keyboard = ({ letters }) => {
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
  const textInputRef = useRef(null);
  const focusTextInput = () => {
    textInputRef.current && textInputRef.current.focus();
  };
  const toggleSoundMode = () => {
    setSoundMode(!soundMode);
  };
  const [isMusicMode, setIsMusicMode] = useState(false);
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

  return (
    <ThemeProvider theme={theme}>
      <div className="canvas">
        <GlobalStyles></GlobalStyles>
        <div>
          <DefaultKeyboard
            letters={letters}
            soundMode={soundMode}
            soundType={soundType}
          ></DefaultKeyboard>
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
};
export default Keyboard;
