export class Todo{

    #title;
    #description;
    #dueDate;
    #project;
    #priority; 
    #isCompleted;
    #key;


    constructor(title, description, priority, dueDate, key, project = null, isCompleted = false) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.project = project;
        this.priority = priority;
        this.isCompleted = isCompleted;
        this.key = key;
    }

    // functions

    toJSON() {
        return {
            title: this.title,
            description: this.description,
            dueDate: this.dueDate instanceof Date ? this.dueDate.toISOString() : this.dueDate,
            project: this.project,
            key: this.key,
            priority: this.priority,
            isCompleted: this.isCompleted
        };
    }

    static reviewTodo(jsonObj){
        return new Todo(
            jsonObj.title,
            jsonObj.description,
            jsonObj.priority,
            new Date(jsonObj.dueDate),
            jsonObj.key,
            jsonObj.project,
            jsonObj.isCompleted
        )
    }

    // Setters

    /**
     * @param {string} value
     */
    set title(value){
        this.#title = value;
    }

    /**
     * @param {string} value
     */
    set description(value){
        this.#description = value;
    }

    /**
     * @param {string} value
     */
    set dueDate(value){
        this.#dueDate = value;
    }

    /**
     * @param {string} value
     */
    set project(value){
        this.#project = value;
    }

    /**
     * @param {string} value
     */
    set priority(value){
        this.#priority = value;
    }

    /**
     * @param {boolean} value
     */
    set isCompleted(value){
        this.#isCompleted = value;
    }

    /**
     * @param {number} value
     */
    set key(value){
        this.#key = value;
    }

    // Getters

    get title(){
        return this.#title;
    }

    get description(){
        return this.#description;
    }

    get dueDate(){
        return this.#dueDate;
    }

    get project(){
        return this.#project;
    }

    get priority(){
        return this.#priority;
    }

    get isCompleted(){
        return this.#isCompleted;
    }

    get key(){
        return this.#key;
    }

}