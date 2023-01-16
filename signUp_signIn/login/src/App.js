import { useState, useRef, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import { ThemeProvider } from "styled-components";
import DefaultKeyboard from "./Components/features/DefaultKeyboard";
import FooterMenu from "./Components/features/FooterMenu";
import { defaultTheme, themesOptions } from "./style/theme";
import { GlobalStyles } from "./style/global.js";
import useLocalPersistState from "./hooks/useLocalPersistState";
import Auth from "./Components/features/Auth";
import {
  SOUND_MODE,
  soundOptions,
  DEFAULT_SOUND_TYPE,
  DEFAULT_SOUND_TYPE_KEY,
} from "./Components/features/sound/sound";
import React from "react";
import SearchParams from "./Components/main/SearchParams";
import Details from "./Components/main/Details";
import TypeBox from "./Components/features/TypeBox/TypeBox";
import Keyboard from "./Components/main/Keyboard";
import Lesson from "./Components/main/Lesson";
import { ARABIC_LETTERS } from "./constants/Constants";
import User from "./Components/main/User";
import Header from "./Components/main/Header";
import Rooms from "./Components/features/community/Rooms";
import RoomContent from "./Components/features/community/RoomContent";
import Posts from "./Components/features/Blog/Posts";
import Chat from "./Components/features/Chat/Chat";
import MyProfile from "./Components/main/MyProfile";
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
  const textInputRef = useRef(null);
  const focusTextInput = () => {
    textInputRef.current && textInputRef.current.focus();
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
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/details/:id" element={<Details />} />
        <Route path="/lessons" element={<SearchParams />} />
        <Route
          path="/keyboard"
          element={
            <Keyboard
              letters={ARABIC_LETTERS}
              themesOptions={themesOptions}
              defaultTheme={defaultTheme}
            />
          }
        />
        <Route path="/lesson/:id" element={<Lesson />}></Route>

        <Route path="/User/:id" element={<User />}></Route>
        <Route path="/rooms" element={<Rooms />}></Route>
        <Route path="/room/:id" element={<RoomContent />} />
        <Route path="/blog" element={<Posts />}></Route>
        <Route path="/chat" element={<Chat />}></Route>
        <Route path="/MyProfile" element={<MyProfile />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
