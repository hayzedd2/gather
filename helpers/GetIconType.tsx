import { FieldType } from "@/types/type";
import React from "react";
import {
  FileDigit,
  FileText,
  FileType,
  List,
  MailPlus,
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
      return <MailPlus size={size ? size : 20} className="icon-green" />;
    case "text":
      return <FileText size={size ? size : 20} className="icon-red" />;
    case "number":
      return <FileDigit size={size ? size : 20} className="icon-blue" />;
    case "select":
      return <List size={size ? size : 20} className="icon-yellow" />;
    case "textarea":
      return <WrapText size={size ? size : 20} className="icon-purple" />;
  }
};

export default GetIconType;
