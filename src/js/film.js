class Film {
    constructor(name, director, is_favorite = false) {
        this.name = name;
        this.director = director;
        this.is_favorite = is_favorite;
    }

    createElement() {
        if (this.is_favorite) {
            let film_element = `<li class="list-group-item border border-warning">
            <h4>${this.name}</h4>
            <p>${this.director} </p>
            <button id="delete_film_button" class="btn btn-sm btn-danger">Delete</button>
            <button id="add_favorite_button" class="btn btn-sm btn-warning">Add Favorite</button>
            </li>`
            return film_element;
        } else {
            let film_element = `<li class="list-group-item">
            <h4>${this.name}</h4>
            <p>${this.director}</p>
            <button id="delete_film_button" class="btn btn-sm btn-danger">Delete</button>
            <button id="add_favorite_button" class="btn btn-sm btn-warning">Add Favorite</button>
            </li>`
            return film_element;
        }
    }
}

export { Film }