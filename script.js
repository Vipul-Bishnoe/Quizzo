let userName="",questions=[],index=0,score=0,timer,timeLeft=30,startTime;

const db={
html:[
{q:"HTML Stands For _____ ?",o:["HyperText Machine Language","HyperText Markup Language","HyperText Marking Language","HighText Marking Language"],a:1},
{q:"Closing Tag Symbol Is _____ ?",o:["!","\\","/","."],a:2},
{q:"H1 Tag Is Used For _____ ?",o:["Largest Heading","Paragraph","Image","Link"],a:0},
{q:"Br Tag Is Used To Insert _____ ?",o:["Line Break","Heading","Image","Table"],a:0},
{q:"Href Attribute Is Used In A Tag For _____ ?",o:["Creating Hyperlink","Creating Table","Creating Form","Creating Paragraph"],a:0},
{q:"Alt Attribute Is Used With Image Tag For _____ ?",o:["Alternative Text","Table Border","Form Label","List Style"],a:0},
{q:"Ul Tag Creates _____ ?",o:["Ordered List","Unordered List","Row","Heading"],a:1},
{q:"Tr Tag Represents _____ ?",o:["Table Row","Table Column","Table Head","Table Border"],a:0},
{q:"Main Tag Defines _____ ?",o:["Footer Section","Main Content Area","Header Section","Navigation Menu"],a:1},
{q:"Select Tag Creates _____ ?",o:["Textbox","Dropdown List","Button","Heading"],a:1}
],
css:[
{q:"CSS Stands For _____ ?",o:["Computer Style Sheets","Creative Style Sheets","Cascading Style Sheets","Colorful Style Sheets"],a:2},
{q:"Internal Stylesheet Uses Style Tag Inside _____ Section ?",o:["Head","Body","Footer","Title"],a:0},
{q:"Paragraph Text Color Syntax Is _____ ?",o:["P {color:black;}","P=color:black","{P:black}","Color:P:black"],a:0},
{q:"Background Color Property Is _____ ?",o:["Color","Bgcolor","Background-color","Background-style"],a:2},
{q:"ID Selector Starts With _____ ?",o:[".","#","*","@"],a:1},
{q:"Font Size Property Is _____ ?",o:["Font-style","Text-size","Font-size","Size"],a:2},
{q:"Default Position Value Is _____ ?",o:["Static","Relative","Absolute","Fixed"],a:0},
{q:"Space Inside Border Is Called _____ ?",o:["Margin","Padding","Border","Spacing"],a:1},
{q:"CSS Comment Syntax Is _____ ?",o:["// Comment","<!-- Comment -->","/* Comment */","# Comment"],a:2},
{q:"Bold Text Property Is _____ ?",o:["Font-bold","Text-bold","Font-weight:bold","Weight:bold"],a:2}
],
js:[
{q:"Assignment Operator Is _____ ?",o:["*","-","=","X"],a:2},
{q:"Keyword For Constant Variable Is _____ ?",o:["Constant","Var","Let","Const"],a:3},
{q:"Alert Function Syntax Is _____ ?",o:["Msg()","AlertBox()","Alert()","Console.log()"],a:2},
{q:"10 % 3 Equals _____ ?",o:["3","1","0","3.33"],a:1},
{q:"Power Operator Is _____ ?",o:["^","*","**","Exp"],a:2},
{q:"++ Operator Means _____ ?",o:["Add 2","Increase By 1","Multiply By 2","Compare"],a:1},
{q:"Loose Equality Operator Is _____ ?",o:["=","==","===","!="],a:1},
{q:"Strict Equality Operator Is _____ ?",o:["==","!==","Equal","==="],a:3},
{q:"5 > 10 Returns _____ ?",o:["True","False","Undefined","Null"],a:1},
{q:"Logical AND Operator Is _____ ?",o:["&","||","&&","!"],a:2}
]
};

const shuffle=a=>a.sort(()=>Math.random()-.5);

function toggleTheme(){
document.body.classList.toggle("dark");
themeIcon.innerText=document.body.classList.contains("dark")?"☀️":"🌙";
}

function home(){
app.innerHTML=`
<h2 style="text-align:center;">Enter Your Name :</h2><br>

<div style="display:flex;justify-content:center;">
<input id="name" placeholder="Your name">
</div>

<br>

<h2 style="text-align:center;">Select Topic :</h2><br>

<div class="topic-list">
<button class="primary" onclick="startQuiz('html')">HTML</button>
<button class="primary" onclick="startQuiz('css')">CSS</button>
<button class="primary" onclick="startQuiz('js')">JavaScript</button>
<button class="primary" onclick="startQuiz('fusion')">Fusion (Mixed)</button>
</div>
`;
}
function startQuiz(topic){
userName=document.getElementById("name").value.trim() || "Guest";
questions=topic==="fusion"
?[...db.html.slice(0,3),...db.css.slice(0,3),...db.js.slice(0,4)]
:[...db[topic]];

questions=shuffle(questions);
index=0;score=0;startTime=new Date();timeLeft=30;

timer=setInterval(()=>{
timeLeft--;
timerBox.innerText="Time Left: "+timeLeft+" sec";
if(timeLeft<=0){clearInterval(timer);showResult();}
},1000);

showQuestion();
}

function showQuestion(){
clearInterval(timer);
timeLeft=30;

timer=setInterval(()=>{
timeLeft--;
document.getElementById("timerBox").innerText="Time Left: "+timeLeft+" sec";

if(timeLeft<=0){
clearInterval(timer);
showResult();
}

},1000);
if(index>=questions.length){clearInterval(timer);return showResult();}
let q=questions[index],opts=shuffle([...q.o]);
q.correctIndex=opts.indexOf(q.o[q.a]);

app.innerHTML=`
<h2>${userName} | Question ${index+1} of 10</h2>
<div class="timer" id="timerBox">Time Left: ${timeLeft} sec</div>
<div class="question">${index+1}. ${q.q}</div>
<div class="options">
${opts.map((v,i)=>`<button class="option" onclick="checkAnswer(${i})">${v}</button>`).join("")}
</div>`;
}

function checkAnswer(selectedIndex){

let buttons=document.querySelectorAll(".option");
let correctIndex=questions[index].correctIndex;
buttons.forEach(btn=>btn.disabled=true);
buttons.forEach((btn,i)=>{

if(i===correctIndex){
btn.style.background="green";
btn.style.color="#fff";
}

if(i===selectedIndex && selectedIndex!==correctIndex){
btn.style.background="red";
btn.style.color="#fff";
}

});
if(selectedIndex===correctIndex) score++;
setTimeout(()=>{
index++;
showQuestion();
},1000);

}

function showResult(){
clearInterval(timer);
let total=(new Date()-startTime)/1000;
let acc=(score/10)*100;
let speed=(10/total*60).toFixed(2);

app.innerHTML=`
<h1>Result Summary :</h1><br>
Name: ${userName}<br><br>
Score: ${score} / 10<br><br>
Accuracy: ${acc.toFixed(2)}%<br><br>
Speed: ${speed} questions/min<br><br>
<button class="primary" onclick="home()">Restart Quiz</button>`;
}

home();
