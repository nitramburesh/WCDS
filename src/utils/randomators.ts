export const getRandomComponentId = (componentString: string) => {
  const randomNumber = Math.floor(Math.random() * 10000);
  return `wcds-${componentString}-${randomNumber}`;
};
