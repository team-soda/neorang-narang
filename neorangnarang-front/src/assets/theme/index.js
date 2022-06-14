// @mui material components
import { createTheme } from "@mui/material/styles";

import breakpoints from "./base/breakpoints";
import colors from "./base/colors";
import typography from "./base/typography";
import boxShadows from "./base/boxShadows";
import borders from "./base/borders";
import boxShadow from "./functions/boxShadow";
import hexToRgb from "./functions/hexToRgb";
import linearGradient from "./functions/linearGradient";
import pxToRem from "./functions/pxToRem";
import rgba from "./functions/rgba";
import globals from "./base/globals";
import container from "./components/container";
import flatpickr from "./components/flatpickr";
import list from "./components/list";
import listItem from "./components/list/listItem";
import listItemText from "./components/list/listItemText";
import cardMedia from "./components/card/cardMedia";
import tableHead from "./components/table/tableHead";
import tableContainer from "./components/table/tableContainer";
import divider from "./components/divider";
import menu from "./components/menu";
import menuItem from "./components/menu/menuItem";
import inputOutlined from "./components/form/inputOutlined";
import inputLabel from "./components/form/inputLabel";
import textField from "./components/form/textField";
import input from "./components/form/input";
import iconButton from "./components/iconButton";
import card from "./components/card";
import cardContent from "./components/card/cardContent";
import switchButton from "./components/form/switchButton";
import tableCell from "./components/table/tableCell";
import linearProgress from "./components/linearProgress";
import stepConnector from "./components/stepper/stepConnector";
import formControlLabel from "./components/form/formControlLabel";
import checkbox from "./components/form/checkbox";
import formLabel from "./components/form/formLabel";
import select from "./components/form/select";
import stepIcon from "./components/stepper/stepIcon";
import step from "./components/stepper/step";
import stepper from "./components/stepper";
import tab from "./components/tabs/tab";
import tabs from "./components/tabs";
import appBar from "./components/appBar";
import tooltip from "./components/tooltip";
import avatar from "./components/avatar";
import slider from "./components/slider";
import breadcrumbs from "./components/breadcrumbs";
import stepLabel from "./components/stepper/stepLabel";
import radio from "./components/form/radio";
import autocomplete from "./components/form/autocomplete";
import link from "./components/link";
import svgIcon from "./components/svgIcon";
import icon from "./components/icon";
import button from "./components/button";
import buttonBase from "./components/buttonBase";
import popover from "./components/popover";
import dialog from "./components/dialog";
import dialogContent from "./components/dialog/dialogContent";
import dialogActions from "./components/dialog/dialogActions";
import dialogContentText from "./components/dialog/dialogContentText";
import dialogTitle from "./components/dialog/dialogTitle";

export default createTheme({
  breakpoints: { ...breakpoints },
  palette: { ...colors },
  typography: { ...typography },
  boxShadows: { ...boxShadows },
  borders: { ...borders },
  functions: {
    boxShadow,
    hexToRgb,
    linearGradient,
    pxToRem,
    rgba,
  },

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        ...globals,
        ...flatpickr,
        ...container,
      },
    },
    MuiList: { ...list },
    MuiListItem: { ...listItem },
    MuiListItemText: { ...listItemText },
    MuiCard: { ...card },
    MuiCardMedia: { ...cardMedia },
    MuiCardContent: { ...cardContent },
    MuiButton: { ...button },
    MuiIconButton: { ...iconButton },
    MuiInput: { ...input },
    MuiInputLabel: { ...inputLabel },
    MuiOutlinedInput: { ...inputOutlined },
    MuiTextField: { ...textField },
    MuiMenu: { ...menu },
    MuiMenuItem: { ...menuItem },
    MuiSwitch: { ...switchButton },
    MuiDivider: { ...divider },
    MuiTableContainer: { ...tableContainer },
    MuiTableHead: { ...tableHead },
    MuiTableCell: { ...tableCell },
    MuiLinearProgress: { ...linearProgress },
    MuiBreadcrumbs: { ...breadcrumbs },
    MuiSlider: { ...slider },
    MuiAvatar: { ...avatar },
    MuiTooltip: { ...tooltip },
    MuiAppBar: { ...appBar },
    MuiTabs: { ...tabs },
    MuiTab: { ...tab },
    MuiStepper: { ...stepper },
    MuiStep: { ...step },
    MuiStepConnector: { ...stepConnector },
    MuiStepLabel: { ...stepLabel },
    MuiStepIcon: { ...stepIcon },
    MuiSelect: { ...select },
    MuiFormControlLabel: { ...formControlLabel },
    MuiFormLabel: { ...formLabel },
    MuiCheckbox: { ...checkbox },
    MuiRadio: { ...radio },
    MuiAutocomplete: { ...autocomplete },
    MuiPopover: { ...popover },
    MuiButtonBase: { ...buttonBase },
    MuiIcon: { ...icon },
    MuiSvgIcon: { ...svgIcon },
    MuiLink: { ...link },
    MuiDialog: { ...dialog },
    MuiDialogTitle: { ...dialogTitle },
    MuiDialogContent: { ...dialogContent },
    MuiDialogContentText: { ...dialogContentText },
    MuiDialogActions: { ...dialogActions },
  },
});
