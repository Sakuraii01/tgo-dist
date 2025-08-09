import { Stepper, Step, StepLabel } from "@mui/material";
import { styled } from "@mui/material/styles";
import { type StepIconProps } from "@mui/material/StepIcon";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import { PROTECTED_PATH } from "../../../../constants/path.route";
// import { useNavigate } from "react-router-dom";
type stepperProps = {
  isActive: number;
  id: number;
};
export const ProcessStepper = (props: stepperProps) => {
  // const navigate = useNavigate();
  const steps = [
    {
      stepName: "ข้อมูลผลิตภัณฑ์",
      subStepName: "",
      navigate: PROTECTED_PATH.REGISTER_PRODUCT_CREATE,
    },
    {
      stepName: "กระบวนการผลิต",
      subStepName: "",
      navigate: PROTECTED_PATH.REGISTER_PRODUCT_FR03,
    },
    {
      stepName: "การประเมิน GHGs",
      subStepName: "วัตถุดิบ",
      navigate: PROTECTED_PATH.REGISTER_PRODUCT_FR04_1,
    },
    {
      stepName: "การประเมิน GHGs",
      subStepName: "ขนส่ง",
      navigate: PROTECTED_PATH.REGISTER_PRODUCT_FR04_2,
    },
    {
      stepName: "การประเมิน GHGs",
      subStepName: "กำหนดเอง",
      navigate: PROTECTED_PATH.REGISTER_PRODUCT_FR04_3,
    },
    {
      stepName: "การเปรียบเทียบ",
      subStepName: "จากค่าปีฐาน",
      navigate: PROTECTED_PATH.REGISTER_PRODUCT_FR06_1,
    },
    {
      stepName: "การเปรียบเทียบ",
      subStepName: "สมรรถนะผลิตภัณฑ์",
      navigate: PROTECTED_PATH.REGISTER_PRODUCT_FR06_2,
    },
  ];
  const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
    zIndex: -1,
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
      top: 22,
    },
    [`&.${stepConnectorClasses.active}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        backgroundImage: "linear-gradient( 95deg,#20B3D2, #008FC3)",
      },
    },
    [`&.${stepConnectorClasses.completed}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        backgroundImage: "linear-gradient( 95deg,#20B3D2, #008FC3)",
      },
    },
    [`& .${stepConnectorClasses.line}`]: {
      height: 3,
      border: 0,
      backgroundColor: "#eaeaf0",
      borderRadius: 1,
      ...theme.applyStyles("dark", {
        backgroundColor: theme.palette.grey[800],
      }),
    },
  }));

  const ColorlibStepIconRoot = styled("div")<{
    ownerState: { completed?: boolean; active?: boolean };
  }>(({ ownerState }) => ({
    backgroundColor: "white",
    // zIndex: 1,
    color: "#949699",
    border: "2px solid #949699",
    width: 50,
    height: 50,
    display: "flex",
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center",
    ...(ownerState.active || ownerState.completed
      ? {
          color: "#0190C3",
          border: "3px solid #008FC3",
        }
      : {}),
  }));
  function ColorlibStepIcon(props: StepIconProps) {
    const { active, completed, className } = props;

    const icons: { [index: string]: React.ReactElement } = Object.fromEntries(
      Array(7)
        .fill(null)
        .map((_, i) => [(i + 1).toString(), <p>{i + 1}</p>])
    );

    return (
      <ColorlibStepIconRoot
        ownerState={{ completed, active }}
        className={className}
      >
        {icons[String(props.icon)]}
      </ColorlibStepIconRoot>
    );
  }
  return (
    <div className="mx-auto max-w-7xl mb-10">
      <Stepper
        activeStep={props.isActive}
        connector={<ColorlibConnector />}
        alternativeLabel
      >
        {steps.map((label) => (
          <Step
            key={label.stepName + label.subStepName}
            // onClick={() => navigate(label.navigate + `?id=${props.id}`)}
            sx={{ position: "relative" }}
          >
            <StepLabel StepIconComponent={ColorlibStepIcon}>
              <p className="text-primary">{label.stepName}</p>
              <p className="text-sm text-gray-200">{label.subStepName}</p>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  );
};
