import React from "react";
import { useRef, useEffect, useState, keyboardRef } from "react";
import { Box } from "@mui/system";
import IconButton from "../utils/IconButton";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import useSound from "use-sound";
import { SOUND_MAP } from "../features/sound/sound";
import Header from "../main/Header";

const DefaultKeyboard = ({ letters, soundType, soundMode }) => {
  const keyboardRef = useRef();
  const [inputChar, setInputChar] = useState("");
  const [keys, setKeys] = useState("");
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [play] = useSound(SOUND_MAP[soundType], { volume: 0.5 });

  const accuracy =
    correctCount + incorrectCount === 0
      ? 0
      : Math.floor((correctCount / (correctCount + incorrectCount)) * 100);
  const resetStats = () => {
    setCorrectCount(0);
    setIncorrectCount(0);
  };

  useEffect(() => {
    keyboardRef.current && keyboardRef.current.focus();
  });

  const handleInputBlur = (event) => {
    keyboardRef.current && keyboardRef.current.focus();
  };
  const handleKeyDown = (event) => {
    if (soundMode) {
      play();
    }
    setInputChar(event.key);
    event.preventDefault();
    return;
  };
  const handleKeyUp = (event) => {
    setInputChar("");
    if (event.key === randomKey) {
      let newRandom = getRandomKeyIndex();
      let newKey = letters[newRandom];
      setRandomKey(letters[newRandom]);
      setCorrectCount(correctCount + 1);
      return;
    }

    setIncorrectCount(incorrectCount + 1);

    event.preventDefault();
    return;
  };
  const getRandomKeyIndex = () => {
    return Math.floor(Math.random() * letters.length);
  };

  const [randomKey, setRandomKey] = useState(() => {
    return letters[getRandomKeyIndex()];
  });

  const getClassName = (keyString) => {
    if (keyString !== randomKey) {
      if (inputChar !== "" && inputChar === keyString) {
        return "UNITKEY VIBRATE-ERROR";
      }
      return "UNITKEY";
    }
    if (inputChar !== "" && inputChar === keyString) {
      return "UNITKEY NOVIBRATE-CORRECT";
    }
    return "UNITKEY VIBRATE";
  };
  const getSpaceKeyClassName = () => {
    if (" " !== randomKey) {
      if (inputChar !== "" && inputChar === " ") {
        return "SPACEKEY VIBRATE-ERROR";
      }
      return "SPACEKEY";
    }
    if (inputChar !== "" && inputChar === " ") {
      return "SPACEKEY NOVIBRATE-CORRECT";
    }
    return "SPACEKEY VIBRATE";
  };

  return (
    <div>
      <div className="keyboard">
        <input
          className="hidden-input"
          onBlur={handleInputBlur}
          onKeyDown={handleKeyDown}
          onKeyUp={handleKeyUp}
          ref={keyboardRef}
        ></input>
        <ul className="row row-0">
          <div className={getClassName("ذ")} id="ذ">
            ذ
          </div>
          <div className={getClassName("1")} id="1">
            1
          </div>
          <div className={getClassName("2")} id="2">
            2
          </div>
          <div className={getClassName("3")} id="3">
            3
          </div>
          <div className={getClassName("4")} id="4">
            4
          </div>
          <div className={getClassName("4")} id="4">
            4
          </div>
          <div className={getClassName("4")} id="4">
            4
          </div>
          <div className={getClassName("5")} id="5">
            5
          </div>
          <div className={getClassName("6")} id="6">
            6
          </div>
          <div className={getClassName("7")} id="7">
            7
          </div>
          <div className={getClassName("8")} id="8">
            8
          </div>
          <div className={getClassName("9")} id="9">
            9
          </div>
          <div className={getClassName("0")} id="0">
            0
          </div>
        </ul>
        <ul className="row row-1">
          <div className={getClassName("ض")} id="ض">
            ض
          </div>
          <div className={getClassName("ص")} id="ص">
            ص
          </div>
          <div className={getClassName("ث")} id="ث">
            ث
          </div>
          <div className={getClassName("ق")} id="ق">
            ق
          </div>
          <div className={getClassName("ف")} id="ف">
            ف
          </div>
          <div className={getClassName("غ")} id="غ">
            غ
          </div>
          <div className={getClassName("ع")} id="ع">
            ع
          </div>
          <div className={getClassName("ه")} id="ه">
            ه
          </div>
          <div className={getClassName("خ")} id="خ">
            خ
          </div>
          <div className={getClassName("ح")} id="ح">
            ح
          </div>
          <div className={getClassName("ج")} id="ج">
            ج
          </div>
          <div className={getClassName("د")} id="د">
            د
          </div>
        </ul>
        <ul className="row row-2">
          <div className={getClassName("ش")} id="ش">
            ش
          </div>
          <div className={getClassName("س")} id="س">
            س
          </div>
          <div className={getClassName("ي")} id="ي">
            ي
          </div>
          <div className={getClassName("ب")} id="ب">
            ب
          </div>
          <div className={getClassName("ل")} id="ل">
            ل
          </div>
          <div className={getClassName("ا")} id="ا">
            ا
          </div>
          <div className={getClassName("ت")} id="ت">
            ت
          </div>
          <div className={getClassName("ن")} id="ن">
            ن
          </div>
          <div className={getClassName("م")} id="م">
            م
          </div>
          <div className={getClassName("ك")} id="ك">
            ك
          </div>
          <div className={getClassName("ط")} id="ط">
            ط
          </div>
        </ul>
        <ul className="row row-3">
          <div className={getClassName("ئ")} id="ئ">
            ئ
          </div>
          <div className={getClassName("ء")} id="ء">
            ء
          </div>
          <div className={getClassName("ؤ")} id="ؤ">
            ؤ
          </div>
          <div className={getClassName("ر")} id="ر">
            ر
          </div>
          <div className={getClassName("لا")} id="لا">
            لا
          </div>
          <div className={getClassName("ى")} id="ى">
            ى
          </div>
          <div className={getClassName("ة")} id="ة">
            ة
          </div>
          <div className={getClassName("و")} id="و">
            و
          </div>
          <div className={getClassName("ز")} id="ز">
            ز
          </div>
          <div className={getClassName("ظ")} id="ظ">
            ظ
          </div>
        </ul>
        <ul className="row row-4">
          <div className={getSpaceKeyClassName()} id="SPACE">
            SPACE
          </div>
        </ul>{" "}
      </div>
      <div className="keyboard-stats">
        <Box display="flex" flexDirection="row">
          <h3>Accuracy: {accuracy} %</h3>
          <h3>
            <span className="CorrectKeyDowns">{correctCount}</span>
            {"  "} {"/"} {"  "}
            <span className="IncorrectKeyDowns">{incorrectCount}</span>
          </h3>
          <IconButton
            aria-label="restart"
            size="small"
            onClick={() => {
              resetStats();
            }}
          >
            <RestartAltIcon />
          </IconButton>
        </Box>
      </div>
    </div>
  );
};

export default DefaultKeyboard;
