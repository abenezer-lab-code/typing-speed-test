const textContainer = document.querySelector(".paragraph");
const userInput = document.querySelector(".textarea");
const wpmDisplay = document.querySelector(".wpm-display");
const accuracyDisplay = document.querySelector('.accuracy-dispaly');
const textArea = document.querySelector(".text-area")
const easyBtn = document.querySelector(".easy-btn")
const hardBtn = document.querySelector(".hard-btn")
const mediumBtn = document.querySelector(".medium-btn")
const timedbtn = document.querySelector(".timed-btn");
const passageBtn = document.querySelector(".passage-btn")
const startBtn = document.querySelector(".start-btn")
const mobileDifficultControl = document.querySelector(".mobile-dificult-control")
const mobileModeControl = document.querySelector(".mobile-mode-control")
const modeInput = mobileModeControl.querySelectorAll("input[type='radio']")
const dificultInputs = mobileDifficultControl.querySelectorAll("input[type='radio']")
const difficlutyDropDownBtn = document.querySelector(".difficultyBtn")
const textContainerPlace = document.querySelector(".text-container")
const StartTypingPlace = document.querySelector(".start-typing")
const modeDropDownBtn = document.querySelector(".modebtn")
const timeDisplay = document.querySelector(".time-display");
const UserSettingAndPreffrence = document.querySelector(".user-record-and-setting")
const result = document.querySelector(".result");
const personalBest = document.querySelector(".personal-best-result-display")
let textparagraph ="";
let isTimed = true;
let typingSpeed = 0;
let userAccuracy = 100;
let wrongTypedLength=0;
let TotaltypedText=0;
let RigthtypedLength =0;
let reminigTime;
let startTime = null;
let num=0;
let countType = 0;
const userResults = [];

const  getText = async (type="easy")=>{
try{
const data = await fetch("./data.json");
const result = await data.json();

const specificParagraph = result[type]

let randomText = specificParagraph[randomNumber(specificParagraph.length)].text
displayText(randomText)
textparagraph = randomText;
}

catch{
    console.log("error")
}


}

getText("hard")

const randomNumber = (range)=>{
return Math.floor(Math.random() * range);

}

const calculateSpeed=(orginalDate)=>{

const date = new Date();
const pastDate = date - orginalDate;
 const dateInminute = (pastDate / 1000) / 60;
let wpm = Math.floor((TotaltypedText/5)/dateInminute)

if(dateInminute < 0.5) return 0

return wpm

}
const isCorrect = (paragraph,usertext)=>{
    
const lastCharacterIndex = usertext.length-1;

const lastCharacter = usertext[lastCharacterIndex];

if(paragraph[lastCharacterIndex] === lastCharacter) return true
else{

return false
}

}

const calculateAccuracy = (paragraph,usertext)=>{


 
   if(!isCorrect(paragraph,usertext)){
wrongTypedLength+=1;

   }

   RigthtypedLength = TotaltypedText - wrongTypedLength;
const wrongTypedInPercentage = (wrongTypedLength/TotaltypedText) * 100;
const accuracy = 100 - wrongTypedInPercentage;

return Math.floor(accuracy)

}


const heiLightELements = (textparagraph,usertext)=>{
const lastCharacterIndex = usertext.length-1;

 num =usertext.length-1;
const lastCharacter = usertext[lastCharacterIndex];

const element = document?.getElementById(`char-${num}`);

if(isCorrect(textparagraph,usertext) && element!==undefined){
element.style.color="green"

}else{

   element.style.color="red" 
}

}
const displayText = (data)=>{
  
    textContainer.innerHTML=""
let count=0
for(const value of data){

 textContainer.innerHTML += `<span id="char-${count++}">${value}</span>`
 }

}


const startTyping = ()=>{

easyBtn.disabled = true
mediumBtn.disabled = true;
hardBtn.disabled = true;
timedbtn.disabled = true;
passageBtn.disabled = true;
startBtn.parentElement.classList.add("display")
textContainerPlace.classList.add("display")
userPrefernce()
userInput.focus()

}

