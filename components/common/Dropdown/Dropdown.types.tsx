import { Ref } from "react";

export interface IDropdownProps {
  options: string[];
  handleOptionSelect: (option: string) => void;
  ref: Ref<HTMLDivElement>;
}
