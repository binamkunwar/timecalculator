let taskList=[]


const handleOnSubmit = (e)=>{

    // const elm = document.getElementById("task");
    const newForm = new FormData(e)

    const task = newForm.get("task");
    const hours = newForm.get("hours");
console.log(hours,"jojojojojojo")
const obj={
    task,
    hours,
    id:randomIdGenerator()
}
    taskList.push(obj)
displayEntryList()
};


// to display

const displayEntryList = () => {
    // console.log(taskList,"iouoifeuihgurrgu");

    let str="";
    const entryElm = document.getElementById("entryList")
    taskList.map((item,i)=>{str +=`<tr>
      <td >${i + 1}</td>
      <td>${item.task}</td>
      <td>${item.hours}</td>
      <td class="text-end">
        <button onclick="handleOnDelete('${item.id}')" 
        class="btn btn-danger"><i class="fa-solid fa-trash"></i></button>
        <button class="btn btn-success"><i class="fa-solid fa-circle-arrow-right"></i></button>

      </td>
    </tr>`})
   
    entryElm.innerHTML=str;
    
}


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
    // console.log(id);
    }
     
}

