export const countWords = (str) => {
     // Trim whitespace from the beginning and end of the string
  str = str.trim();
  
  // Split the string into an array of words using a regular expression
  let words = str.split(/\s+/);
  
  // Return the length of the words array
  return words.length;
  }