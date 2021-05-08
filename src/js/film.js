class Film {
    constructor(name, director, is_favorite = false) {
        this.name = name;
        this.director = director;
        this.is_favorite = is_favorite;
    }

    createElement() {
        const filmElement = document.createElement("li");
        const filmName = document.createElement("h4");
        const filmDirector = document.createElement("p");
        const addFavoriteButton = document.createElement("button");
        const deleteButton = document.createElement("button");

        filmName.textContent = this.name;
        filmDirector.textContent = this.director;
        addFavoriteButton.textContent = "Add Favorite";
        deleteButton.textContent = "Delete";

        addFavoriteButton.id = "add_favorite_button";
        deleteButton.id = "delete_film_button";

        addFavoriteButton.classList.add("btn","btn-sm","btn-warning");
        deleteButton.classList.add("btn", "btn-sm", "btn-danger");
        filmElement.classList.add("list-group-item", "border")
        this.is_favorite && filmElement.classList.add("border-warning");

        filmElement.appendChild(filmName);
        filmElement.appendChild(filmDirector);
        filmElement.appendChild(deleteButton);
        filmElement.appendChild(addFavoriteButton);
        return filmElement;
    }
}

export { Film };
