class app {
    constructor() {

        var dbName = "fbn-kss-codedlab";
        var dbVersion = 1;
        var addTodoButton = document.querySelector('#addBtn');
        var todoInput = document.querySelector('#input');
        var serviceWorker = new theServiceWorker();
        var indexedDB = new IndexedDBEngine(dbName, dbVersion);
        this.dbName = dbName;
        this.dbVersion = dbVersion;
        this.addTodoButton = addTodoButton;
        this.todoInput = todoInput;
        this.indexedDbEngine = indexedDB;
        
        serviceWorker.kickStartServiceWorker();
        this.addListenerAfterDomLoad();
    }

    renderTodos() { 
        var todosContainer = document.querySelector("#todos");       
        todosContainer.innerHTML = '';
        this.indexedDbEngine.getAllTodos((todo) => {
            var li = document.createElement('li');
            li.innerHTML = todo.text + ' <span data-id="' + todo.id + '" onclick="fbn.deleteTodo(this)" class="btn-link pull-right">Delete</span>';
            li.className = 'list-group-item';
            todosContainer.appendChild(li);
        });
    }

    addTodo() {
        var todo = this.todoInput.value.trim();
        if (todo.length > 0) {
            this.indexedDbEngine.addToDo({
                'text': todo,
                'datetime': new Date().toISOString()
            });
            this.todoInput.value = '';
        }
        this.renderTodos();
    }

    clearAll() {
        this.indexedDbEngine.clearAllTodos();
        this.renderTodos();
    }

    deleteTodo() {
        var _this = event.target;
        var id = _this.dataset.id;
        this.indexedDbEngine.deleteTodo(id, () => {
            this.renderTodos();
        });
    }
    
    addListenerAfterDomLoad() {
        document.addEventListener('DOMContentLoaded', () => {
            this.renderTodos();
            this.todoInput.addEventListener('keyup', (event) => {
                if(event.keyCode == 13) {
                    appObject.addTodoButton.click();
                }
            });
        }, false);
    }
}

var fbn = new app();