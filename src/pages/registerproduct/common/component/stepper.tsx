import { Stepper, Step, StepLabel } from "@mui/material";
import { styled } from "@mui/material/styles";
import { type StepIconProps } from "@mui/material/StepIcon";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import { PROTECTED_PATH } from "../../../../constants/path.route";
import { useNavigate } from "react-router-dom";
type stepperProps = {
  isActive: number;
  id: number;
};
export const ProcessStepper = (props: stepperProps) => {
  const navigate = useNavigate();
  const steps = [
    { stepName: "FR01", navigate: PROTECTED_PATH.REGISTER_PRODUCT_CREATE },
    { stepName: "FR03", navigate: PROTECTED_PATH.REGISTER_PRODUCT_FR03 },
    { stepName: "FR04.1", navigate: PROTECTED_PATH.REGISTER_PRODUCT_FR04_1 },
    { stepName: "FR04.2", navigate: PROTECTED_PATH.REGISTER_PRODUCT_FR04_2 },
    { stepName: "FR04.3", navigate: PROTECTED_PATH.REGISTER_PRODUCT_FR04_3 },
    { stepName: "FR06.1", navigate: PROTECTED_PATH.REGISTER_PRODUCT_FR06_1 },
    { stepName: "FR06.2", navigate: PROTECTED_PATH.REGISTER_PRODUCT_FR06_2 },
  ];
  const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
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
    zIndex: 1,
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
          border: "none",
          "&::before": {
            content: '""',
            position: "absolute",
            width: 50,
            height: 50,
            top: 0,
            left: 8,
            right: 0,
            bottom: 0,
            padding: "2px",
            borderRadius: "50%",
            background: "linear-gradient(136deg, #20B3D2, #008FC3)",
            WebkitMask:
              "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
          },
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
    <div className="mx-auto max-w-6xl mb-10 cursor-pointer">
      <Stepper activeStep={props.isActive} connector={<ColorlibConnector />}>
        {steps.map((label) => (
          <Step
            key={label.stepName}
            onClick={() => navigate(label.navigate + `?id=${props.id}`)}
            sx={{ position: "relative" }}
          >
            <StepLabel StepIconComponent={ColorlibStepIcon}>
              {label.stepName}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  );
};
