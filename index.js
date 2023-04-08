//This code needs some improvement.  This code has one feature called setIndicator, whose JavaScript and CSS code is only half written.
const inputSlider=document.querySelector("[data-lengthSlider]");
const lengthDisplay=document.querySelector("[data-lengthNumber]")

const passwordDisplay=document.querySelector("[data-passwordDisplay]");
const copyBtn=document.querySelector("[data-copy]");
const copyMsg=document.querySelector("[data-copyMsg]");
const uppercaseCheck=document.querySelector("#upperCase");
const lowercaseCheck=document.querySelector("#lowerCase");
const numbersCheck=document.querySelector("#numbers");
const symbolsCheck=document.querySelector("#symbols");
const indicator=document.querySelector("[data-indicator]");
const generateBtn=document.querySelector(".generateButton");
const allCheckBox=document.querySelectorAll("input[type=checkbox]");
const symbol="!#$%&'()*+,-./:;<=>?@[\]^_`{|}~";
let password="";
let passwordLength=12;
let checkCount=0;

let handelSlider=()=>{
    inputSlider.value=passwordLength;
    lengthDisplay.innerHTML=inputSlider.value;
   }
 handelSlider();
   
 inputSlider.addEventListener('input',()=>{
   passwordLength=inputSlider.value;
   handelSlider();
 })
 
   
  setIndicator=(color)=>{
   indicator.style.backgroundColor=color;
}


 const getRndInteger=(min,max)=>{
    return Math.floor(Math.random()*(max-min)+min)
 }

 const getRndIntegerNumber=()=>{
    return getRndInteger(0,9);
 }

 const generateLowerCase=()=>{
   return String.fromCharCode(getRndInteger(97,123));
 }

 const generateUpperCase=()=>{
    return String.fromCharCode(getRndInteger(65,90));
  }

 const generateSymbol=()=>{
   const randNum= getRndInteger(0,symbol.length);
   return symbol.charAt(randNum)
 }

 function calcStrength() {
   let hasUpper = false;
   let hasLower = false;
   let hasNum = false;
   let hasSym = false;
   if (uppercaseCheck.checked) hasUpper = true;
   if (lowercaseCheck.checked) hasLower = true;
   if (numbersCheck.checked) hasNum = true;
   if (symbolsCheck.checked) hasSym = true;
 
   if (hasUpper && hasLower && (hasNum || hasSym) && passwordLength >= 8) {
     setIndicator("#0f0");
   } else if (
     (hasLower || hasUpper) &&
     (hasNum || hasSym) &&
     passwordLength >= 6
   ) {
     setIndicator("#ff0");
   } else {
     setIndicator("#f00");
   }
}
 async function copyContent(){
  try{
   await navigator.clipboard.writeText(passwordDisplay.value);
   copyMsg.innerText = "copied";
  }
  catch{
   copyMsg.innerText="Failed";
  }
  copyMsg.classList.add("active");
  setTimeout(()=>{
   copyMsg.classList.remove("active");
  },2000);
  
 }
 function shufflePassword(array) {
   //Fisher Yates Method
   for (let i = array.length - 1; i > 0; i--) {
       const j = Math.floor(Math.random() * (i + 1));
       const temp = array[i];
       array[i] = array[j];
       array[j] = temp;
     }
   let str = "";
   array.forEach((el) => (str += el));
   return str;
}


   handelCheckBoxChange=()=>{
   checkCount=0;
   allCheckBox.forEach((checkbox)=>{
   if(checkbox.checked)
     checkCount++;
   });
   
   if(password<checkCount){
      passwordLength=checkCount;
      handelSlider();
   }
   }

   allCheckBox.forEach((checkbox)=>{
      checkbox.addEventListener('change', handelCheckBoxChange);
   })
      
   

   inputSlider.addEventListener('input', (e) => {
      passwordLength = e.target.value;
      handelSlider();
   })

 copyBtn.addEventListener('click',()=>{
   if(lengthDisplay.innerHTML){
      copyContent();
   }});

 generateBtn.addEventListener('click',()=>{
   if(checkCount<=0) return;

   if(checkCount == 0) 
        return;

   if(passwordLength<checkCount){
      passwordLength=checkCount;
      handelSlider();
   }


 password="";  

let funcArr=[];

if(uppercaseCheck.checked)
funcArr.push(generateUpperCase);

if(lowercaseCheck.checked)
funcArr.push(generateLowerCase);

if(symbolsCheck.checked)
funcArr.push(generateSymbol);

if(numbersCheck.checked)
funcArr.push(getRndIntegerNumber);

for(let i=0; i<funcArr.length; i++){
   password+=funcArr[i]();
}

for(let i=0; i<passwordLength-funcArr.length; i++){
let randIndex=getRndInteger(0,funcArr.length);
password +=funcArr[randIndex]();
}

password=shufflePassword(Array.from(password));

passwordDisplay.value=password;
calcStrength();


})