const userPrefernce = ()=>{

if(isTimed){

startTime = new Date();
setTimeout(function(){
  typeFinish(typingSpeed,userAccuracy)
  resultDisplayFunction()


clearInterval(myIntreval)
},60000)

 let timeRemainInMinute = 60
const myIntreval = setInterval(function(){



 timeRemainInMinute-=1
timeDisplay.textContent = timeRemainInMinute

},1000)



}
else{
startTime = new Date();

if(userInput.value.length >= textparagraph.length){
  typeFinish(typingSpeed,userAccuracy)
  resultDisplayFunction()
clearInterval(myIntreval)
}
const myIntreval = setInterval(function(){
const newTime = new Date()
const diffrence = newTime - startTime;
console.log(diffrence)
const timeInSecond = String(Math.floor((diffrence/1000) % 60)).padStart(2,'0')
const timeInMinute  = String(Math.floor(((diffrence/1000/60)%60))).padStart(2,'0')
timeDisplay.textContent = `${timeInMinute}:${timeInSecond}`

},1000)


}

}

const getResults = ()=>{
let result
try{
 const results = JSON.parse(localStorage.getItem("array"))
 if(results === null){
  localStorage.setItem("array",JSON.stringify([]));
  result = JSON.parse(localStorage.getItem("array"))
 }
 else{
  result = JSON.parse(localStorage.getItem("array"))
 }
}

catch{
  result = []

}
return result
}
const displayHighScore =  ()=>{
const results = getResults()
if(results.length===0){
  return 0
}

else {
  let max = results[0].wpm
  results.forEach(score=>{
    if(score.wpm>max) max = score.wpm
  })
return max
}
}
personalBest.textContent = displayHighScore()
const typeFinish = (wpm,accuracy,characters)=>{

const results = getResults()

const obj = {
wpm:wpm,
accuracy:accuracy,
characters:characters
}
results.push(obj)
localStorage.setItem("array",JSON.stringify(results))

}
const restart = () =>{
typingSpeed = 0;
userAccuracy = 100
typingSpeed = 0;
userAccuracy = 100;
wrongTypedLength=0;
TotaltypedText=0;
num=0;
countType = 0
wpmDisplay .textContent =0;
accuracyDisplay.textContent = 100;
textparagraph =""
easyBtn.disabled = false;
mediumBtn.disabled = false;
hardBtn.disabled = false;
timedbtn.disabled = false;
passageBtn.disabled = false;
textContainerPlace.style.display = "block"
startBtn.parentElement.classList.remove("display")
textContainerPlace.classList.remove("display")
easyBtn.classList.remove("btn-selcted");
hardBtn.classList.add("btn-selcted")
mediumBtn.classList.remove("btn-selcted");       

UserSettingAndPreffrence.style.display = "grid";

userInput.value =""
getText("hard")
}





