export const validateEmail = (email) => {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
};

export const getInitials = (name) => {
  if (!name) return "";

  const words = name.split(" ");
  let intitials = "";

  for (let i = 0; i < Math.min(words.length, 2); i++) {
    intitials += words[i][0];
  }
  return intitials.toUpperCase();
};
