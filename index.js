console.log('checking')
const inputSlider=document.querySelector("[data-lengthSlider]");
const lengthDisplay=document.querySelector("[data-lengthNumber]")

const passwordDisplay=document.querySelector("[data-passwordDisplay]");
const copyBtn=document.querySelector("[data-copy]");
const copyMsg=document.querySelector("[data-coyMsg");
const uppercaseCheck=document.querySelector("#upperCase");
const lowercaseCheck=document.querySelector("#lowerCase");
const numberCheck=document.querySelector("#numbers");
const symbolsCheck=document.querySelector("#symbols");
const indicator=document.querySelector("[data-indicator]");
const generateBtn=document.querySelector(".generateButton");
const allCheckBox=document.querySelectorAll("input[type=checkbox]");

let password ="";
let passwordLength=15;
let checkcount=1;



const handleSlider=()=>{
    inputSlider.value=passwordLength;
    lengthDisplay.innerText=passwordLength;
}
handleSlider();