const resultDisplayFunction = ()=>{
let heading;
let paragraph;
let headingImageSrc;
let leftImageSrc;
let rightImageSrc;
let bottomImageSrc;

const results = getResults();
let isHighScoreScorred = true
const currentResult = results[results.length-1];
for(let i=0;i<results.length;i++){

  if(currentResult.wpm < results[i].wpm){

    isHighScoreScorred = false
  console.log(currentResult.wpm,"current")
  console.log(results[i].wpm)
  };

}


if(results.length <2){
 personalBest.textContent = currentResult.wpm;
heading="Baseline Established";
paragraph = "You've set the bar.Now the real challange begins-time to beat it.";
headingImageSrc = "./assets/images/icon-completed.svg";
leftImageSrc = "./assets/images/pattern-star-2.svg";
rightImageSrc = "./assets/images/pattern-star-1.svg";
bottomImageSrc = "no"

}

else if(isHighScoreScorred && results.length > 1){
personalBest.textContent = currentResult.wpm;
heading="High Score Smashed!"
paragraph = "You are getting faster. That was increadible typing.";
headingImageSrc ="./assets/images/icon-new-pb.svg";
leftImageSrc="no"
rightImageSrc="no"
bottomImageSrc ="./assets/images/pattern-confetti.svg"
}
else{
heading="Test Complete!"
paragraph = "Solid run. Keep pushing to beat your high score."
headingImageSrc = "./assets/images/icon-completed.svg";
leftImageSrc = "./assets/images/pattern-star-2.svg";
rightImageSrc = "./assets/images/pattern-star-1.svg";
bottomImageSrc = "no"
}

textContainerPlace.style.display = "none"

UserSettingAndPreffrence.style.display = "none"

const htmlContent =`
<div class="result-section">
<img src="${headingImageSrc}" class="heading-img"/>
<img src="${rightImageSrc}" class="right-img"/>

<h1 class="result-heading">${heading}</h1>
<p class="paragraph-heading">${paragraph}</p>
<div class="detail-result">
<div class="wpm-show">
<p>WPM</p>
<p>${typingSpeed}</p>
</div>
<div class="accuracy-show">
<p>Accuracy</p>
<p>${userAccuracy}</p>
</div>
<div class="character-show">
<p>Characters</p>
<p>${RigthtypedLength}/${wrongTypedLength}</p>
</div>
</div>
<button class="restartBtn btn">Beat this score <img src="${"assets/images/icon-restart.svg"}" aria-hidden="true"/></button>

<img src="${leftImageSrc}" class="left-img"/>

<img src="${bottomImageSrc}" class="bottom-img"/>

</div>

`
isHighScoreScorred=false;
 result.innerHTML = htmlContent
const restartBtn = document.querySelector(".restartBtn")

restartBtn.addEventListener("click",()=>{


  const resultSection = document.querySelector(".result-section")
  resultSection.style.display="none";
  result.innerHTML=""
restart()


})


}

startBtn.addEventListener("click",startTyping,{once:true})
userInput.addEventListener("click",startTyping,{once:true})

userInput.addEventListener("input",()=>{
TotaltypedText++;

let input = userInput.value
  
typingSpeed =  calculateSpeed(startTime)
userAccuracy = calculateAccuracy(textparagraph,input);
wpmDisplay.textContent =typingSpeed;
accuracyDisplay.textContent = userAccuracy;
heiLightELements(textparagraph,input)


})
userInput.addEventListener("keydown",(e)=>{
if(e.key === 'Backspace'){
    
RigthtypedLength-=1;
//TotaltypedText+=1
const element = document?.getElementById(`char-${num}`);
element.style.color="white"

}

})


easyBtn.addEventListener("click",()=>{


     easyBtn.classList.add("btn-selcted");
    hardBtn.classList.remove("btn-selcted")
      mediumBtn.classList.remove("btn-selcted");
getText("easy")
})

hardBtn.addEventListener("click",()=>{

     easyBtn.classList.remove("btn-selcted");
    hardBtn.classList.add("btn-selcted")
      mediumBtn.classList.remove("btn-selcted");
getText("hard")
})

mediumBtn.addEventListener("click",()=>{

     easyBtn.classList.remove("btn-selcted");
    hardBtn.classList.remove("btn-selcted")
      mediumBtn.classList.add("btn-selcted");
getText("medium")

})
 difficlutyDropDownBtn.addEventListener("click",()=>{
mobileDifficultControl.classList.toggle("display")

 })
dificultInputs.forEach(function(element){
  
element.addEventListener("click",()=>{

getText(element.value)
 difficlutyDropDownBtn.textContent = element.value;
 mobileDifficultControl.classList.remove("display")
  })
})

  modeDropDownBtn.addEventListener("click",()=>{
mobileModeControl.classList.toggle("display")

 })

 modeInput.forEach(function(element){
  
  element.addEventListener("click",()=>{

 modeDropDownBtn.textContent = element.value;
 mobileModeControl.classList.remove("display")

  })
})

timedbtn.addEventListener("click",()=>{
  isTimed=true
  passageBtn.classList.remove("btn-selcted")
  timedbtn.classList.add("btn-selcted");
})
passageBtn.addEventListener("click",()=>{
  isTimed=false
  timedbtn.classList.remove("btn-selcted")
  passageBtn.classList.add("btn-selcted");
})

