import { Film } from "./film";

class Storage {
    static getFilms() {
        let films: Array<Film>;
        if (!localStorage.getItem("films")) {
            films = [];
        } else {
            films = JSON.parse(localStorage.getItem("films") || "[]");
        }
        return films;
    }

    static addFilm(film: Film) {
        let films = Storage.getFilms();
        films.push(film);
        localStorage.setItem("films", JSON.stringify(films));
    }

    static addFavorite(el: HTMLButtonElement) {
        const $liElement = el.parentElement as HTMLLIElement;
        const $headingElement = $liElement.firstElementChild as HTMLHeadingElement;

        let films = Storage.getFilms();
        films = films.map((film: Film) => {
            if (film.name === $headingElement.textContent) {
                film.is_favorite = !film.is_favorite;
                return film;
            }

            return film;
        });

        localStorage.setItem("films", JSON.stringify(films));
    }

    static deleteFilm(el: HTMLButtonElement) {
        const $liElement = el.parentElement as HTMLLIElement;
        const $headingElement = $liElement.firstElementChild as HTMLHeadingElement;

        let film_name = $headingElement.textContent;
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
