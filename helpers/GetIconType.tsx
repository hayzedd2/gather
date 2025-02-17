import { FieldType } from "@/types/type";
import React from "react";
import {
  AtSign,
  Binary,
  CircleCheckBig,
  FileDigit,
  FileText,
  FileType,
  List,
  MailPlus,
  SlidersHorizontal,
  SquareCheck,
  Star,
  Type,
  WrapText,
} from "lucide-react";

interface IconTypeProps {
  type: FieldType;
  size?: number;
}
const GetIconType = ({ type, size }: IconTypeProps) => {
  switch (type) {
    case "email":
      return <AtSign size={size ? size : 18} className="icon-green" />;
    case "text":
      return <FileText size={size ? size : 18} className="icon-red" />;
    case "number":
      return <Binary size={size ? size : 18} className="icon-blue" />;
    case "select":
      return <List size={size ? size : 18} className="icon-fuchsia" />;
    case "textarea":
      return <WrapText size={size ? size : 18} className="icon-purple" />;
    case "checkbox-group":
      return <SquareCheck size={size ? size : 18} className="icon-pink" />;
    case "radio-group":
      return <CircleCheckBig size={size ? size : 18} className="icon-cyan" />;
    case "rating":
      return <Star size={size ? size : 18} className="icon-yellow" />;

    case "slider":
      return (
        <SlidersHorizontal size={size ? size : 18} className="icon-emerald" />
      );
    default:
      return <FileType size={18} />;
  }
};

export default GetIconType;
