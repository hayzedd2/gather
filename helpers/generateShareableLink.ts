export const generateShareableLink = (formId: string): string => {
  const url = process.env.NEXT_PUBLIC_APP_URL as string;
  const shareableLink = url + "/form/" + formId;
  return shareableLink;
};
