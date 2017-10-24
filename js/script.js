// If localStorage exist, parse data, else create the object with 2 arrays.
var data = (localStorage.getItem('todoList')) ? JSON.parse(localStorage.getItem('todoList')) : {
  todo: [],
  completed: []
};

renderTodoList();

// Click on the button to add
// If the text is entered in the field, call the function to add a new task, if not output error message
document.getElementById('addTaskButton').addEventListener('click', function() {
  var value = document.getElementById('addTaskInput').value;

  if (value) {
    addItem(value);
  } else {
    alert('Please enter text!!!');
  }
});

document.getElementById('addTaskInput').addEventListener('keydown', function(e) {
  var value = this.value;

  if (e.code === 'Enter' && value) {
    addItem(value);
  }
});

// Add new item from the field
function addItem(value) {
  addItemToDOM(value);
  document.getElementById('addTaskInput').value = '';

  data.todo.push(value);
  dataObjectUpdate();
}

// Pass existing data to render
function renderTodoList() {
  if (!data.todo.length && !data.completed.length) return;

  for (var i = 0; i < data.todo.length; i++) {
    var value = data.todo[i];
    addItemToDOM(value);
  }

  for (var j = 0; j < data.completed.length; j++) {
    var value = data.completed[j];
    addItemToDOM(value, true);
  }
}

// Translate data into JSON and add to localStorage
function dataObjectUpdate() {
  localStorage.setItem('todoList', JSON.stringify(data));
}

// Function add new task to DOM
function addItemToDOM(value, completed) {
  var list = (completed) ? document.getElementById('completed-list') : document.getElementById('todo-list');

  // Create new <li class="list-item"> [Text from input] </li>
  var item = document.createElement('li');
  item.classList.add('list-item');
  item.innerText = value;

  //Add <div class="buttons">[button-complete] [button-delete]</div>
  var buttons = document.createElement('div');
  buttons.classList.add('buttons');

  var complete = document.createElement('button');
  complete.classList.add('button', 'button-check');

  //Add click event for complete item
  complete.addEventListener('click', completeItem);

  var remove = document.createElement('button');
  remove.classList.add('button', 'button-delete');

  //Add click event for remove item
  remove.addEventListener('click', removeItem);

  buttons.appendChild(complete);
  buttons.appendChild(remove);

  //Add buttons to li.list-item
  item.appendChild(buttons);

  //Add new li.list-item to ul.todo-list
  list.insertBefore(item, list.childNodes[0]);
}

// Function delete task
function removeItem() {
  var item = this.parentNode.parentNode;
  var parent = this.parentNode.parentNode.parentNode;
  var id = parent.id;
  var value = item.innerText;

  if (id === 'todo-list') {
    data.todo.splice(data.todo.indexOf(value), 1);
  } else {
    data.completed.splice(data.completed.indexOf(value), 1);
  }
  dataObjectUpdate();

  parent.removeChild(item);
}

// Function task completion
function completeItem() {
  var item = this.parentNode.parentNode;
  var parent = this.parentNode.parentNode.parentNode;
  var id = parent.id;
  var value = item.innerText;

  if (id === 'todo-list') {
    data.todo.splice(data.todo.indexOf(value), 1);
    data.completed.push(value);
  } else {
    data.completed.splice(data.completed.indexOf(value), 1);
    data.todo.push(value);
  }
  dataObjectUpdate();

  var target = (id === 'todo-list') ? document.getElementById('completed-list') : document.getElementById('todo-list');

  parent.removeChild(item);
  target.insertBefore(item, target.childNodes[0]);
}