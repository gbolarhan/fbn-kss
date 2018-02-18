class IndexedDBEngine {
    constructor(dbName, dbVersion) {
        this.log = console.log.bind(console);
        this.error = console.error.bind(console);
        this.dbName = dbName;
        this.dbVersion = dbVersion;        
        this.TODO_STORE = "todos";
        // Checks if indexedDB is supported

        if (!window.indexedDB) {
            this.error("Oops, does not support indexedDB");
            return;
        }
        this.createDatabase();
        // this.addToDo();
    }

    createDatabase() {
        
        // TODO Create IndexedDB database
        // TODO Create object store
        var engine = indexedDB.open(this.dbName, this.dbVersion);
        engine.onupgradeneeded = (event) => {
            var db = event.target.result;
            var version = db.version;
            switch (version) {
                case 1:
                    var objectStore = db.createObjectStore(this.TODO_STORE, {keyPath: "id", autoIncrement: true});
            }
        };
    }

    addToDo(todo) {
        
        // TODO Add coded to add todo
        var engine = indexedDB.open(this.dbName, this.dbVersion);        
        engine.onsuccess = (event) => {
            var db = event.target.result;
            var transaction = db.transaction([this.TODO_STORE], "readwrite");
            var store = transaction.objectStore(this.TODO_STORE);
            console.log(request);     
            var request = store.add(todo);
            request.onsuccess = (e) => {
                this.log('TODO inserted >> ', e.target.result);
            };
            request.error = (e) => {
                this.error('An error occurred');
            };
        };
        engine.onerror = (error) => {
            this.error('An error occured ', error);
        };
    }

    clearAllTodos(todo) {
        // TODO Add code to clear all todos
        var engine = indexedDB.open(this.dbName, this.dbVersion);
        engine.onsuccess = (event) => {
            var db = event.target.result;
            var transaction = db.transaction([this.TODO_STORE], "readwrite");
            var store = transaction.objectStore(this.TODO_STORE);
            var request = store.clear();
            request.onsuccess = (e) => {
                this.log('All todos deleted');
            };
            request.error = (e) => {
                this.error('An error occurred');
            };
        };
        engine.onerror = (error) => {
            this.error('An error occured ', error);
        };
    }

    deleteTodo(id, callback) {
        // TODO Add code to delete todo by id
        var engine = indexedDB.open(this.dbName, this.dbVersion);
        engine.onsuccess = (event) => {
            var db = event.target.result;
            var transaction = db.transaction([this.TODO_STORE], "readwrite");
            var store = transaction.objectStore(this.TODO_STORE);
            var request = store.delete(Number(id));
            request.onsuccess = (e) => {
                this.log('Todo ' + id + 'deleted');
                if (typeof callback != 'undefined') {
                    callback();
                }
            };
            request.error = (e) => {
                this.error('An error occurred');
            };
        };
        engine.onerror = (error) => {
            this.error('An error occurred ', error);
        };
    }

    getAllTodos(renderTodocallback) {
        var engine = indexedDB.open(this.dbName, this.dbVersion);
        engine.onsuccess = (event) => {
            var db = event.target.result;
            var transaction = db.transaction([this.TODO_STORE]);
            var store = transaction.objectStore(this.TODO_STORE);
            store.openCursor().onsuccess = (event) => {
                var cursor = event.target.result;
                if (cursor) {
                    // Renders todo
                    this.log(cursor.value);
                    renderTodocallback(cursor.value);
                    cursor.continue();
                } else {
                    this.log('All todos fetched');
                }
            };
        };
        engine.onerror = (error) => {
            this.error('An error occured ', error);
        };
    }
}