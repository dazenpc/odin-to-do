export class Todo{

    #title;
    #description;
    #dueDate;
    #project;
    #priority; 
    #isCompleted;


    constructor(title, description, priority, dueDate, project = null, isCompleted = false) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.project = project;
        this.priority = priority;
        this.isCompleted = isCompleted;
    }

    // Getters

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

    // Setters

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

}