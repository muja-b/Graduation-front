import React from "react";
import { Box } from "@mui/system";
import { Tooltip } from "@mui/material";
import { CHAR_TOOLTIP_TITLE } from "../../../constants/Constants";

const Stats = ({
  status,
  wpm,
  countDown,
  countDownConstant,
  statsCharCount,
  rawKeyStrokes,
}) => {
  const ConvertToArabicNumbers = (num) => {
    const arabicNumbers =
      "\u0660\u0661\u0662\u0663\u0664\u0665\u0666\u0667\u0668\u0669";
    return new String(num).replace(/[0123456789]/g, (d) => {
      return arabicNumbers[d];
    });
  };
  return (
    <>
      <h3 align="right">{ConvertToArabicNumbers(countDown)} ث </h3>
      <Box display="flex" flexDirection="row-reverse">
        <table
          display="flex"
          flexDirection="row-reverse"
          justifyContent="flex-end"
        >
          <tr display="flex" flexDirection="row-reverse">
            <h3>السرعة(كلمة بالثانية): {Math.round(wpm)}</h3>
          </tr>

          {status === "finished" && (
            <tr display="flex" justifyContent="flex-end" align="right">
              <h4>الدقة: % {Math.round(statsCharCount[0])}</h4>
            </tr>
          )}
          {status === "finished" && (
            <tr align="right">
              <Tooltip
                title={
                  <span
                    display="flex"
                    flexDirection="row-reverse"
                    style={{ whiteSpace: "pre-line" }}
                  >
                    {CHAR_TOOLTIP_TITLE}
                  </span>
                }
              >
                <h4>
                  <table
                    display="flex"
                    flexDirection="row-reverse"
                    align="right"
                  >
                    <tr>
                      <span className="correct-char-stats" align="right">
                        الاحرف الصحيحة:{statsCharCount[1]}
                      </span>
                    </tr>
                    <tr>
                      <span className="incorrect-char-stats" align="right">
                        الاحرف الخاطئة:{statsCharCount[2]}
                      </span>
                    </tr>
                    <tr>
                      <span className="missing-char-stats" align="right">
                        الاحرف المفقودة:{statsCharCount[3]}
                      </span>
                    </tr>
                    <tr>
                      <span className="correct-char-stats" align="right">
                        الاحرف كلها:{statsCharCount[4]}
                      </span>
                    </tr>
                  </table>
                  {/* <span className="incorrect-char-stats">{statsCharCount[5]}</span> */}
                </h4>
              </Tooltip>
            </tr>
          )}
          {status === "finished" && (
            <tr display="flex" flexDirection="row-reverse">
              <h4>
                السرعة(حرف بالدقيقة):{" "}
                {Math.round((rawKeyStrokes / countDownConstant) * 60.0)}
              </h4>
            </tr>
          )}
        </table>
      </Box>
    </>
  );
};

export default Stats;
