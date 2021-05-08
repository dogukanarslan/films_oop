import { Film } from "./film";

let _films = [];

class UI {
    static getFilms() {
        return _films;
    }

    static setFilms(val) {
        _films = val;
    }

    static addFilm(film, el) {
        el.appendChild(film.createElement());
        const films = UI.getFilms();
        UI.setFilms([...films, film]);
    }

    static addFavorite(el) {
        el.parentElement.classList.toggle("border-warning");
        const films = UI.getFilms().map((film) => {
            if (film.name === el.parentElement.firstElementChild.textContent) {
                return { ...film, is_favorite: !film.is_favorite };
            }

            return film;
        });

        UI.setFilms(films);
    }

    static deleteFilm(el) {
        el.parentElement.remove();
        const films = UI.getFilms().filter((film) => {
            return film.name !== el.parentElement.firstElementChild.textContent;
        });

        UI.setFilms(films);
    }

    static deleteAllFilms(el, isSoftDelete = false) {
        while (el.firstElementChild) {
            el.firstElementChild.remove();
        }

        if (!isSoftDelete) {
            UI.setFilms([]);
        }
    }

    static loadFilms(el, films = UI.getFilms()) {
        films.forEach((item) => {
            let film = new Film(item.name, item.director, item.is_favorite);
            el.appendChild(film.createElement());
        });
    }

    static filterFilms(name, el) {
        const currentFilms = UI.getFilms();

        const filteredFilms = [];
        currentFilms.forEach((film) => {
            if (film.name.toLowerCase().indexOf(name.toLowerCase()) > -1) {
                filteredFilms.push(film);
            }
        });

        UI.deleteAllFilms(el, true);
        UI.loadFilms(el, filteredFilms);
    }

    static sortFilms(name, type, el) {
        let currentFilms = UI.getFilms();
        switch (type) {
            case "asc":
                currentFilms = currentFilms.sort(function (a, b) {
                    const x = a.name.toLowerCase();
                    const y = b.name.toLowerCase();
                    if (x < y) {
                        return -1;
                    }
                    if (x > y) {
                        return 1;
                    }
                    return 0;
                });
                break;
            case "desc":
                currentFilms = currentFilms.sort(function (a, b) {
                    const x = a.name.toLowerCase();
                    const y = b.name.toLowerCase();
                    if (x > y) {
                        return -1;
                    }
                    if (x < y) {
                        return 1;
                    }
                    return 0;
                });
                break;
            default:
                break;
        }

        UI.deleteAllFilms(el, true);
        UI.loadFilms(el, currentFilms);
    }
}

export { UI };
