const todaydate = document.querySelector(".current-time");
const clearallbtn = document.querySelector(".clear");
const listitem = document.querySelector(".list");
const todolist = document.querySelector(".todolist");
 const tabletodo = document.querySelector(".tabletodo");
const todo = document.querySelector("#todo");
const timeevent = document.querySelector("#timeevent");
const ctdown = document.querySelector(".countdown");
console.log(ctdown);

const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough"; 

const current_time = new Date();
const currentdate = ()=>{
    let option = {
        weekday:'long',
        month:"short",
        day:'numeric',
    }
    todaydate.innerHTML = current_time.toLocaleDateString("en-US",option)
}
currentdate();

//adding a todo list
const timeposted = current_time.toLocaleDateString("en-US",{
    weekday:'short',
        month:"short",
        day:'numeric',
        hour:"numeric",
        minute:"numeric",
        second:"numeric"
})
let todoevent = [];
let id = 0;
//fetch from localstorage
let data = localStorage.getItem("Todo list");
if (data) {
    //if data exist from storage ,parse it
     todoevent = JSON.parse(data);
     id = todoevent.length;
     displayList();

}else{
//if no data return empty array and id zero
    todoevent = [];
    id = 0;
}
clearallbtn.addEventListener("click",(e)=>{
    localStorage.clear();
    location.reload();
})
function displayList(){
    todoevent.forEach(item=>{
addtodo(item.nameevent,item.whenevent,item.timeposted,item.id,item.done,item.trash);
    })
}

 function addtodo(todo,time,dday,ctdwn,id,done,trash){
if (trash) {
    return;
}
    const DONE  = done ? CHECK:UNCHECK;
    const LINE = done ? LINE_THROUGH: " ";
const html = `
<tr class="container-list">
<td class="check-list">
<i class="fa ${DONE}  co " job="complete" id=${id}></i>
        </td>
        <td class="list">
    <h3 class="text ${LINE}">${todo}</h3>
        </td>
        <td class="timeposted">
    <h3>${time}</h3>
        </td>
        <td class="time-event">
    <h3 class="text ${LINE}">${dday}</h3>
        </td>
        <td class="countdown">
    <h3>${ctdwn}</h3>
        </td>
        <td class="trash">
        <i class="fa fa-trash-o de" id=${id} job="delete"></i>
        </td>
    </tr>
`;
const position = "beforeend";
tabletodo.insertAdjacentHTML(position,html);
}
//set an empty array

let todovalue;
let eventdate;
//add eventlistener
document.addEventListener("keyup",(e)=>{
    e.preventDefault();
  if (e.keyCode == 13) {
      todovalue = todo.value;
      eventdate = timeevent.value.split("-").join(" ");
      countdown = getCountdown();
  if (todovalue && eventdate) {
      addtodo(todovalue,timeposted,eventdate,countdown,id,false,false)
      todoevent.push({
          nameevent:todovalue,
          timeposted:timeposted,
          whenevent:eventdate,
          countdown:countdown,
           id:id,
           done:false,
           trash:false
      }); 
    }
  todovalue.value = "";
eventdate.value = "";
id++
//add to localstorage
localStorage.setItem("Todo list",JSON.stringify(todoevent))
}
getCountdown();
});

function getCountdown(){
    const trial = eventdate;
    const newDate  = new Date(trial);
    let totalSeconds = (newDate - current_time) / 1000 ;
     //console.log(totalSeconds);
     //we divide the entire seconds by 3600s which is the seconds per hour
     let days = Math.floor(totalSeconds / 3600/24);
     let hours = Math.floor(totalSeconds / 3600 %24);
     let minutes = Math.floor(totalSeconds /60) %60;
     let seconds = Math.floor(totalSeconds) %60;
     console.log(days,hours,minutes,seconds);
    //  ctdown.innerHTML = `${days} ${hours} ${minutes} ${seconds}`;
     return `${days} ${hours} ${minutes} ${seconds}`
}

// setInterval(() => {
//     getCountdown();
// }, 1000);
//create a function to do the check ,uncheck and line trhough
const completeTodo = (ele)=>{
ele.classList.toggle(CHECK);
ele.classList.toggle(UNCHECK);
document.querySelectorAll(".text").classList.toggle(LINE_THROUGH);
//change in both cases on changing
todoevent[ele.id].done = todoevent[ele.id].done ? false:true;
}

//DELETE FUNCTION
const removelist = (ele)=>{
    ele.parentNode.parentNode.removeChild(ele.parentNode);
    //update the array
    todoevent[ele.id].trash = true;
}

//click event function
tabletodo.addEventListener("click",(e)=>{
    let element = e.target;
    console.log(element.attributes);
     const elementJOB = element.attributes.job.value;
     console.log(elementJOB);
     if (elementJOB === "complete") {
         completeTodo(element)
     }
     if (elementJOB === "delete") {
         removelist(element);
     }
     //set localstorage
     localStorage.setItem("Todo list",JSON.stringify(todoevent))
})
console.log(todoevent)
 