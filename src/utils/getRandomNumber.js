// src/utils/getRandomNumber.js
const getRandomNumber = (min, max) => {
   return Math.floor(Math.random() * (max - min + 1) + min);
 };
 
 export default getRandomNumber; // Assigned to a variable first

