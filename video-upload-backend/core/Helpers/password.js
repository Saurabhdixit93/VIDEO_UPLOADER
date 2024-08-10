export function generateRandomPassword(
  firstName,
  lastName,
  email,
  phoneNumber
) {
  function getRandomChars(str, length) {
    let result = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * str.length);
      result += str[randomIndex];
    }
    return result;
  }

  const firstNamePart = getRandomChars(firstName, 3);
  const lastNamePart = getRandomChars(lastName, 3);
  const emailPart = getRandomChars(email.split("@")[0], 3);
  const phonePart = getRandomChars(phoneNumber, 3);

  // Concatenate all parts and shuffle the characters to create the final password
  const password = (firstNamePart + lastNamePart + emailPart + phonePart)
    .split("")
    .sort(() => Math.random() - 0.5)
    .join("");

  return password;
}

export function generateRandomUsername(
  firstName,
  lastName,
  email,
  phoneNumber
) {
  function getRandomChars(str, length) {
    let result = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * str.length);
      result += str[randomIndex];
    }
    return result;
  }

  const firstNamePart = getRandomChars(firstName, 2);
  const lastNamePart = getRandomChars(lastName, 2);
  const emailPart = getRandomChars(email.split("@")[0], 2);
  const phonePart = getRandomChars(phoneNumber, 2);

  let username = firstNamePart + lastNamePart + emailPart + phonePart;

  if (username.length > 8) {
    username = username.substring(0, 8);
  }

  while (username.length < 8) {
    username += Math.floor(Math.random() * 10);
  }

  return username;
}
