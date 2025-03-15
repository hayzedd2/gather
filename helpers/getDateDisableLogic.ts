import { dateRestrictionFormats } from "@/types/type";

export function getDateDisableLogic(
  validation: dateRestrictionFormats
): (date: Date) => boolean {
  switch (validation) {
    case "none":
      return () => false;

    case "disableFuture":
      return (date: Date) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return date > today;
      };

    case "disablePast":
      return (date: Date) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return date < today;
      };

    default:
      return () => false;
  }
}
