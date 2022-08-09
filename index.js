let addtask = document.getElementById("addtask");
const filters = document.querySelectorAll(".filters button");
let todos = JSON.parse(localStorage.getItem("todo-list"));
let taskbox = document.getElementById("tableBody");
filters.forEach(btn => {
    btn.addEventListener("click", () => {
        document.getElementById("all").classList.remove("active");
        btn.classList.remove("active");
        showtodos(btn.id)
    });
});
function showtodos(filter){
    let table = "";
    if (todos) {
        todos.forEach((todo,id) => {
            let iscompleted = todo.status == "completed" ? "checked" : "";
            if (filter == todo.status || filter == "all") {
                table +=`
                    <tr>
                    <th scope="row">${id+1}</th>
                    <td class="${iscompleted}">${todo.name}</td>
                    <td><div class="mb-3 form-check">
                    <label class="form-check-label" for="${id}" ></label>
                    <input onclick="updatestatus(this)" id="${id}" ${iscompleted} type="checkbox" class="form-check-input" name="check" >
                    </div></td>
                    <td><button onclick="deletetask(${id})" class="btn btn-sm btn-primary">Delete</button></td>
                    </tr>`;
            }
    });
    taskbox.innerHTML = table || `<span>You don't have any task here</span>`;
}
}
showtodos("all");
function updatestatus(selectedtask) {
    let taskname = selectedtask.parentElement.lastElementChild;
    if (selectedtask.checked) {
        taskname.classList.add("checked");
        todos[selectedtask.id].status = "completed";
    }else{
        taskname.classList.remove("checked");
        todos[selectedtask.id].status = "pending";
    }
    localStorage.setItem("todo-list",JSON.stringify(todos));
}
function deletetask(deleteid, filter) {
    todos.splice(deleteid, 1);
    localStorage.setItem("todo-list", JSON.stringify(todos));
    showtodos(filter);
    showtodos('all');
}
addtask.addEventListener("click", () =>{
    let usertask =  document.getElementById("InputTitle").value;
    if (!todos) {
        todos=[]
    }
    usertask.value = "";
    let taskinfo = {name: usertask, status: "pending"}
    todos.push(taskinfo);
    localStorage.setItem("todo-list", JSON.stringify(todos));
    showtodos();
});



 