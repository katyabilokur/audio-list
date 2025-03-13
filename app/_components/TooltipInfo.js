import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

export default function TooltipInfo({ id }) {
  return (
    <Tooltip
      id={id}
      place="top"
      effect="solid"
      style={{
        backgroundColor: "var(--color-tooltip-bg)",
        color: "var(--color-tooltip-text)",
      }}
    />
  );
}
