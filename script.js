const app=document.getElementById("app");
const themeBtn=document.getElementById("themeBtn");

themeBtn.onclick=()=>{
document.body.classList.toggle("dark");
themeBtn.textContent=
document.body.classList.contains("dark")?"☀️":"🌙";
};

let userName="";
let questions=[];
let index=0;
let score=0;
let timer;
let timeLeft=30;
let userAnswers=[];

const db={

html:[
{q:"HTML Stands For ?",o:["HyperText Machine Language","HyperText Markup Language","HyperText Marking Language","HighText Marking Language"],a:1},
{q:"Closing Tag Symbol ?",o:["!","\\","/","."],a:2},
{q:"Largest Heading Tag ?",o:["h6","h1","head","title"],a:1},
{q:"Line Break Tag ?",o:["br","lb","break","hr"],a:0},
{q:"Hyperlink Attribute ?",o:["href","src","link","ref"],a:0},
{q:"Image Alternative Text ?",o:["title","alt","src","href"],a:1},
{q:"Unordered List Tag ?",o:["ol","ul","li","dl"],a:1},
{q:"Table Row Tag ?",o:["td","th","tr","row"],a:2},
{q:"Main Content Tag ?",o:["header","footer","main","nav"],a:2},
{q:"Dropdown Tag ?",o:["input","select","option","textarea"],a:1}
],

css:[
{q:"CSS Stands For ?",o:["Computer Style Sheets","Creative Style Sheets","Cascading Style Sheets","Colorful Style Sheets"],a:2},
{q:"Internal CSS Tag Location ?",o:["head","body","footer","meta"],a:0},
{q:"Text Color Property ?",o:["font-color","text-color","color","bgcolor"],a:2},
{q:"Background Property ?",o:["background","bgcolor","background-color","color"],a:2},
{q:"ID Selector Symbol ?",o:[".","#","*","@"],a:1},
{q:"Font Size Property ?",o:["font-style","text-size","font-size","size"],a:2},
{q:"Default Position Value ?",o:["absolute","fixed","static","relative"],a:2},
{q:"Inside Border Space ?",o:["margin","padding","spacing","border"],a:1},
{q:"CSS Comment Syntax ?",o:["// comment","&lt;!-- comment --&gt;","/* comment */","# comment"],a:2},
{q:"Bold Text Property ?",o:["font-bold","weight:bold","font-weight:bold","bold"],a:2}
],

js:[
{q:"Assignment Operator ?",o:["=","==","===","!="],a:0},
{q:"Constant Keyword ?",o:["var","let","const","constant"],a:2},
{q:"Alert Function ?",o:["msg()","alert()","prompt()","log()"],a:1},
{q:"10 % 3 Equals ?",o:["1","0","3","2"],a:0},
{q:"Power Operator ?",o:["^","**","*","pow"],a:1},
{q:"++ Means ?",o:["increase by 1","increase by 2","multiply","compare"],a:0},
{q:"Loose Equality ?",o:["=","==","===","!="],a:1},
{q:"Strict Equality ?",o:["==","===","!=","="],a:1},
{q:"5 > 10 Returns ?",o:["true","false","null","undefined"],a:1},
{q:"Logical AND ?",o:["&","&&","||","!"],a:1}
]

};

function shuffle(arr){
return arr.sort(()=>Math.random()-.5);
}

function home(){
app.innerHTML=`
<h2 align="center">Enter Your Name</h2>
<div style="text-align:center">
<input id="name" placeholder="Your name">
</div>

<br>

<h2 align="center">Select Topic</h2>

<div class="topic-list">
<button class="primary" onclick="startQuiz('html')">HTML</button>
<button class="primary" onclick="startQuiz('css')">CSS</button>
<button class="primary" onclick="startQuiz('js')">JavaScript</button>
<button class="primary" onclick="startQuiz('fusion')">Fusion (Mixed)</button>
</div>
`;
}

function startQuiz(topic){

let input=document.getElementById("name");
userName=input.value.trim()||"Guest";

questions=topic==="fusion"
?[...db.html.slice(0,3),
...db.css.slice(0,3),
...db.js.slice(0,4)]
:[...db[topic]];

questions=shuffle(questions);

index=0;
score=0;
userAnswers=[];
timeLeft=30;

clearInterval(timer);

timer=setInterval(()=>{

timeLeft--;

let t=document.getElementById("timerBox");

if(t) t.textContent="Time Left: "+timeLeft+" sec";

if(timeLeft<=0){
clearInterval(timer);
showResult();
}

},1000);

showQuestion();
}

function showQuestion(){

if(index>=questions.length){
showResult();
return;
}

let q=questions[index];

app.innerHTML=`
<h3>${userName} | Question ${index+1} of ${questions.length}</h3>

<div class="timer" id="timerBox">
Time Left: ${timeLeft} sec
</div>

<p>${q.q}</p>

${q.o.map((v,i)=>
`<button class="option" onclick="answer(${i})">${v}</button>`
).join("")}
`;
}

function answer(choice){

userAnswers.push(choice);

if(choice===questions[index].a) score++;

index++;

showQuestion();
}

function showResult(){

clearInterval(timer);

let review="";

questions.forEach((q,i)=>{

let user=userAnswers[i];
let correct=q.a;

review+=`
<div class="result-card">
<b>Q${i+1}:</b> ${q.q}<br><br>

Your Answer:
<span class="${user===correct?"correct":"wrong"}">
${q.o[user]||"Not Attempted"}
</span>

<br>

Correct Answer:
<span class="correct">
${q.o[correct]}
</span>
</div>
`;
});

app.innerHTML=`
<h2>Result Summary</h2>

Name: ${userName}<br>
Score: ${score}/${questions.length}<br><br>

${review}

<button class="primary" onclick="home()">Restart Quiz</button>
`;
}

home();
