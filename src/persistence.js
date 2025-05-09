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