 import '../assets/css/style.css';

// TODO: ADD DATE TIME METHOD ALSO


// const btn = document.querySelector(".test");
// btn.addEventListener('click' , () => {
//     console.log("clickes");
// })


const form = document.forms.todos;
const input = form.elements.todo;
const time = form.elements.Time;
const list = document.querySelector('.todos-list');
const count = document.querySelector('.todos-count')
const clear = document.querySelector('.todos-clear')
const clearAll = document.querySelector('#todos-clear-two');

let works = JSON.parse(localStorage.getItem('works')) || [];


function addToDOM(works){

    let asString = "";

    works.forEach((works , index) => {

        asString += `
        <li data-id = "${index}"${works.status ? ' class="todos-complete"' : ''}>
        <input type="checkbox"${works.status ? ' checked' : ''}> 
            <span> ${works.label}</span> 
            <span> ${works.timeval}</span>
            <button type = "button"></button>
        </li>
        `
    });

    list.innerHTML = asString;
    count.innerHTML = works.filter(todo => !todo.status).length ;
    // clear.style.display = works.filter(todo => todo.complete).length
    // ? 'block'
    // : 'none';
}


function addTodo(event){
    

    event.preventDefault();
    const label = input.value.trim();
    if(label == ""){
        alert("add something");
        return;
    }
    const status = false;
    const timeval = time.value;
    // console.log(timeval);
    works = [
        ...works,
        {
            label,
            status,
            timeval
            
        }
    ]
    console.log(works);
    addToDOM(works);
    store(works);


    input.value = "";
    console.log(typeof(timeval))
    time.value = "0000-00-00T00:00";
    
}


function updateList(event){



    // console.log(event);
    // console.log(event.target);


    //get the id of the changed checkbox element

    const id = event.target.parentNode.getAttribute('data-id');
    console.log(id)


    const status = event.target.checked;
    console.log(status);

    works = works.map((todo , index) =>{
        if(index == id){
            return {
                ...todo,
                status
            };
        }
        return todo;
    })
    console.log(works);
    addToDOM(works);
    
    store(works)
    
}

function deleteItems(event){

    if(event.target.nodeName.toLowerCase() !== 'button'){
        return;
    }

    const id = event.target.parentNode.getAttribute('data-id');
    const label = event.target.previousElementSibling.innerText;
    console.log(label);

    console.log(id);

    if(window.confirm(`Delete ${label}`)){
        works.splice(id , 1);
    }
    addToDOM(works);
    alert(`${label} removed`);
    store(works)
    

}

function clearTodos(){
    const count = works.filter(todo=> todo.status).length

    if(count === 0){
        return;
    }
    if(window.confirm(`remove ${count} todos?`)){

        works = works.filter(todo => !todo.status);

        addToDOM(works);
        store(works)
    }

  

}


// function updateItems(event){

//     if(event.target.nodeName.toLowerCase() !== 'span'){
//         return;
//     }

//     const id = parseInt(event.target.parentNode.getAttribute('data-id'), 10);

//     const label = works[id].label;

//     const input = document.createElement('input');

//     input.type = 'text';

//     input.value = label;


// }

function clearAllEvents(){
    works.length = 0;
    if(window.confirm("Sure you wanna delete all tasks??")){
        addToDOM(works);
        store(works);
    }
    
}



function store(works){
    localStorage.setItem('works' , JSON.stringify(works));
}



 function init(){

    addToDOM(works);


     form.addEventListener('submit' , addTodo);

     //updating main array

     list.addEventListener('change', updateList);

     //delte items

     list.addEventListener('click' , deleteItems);

     //clearTodos

     clear.addEventListener('click' , clearTodos);

     //clear all

     clearAll.addEventListener('click' , clearAllEvents);

     //edit items

    //  list.addEventListener('dbclick' , updateItems)


     //save locally

     store(works);
 }

init();

