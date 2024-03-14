//DEPENDENCIES
// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));
const toDoCard = document.querySelector("#to-do");
const inProgressCard = document.querySelector("#in-progress");
const doneCard = document.querySelector("#done");
const addTaskButton = document.querySelector(".btn btn-success");

renderTaskList();


//FUNCTIONS
// Todo: create a function to generate a unique task id
function generateTaskId() {
  nextId++;
  localStorage.setItem("nextId", JSON.stringify(nextId));
}

// Todo: create a function to create a task card
function createTaskCard(task) {
    const taskCard = $('<div>')
    .addClass('card task-card draggable my-3')
    .attr('data-task-id', project.id);
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {


  const toDoList = $('#todo-cards');
  toDoList.empty();

  const inProgressList = $('#in-progress-cards');
  inProgressList.empty();

  const doneList = $('#done-cards');
  doneListList.empty();
  
  for (let task of taskList) {
    if (taskList.status === 'to-do') {
        toDoList.append(createTaskCard(task));
    } else if (taskList.status === 'in-progress') {
        inProgressList.append(createTaskCard(task));
    } else if (taskList.status === 'done') {
        doneList.append(createTaskCard(task));
    }
  }
  $('.draggable').draggable({
    opacity: 0.7,
    zIndex: 100,
    // ? This is the function that creates the clone of the card that is dragged. This is purely visual and does not affect the data.
    helper: function (e) {
      // ? Check if the target of the drag event is the card itself or a child element. If it is the card itself, clone it, otherwise find the parent card  that is draggable and clone that.
      const original = $(e.target).hasClass('ui-draggable')
        ? $(e.target)
        : $(e.target).closest('.ui-draggable');
      // ? Return the clone with the width set to the width of the original card. This is so the clone does not take up the entire width of the lane. This is to also fix a visual bug where the card shrinks as it's dragged to the right.
      return original.clone().css({
        width: original.outerWidth(),
      });
    },
  });


}
window.addEventListener("load", renderTaskList);


// Todo: create a function to handle adding a new task
function handleAddTask(event) {
  const form = document.getElementById("taskForm");
  const title = form.elements["title"].value;
  const description = form.elements["description"].value;
  const dueDate = form.elements["dueDate"].value;
  const task = {
    title: title,
    description: description,
    dueDate: dueDate,
  };
  taskList.push(task);
  localStorage.setItem("tasks", JSON.stringify(taskList));
  const newTaskCard = createTaskCard(task);
  console.log(newTaskCard);

  renderTaskList();
}
let addNewTask = document.getElementById("#add-new-task");

// Todo: create a function to handle deleting a task
function handleDeleteTask(event) {}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
  event.preventDefault();
  const $droppedTask = ui.draggable;
  $constainer.append($droppedTask);

  const cardBody = $droppedTask.closest(".card-body.bg-light");
  const doneCards = cardBody.find("#done-cards");
  if (doneCards.length > 0) {
    $droppedTask.css("background-color", "grey");
  }
}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker

$(document).ready(function () {
  if (!taskList || taskList.length === 0) {
  }
});
localStorage.setItem('projects', JSON.stringify(projects));
  printProjectData();


  //USER INTERACTIONS==============================================
// ? Add event listener to the form element, listen for a submit event, and call the `handleProjectFormSubmit` function.
projectFormEl.on('submit', handleProjectFormSubmit);

// TODO: Add an event listener to listen for the delete buttons. Use event delegation to call the `handleDeleteProject` function.
projectDisplayEl.on('click', '.btn-delete-project', handleDeleteProject);

// ? When the document is ready, print the project data to the screen and make the lanes droppable. Also, initialize the date picker.
$(document).ready(function () {
  // ? Print project data to the screen on page load if there is any
  printProjectData();

  $('#taskDueDate').datepicker({
    changeMonth: true,
    changeYear: true,
  });

  
  $('.lane').droppable({
    accept: '.draggable',
    drop: handleDrop,
  });
});