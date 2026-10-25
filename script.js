let taskList=[]

const hoursPerWeek =24 * 7;

const handleOnSubmit = (e)=>{

    // const elm = document.getElementById("task");
    const newForm = new FormData(e)

    const task = newForm.get("task");
    const hours = +newForm.get("hours");
console.log(hours,"jojojojojojo")
const obj={
    task,
    hours,
    id:randomIdGenerator(),
    type:"entry",

}

//  check if there are eough hours left
const existingTtlHrs = taskTotal();
if(existingTtlHrs + hours >hoursPerWeek){
    return alert("Sorry not enought time to fit this task from last week.")
}


console.log(taskList)
    taskList.push(obj)
displayEntryList()
};


// to display

const displayEntryList = () => {
    // console.log(taskList,"iouoifeuihgurrgu");

    let str="";
    const entryElm = document.getElementById("entryList")
   
   const entryList = taskList.filter((item)=> item.type==='entry')
   
   entryList.map((item,i)=>{str +=`<tr>
      <td >${i + 1}</td>
      <td>${item.task}</td>
      <td>${item.hours}</td>
      <td class="text-end">
        <button onclick="handleOnDelete('${item.id}')" 
        class="btn btn-danger"><i class="fa-solid fa-trash"></i></button>
        <button  onclick ="switchTask('${item.id}','bad')"class="btn btn-success"><i class="fa-solid fa-circle-arrow-right"></i></button>

      </td>
    </tr>`})
   
    entryElm.innerHTML=str;
    taskTotal();
    
}


// bad list display

const displayBadList = () => {
    // console.log(taskList,"iouoifeuihgurrgu");

    let str="";
    const badElm = document.getElementById("badList")
   
   const badList = taskList.filter((item)=> item.type==="bad")
   
   badList.map((item,i)=>{str +=`<tr>
      <td >${i + 1}</td>
      <td>${item.task}</td>
      <td>${item.hours}</td>
      <td class="text-end">
        
        <button  onclick ="switchTask('${item.id}','entry')"class="btn btn-warning"><i class="fa-solid fa-circle-arrow-left"></i></button>
        <button onclick="handleOnDelete('${item.id}')" 
        class="btn btn-danger"><i class="fa-solid fa-trash"></i></button>
      </td>
    </tr>`})
   
    badElm.innerHTML=str;
      document.getElementById('savedHrsElm').innerText = badList.reduce((acc,item)=> acc + item.hours,0)}


const randomIdGenerator =(length = 6 )=>{
    const str =
    "qwertyuiopasdfghjkzxcvbnQWEWRETYUIOPASDFGHJKJLZXCVBNM1234567890";
    
    let id="";

    for(let i=0; i < 6; i++){
       const randomIndex=Math.floor(
        Math.random() * str.length);//

        id += str[randomIndex]


    }
    return id;
}

const handleOnDelete =(id) =>{
    if(window.confirm("Are you sure, you want to delete this?")){
        taskList =taskList.filter((item)=> item.id !== id)
    displayEntryList()
    displayBadList();
    // console.log(id);
    }
     
}


// to switch between lists
const switchTask=(id,type)=>{
console.log(id,type)
taskList=taskList.map((item)=>{


    if(item.id === id){
        item.type = type
    }
    console.log(item);
    return item
})
displayEntryList();
displayBadList();
}

const taskTotal =()=>{
    const ttlHr=taskList.reduce((acc,item)=>{
    return acc + item.hours;
},0)
document.getElementById("ttlHrs").innerText= ttlHr
return ttlHr
}