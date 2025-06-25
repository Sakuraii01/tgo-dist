import { FR04Layout } from "../common/layout";
import {
  Autocomplete,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { DeleteRounded, Save, Edit } from "@mui/icons-material";
import { useState } from "react";
import { ProcessStepper } from "../common/component/stepper";

import { Accordion } from "../common/component/accordion";
import { type ItemTransportType } from "../../../service/api/fr04/type";
import { useSearchParams } from "react-router-dom";
const FR04_3 = () => {
  const [searchParams] = useSearchParams();
  const id = Number(searchParams.get("id"));
  return (
    <div>
      <ProcessStepper isActive={5} id={id} />
    </div>
  );
};
export default FR04_3;
