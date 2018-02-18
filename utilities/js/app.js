class app {
    constructor() {
        this.dbName = "fbn-kss-codedlab";
        this.dbVersion = 1;
        this.addTodoButton = document.querySelector('#addBtn');
        this.todoInput = document.querySelector('#input');
        this.todosContainer = document.querySelector("#todos");
        var serviceWorker = new theServiceWorker();
        serviceWorker.kickStartServiceWorker();
        var indexedDbEngine = new IndexedDBEngine(this.dbName, this.dbVersion);
    }

    renderTodos() {
        this.todosContainer.innerHTML = '';
        this.indexedDbEngine.getAllTodos(function (todo) {
            var li = document.createElement('li');
            li.innerHTML = todo.text + ' <span data-id="' + todo.id + '" onclick="deleteTodo(this)" class="btn-link pull-right">Delete</span>';
            li.className = 'list-group-item';
            this.todosContainer.appendChild(li);
        });
    }

    addTodo() {
        var todo = todoInput.value.trim();
        if (todo.length > 0) {
            this.indexedDbEngine.addTodo({
                'text': todo,
                'datetime': new Date().toISOString()
            });
            todoInput.value = '';
        }
        this.renderTodos();
    }

    clearAll() {
        this.indexedDbEngine.clearAllTodos();
        renderTodos();
    }

    deleteTodo() {
        var _this = event.target;
        var id = _this.dataset.id;
        this.indexedDbEngine.deleteTodo(id, function () {
            this.renderTodos();
        });
    }
    
    addListenerAfterDomLoad() {
        document.addEventListener('DOMContentLoaded', function () {
            this.renderTodos();
            todoInput.addEventListener('keyup', function (event) {
                if(event.keyCode == 13) {
                    this.addTodoButton.click();
                }
            });
        }, false);
    }
}

var fbn = new app();

// var indexedDbEngine = new IndexedDBEngine(dbName, dbVersion);

// function renderTodos() {
//     todosContainer.innerHTML = '';
//     indexedDbEngine.getAllTodos(function (todo) {
//         var li = document.createElement('li');
//         li.innerHTML = todo.text + ' <span data-id="' + todo.id + '" onclick="deleteTodo(this)" class="btn-link pull-right">Delete</span>';
//         li.className = 'list-group-item';
//         todosContainer.appendChild(li);
//     });
// }

// function addTodo() {
//     var todo = todoInput.value.trim();
//     if (todo.length > 0) {
//         indexedDbEngine.addTodo({
//             'text': todo,
//             'datetime': new Date().toISOString()
//         });
//         todoInput.value = '';
//     }
//     renderTodos();
// }

// function clearAll() {
//     indexedDbEngine.clearAllTodos();
//     renderTodos();
// }

// function deleteTodo() {
//     var _this = event.target;
//     var id = _this.dataset.id;
//     indexedDbEngine.deleteTodo(id, function () {
//         renderTodos();
//     });
// }

// document.addEventListener('DOMContentLoaded', function () {
//     renderTodos();
//     todoInput.addEventListener('keyup', function (event) {
//         if(event.keyCode == 13) {
//             addTodoButton.click();
//         }
//     });
// }, false);