export const generateShareableLink = (): string => {
  const url = new URL(window.location.origin);
  const formId = crypto.randomUUID();
  url.pathname = `/form/${formId}`;
  return url.toString();
};
