"use client";

import { HexColorPicker } from "react-colorful";

interface BoardColorPickerProps {
  onChange: (color: string) => void;
  color: string;
}

export const BoardColorPicker = ({
  color,
  onChange,
}: BoardColorPickerProps) => {
  return <HexColorPicker color={color} onChange={onChange} />;
};
