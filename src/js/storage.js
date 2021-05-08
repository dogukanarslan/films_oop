class Storage {
    static getFilms() {
        let films;
        if (!localStorage.getItem("films")) {
            films = [];
        } else {
            films = JSON.parse(localStorage.getItem("films"));
        }
        return films;
    }

    static addFilm(film) {
        let films = Storage.getFilms();
        films.push(film);
        localStorage.setItem("films", JSON.stringify(films));
    }

    static addFavorite(el) {
        let films = Storage.getFilms();
        films = films.map((film) => {
            if (film.name === el.parentElement.firstElementChild.textContent) {
                return { ...film, is_favorite: !film.is_favorite };
            }

            return film;
        });

        localStorage.setItem("films", JSON.stringify(films));
    }

    static deleteFilm(film_element) {
        let film_name =
            film_element.parentElement.firstElementChild.textContent;
        let films = Storage.getFilms();
        for (let i = 0; i < films.length; i++) {
            if (films[i].name === film_name) {
                films.splice(i, 1);
                localStorage.setItem("films", JSON.stringify(films));
                return;
            }
        }
    }

    static deleteAllFilms() {
        localStorage.removeItem("films");
    }
}

export { Storage };
