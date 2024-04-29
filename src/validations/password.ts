export const validatePassword = (password: string) => {
  const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[A-Z]).{7,}$/;
  
  return passwordRegex.test(password);
};