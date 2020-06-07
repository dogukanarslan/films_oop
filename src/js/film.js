class Film {
    constructor(name, director) {
        this.name = name;
        this.director = director;
    }

    createElement() {
        let film_element = `<li class="list-group-item">
        <h4>${this.name}</h4>
        <p>${this.director}</p>
        <button id="delete_film_button" class="btn btn-sm btn-danger">Delete</button>
        </li>`
        return film_element;
    }
}

export {Film}