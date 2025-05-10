export const persistHelper = {
    save: function(item) {
        let key = parseInt(localStorage.getItem("index") || "0", 10); // safely get and parse index
        localStorage.setItem("index", key + 1); // increment and store next index
        localStorage.setItem(key.toString(), item); // store item at current key
        return key; // return the new index
    },

    update: function(key, item) {
        localStorage.setItem(key, item);
    },

    getIndex: function(){
        return parseInt(localStorage.getItem("index") || "0", 10);
    },

    delete: function(key){
        localStorage.removeItem(key.toString());
    }
}


export const projectPersistHelper = {
    save: function(projectItem) {
        let projects = JSON.parse(localStorage.getItem("projects")) || [];
        projects.push(projectItem);
        localStorage.setItem("projects", JSON.stringify(projects));
    },

    delete: function(projectName){
        let projects = JSON.parse(localStorage.getItem("projects"));
        let index = projects.findIndex(project => project == projectName);
        projects.splice(index,1);
        localStorage.setItem("projects", JSON.stringify(projects));
    }
}