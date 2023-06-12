import { DetailedHTMLProps, HTMLAttributes, ReactElement } from "react";
import dropdownArrow from "./dropdown-arrow.svg";
import star from "./star.svg";
import starFilled from "./star-filled.svg";
import complete from "./complete.svg";
import completeFilled from "./complete-filled.svg";

const components = {
  dropdownArrow: dropdownArrow,
  star: star,
  starFilled: starFilled,
  complete: complete,
  completeFilled: completeFilled,
};

type Props = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & { kind: keyof typeof components };

const Icon = ({ kind, children, ...props }: Props): ReactElement => {
  const SvgIcon = components[kind];
  return (
    <div {...props}>
      <SvgIcon className="fill-current h-[1em]" aria-label={kind} />
      {children}
    </div>
  );
};

export default Icon;
