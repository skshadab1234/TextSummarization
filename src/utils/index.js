export const countWords = (str) => {
     // Trim whitespace from the beginning and end of the string
  str = str.trim();
  
  // Split the string into an array of words using a regular expression
  let words = str.split(/\s+/);
  
  // Return the length of the words array
  return words.length;
  }

  export const convertToNormalText = (text) => {
   // replace all tab characters with a single space
   text = text.replace(/\t+/g, ' ');
 
   // replace all newline characters with a space
   text = text.replace(/\n+/g, ' ');
 
   // remove any double spaces
   text = text.replace(/\s\s+/g, ' ');
 
   // return the modified text
   return text.trim();
 }
 