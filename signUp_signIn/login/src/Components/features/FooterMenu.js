import React from "react";
import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import { Tooltip } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import SelfImprovementIcon from "@mui/icons-material/SelfImprovement";
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import Select from "../utils/Select";
import { Link } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import KeyboardAltIcon from "@mui/icons-material/KeyboardAlt";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import EmojiFoodBeverageIcon from "@mui/icons-material/EmojiFoodBeverage";
import { SvgIcon } from "@mui/material";
import KeyboardAltOutlinedIcon from '@mui/icons-material/KeyboardAltOutlined';
import { SOUND_MODE_TOOLTIP } from "../features/sound/sound";

const FooterMenu = ({
  themesOptions,
  theme,
  soundMode,
  toggleSoundMode,
  soundOptions,
  soundType,
  handleSoundTypeChange,
  handleThemeChange,
  toggleFocusedMode,
  isMusicMode,
  isFocusedMode,
  isCoffeeMode,
  isTrainerMode,
  isWordsCardMode,
  toggleWordsCardMode
}) => {
  const isSiteInfoDisabled = isMusicMode || isFocusedMode;
  const isBottomLogoEnabled = isFocusedMode && !isMusicMode;

  const getModeButtonClassName = (mode) => {
    if (mode) {
      return "zen-button";
    }
    return "zen-button-deactive";
  };

  const getGameModeButtonClassName = (currMode, buttonMode) => {
    if (currMode === buttonMode) {
      return "active-game-mode-button";
    }
    return "inactive-game-mode-button";
  };

  return (
    <div className="footer">
      <Grid container justifyContent="space-between" alignItems="center">
        <Box display="flex" flexDirection="row">
          <Select
            classNamePrefix="Select"
            value={themesOptions.find((e) => e.value.label === theme.label)}
            options={themesOptions}
            isSearchable={false}
            isSelected={false}
            onChange={handleThemeChange}
            menuPlacement="top"
          ></Select>

          <IconButton onClick={toggleFocusedMode}>
            <Tooltip title={"Focus_mode"}>
              <span className={getModeButtonClassName(isFocusedMode)}>
                <SelfImprovementIcon fontSize="medium"></SelfImprovementIcon>
              </span>
            </Tooltip>
          </IconButton>
          <IconButton onClick={toggleSoundMode}>
            <Tooltip title={SOUND_MODE_TOOLTIP}>
              <span className={getModeButtonClassName(soundMode)}>
                <VolumeUpIcon fontSize="medium"></VolumeUpIcon>
              </span>
            </Tooltip>
          </IconButton>
          {soundMode && (<Select
            classNamePrefix="Select"
            value={soundOptions.find((e) => e.label === soundType)}
            options={soundOptions}
            isSearchable={false}
            isSelected={false}
            onChange={handleSoundTypeChange}
            menuPlacement="top"
          ></Select>)}

        </Box>
        {!isSiteInfoDisabled && (
          <Box display="block" flexDirection="row">
            
              <IconButton color="inherit">
              </IconButton>
          </Box>
        )}
        {isBottomLogoEnabled && (
          <Box display="block" flexDirection="row" className="bottom-info">
              <span>
                Ele Types <KeyboardAltIcon fontSize="small" />
              </span>
          </Box>
        )}
      </Grid>
    </div>
  );
};

export default FooterMenu;
