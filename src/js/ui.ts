import { Film } from "./film";
import { IFilm } from "../interfaces/models";

let _films: Array<IFilm> = [];

class UI {
    static getFilms() {
        return _films;
    }

    static setFilms(val: Array<IFilm>) {
        _films = val;
    }

    static addFilm(film: Film, el: HTMLUListElement) {
        el.appendChild(film.createElement());
        const films: Array<IFilm> = UI.getFilms();
        UI.setFilms([...films, film]);
    }

    static addFavorite(el: HTMLButtonElement) {
        const $liElement = el.parentElement as HTMLLIElement;
        const $headingElement = $liElement.firstElementChild as HTMLHeadingElement;

        $liElement.classList.toggle("border-warning");
        const films = UI.getFilms().map((film) => {
            if (film.name === $headingElement.textContent) {
                return { ...film, is_favorite: !film.is_favorite };
            }

            return film;
        });

        UI.setFilms(films);
    }

    static deleteFilm(el: HTMLButtonElement) {
        const $liElement = el.parentElement as HTMLLIElement;
        const $headingElement = $liElement.firstElementChild as HTMLHeadingElement;

        $liElement.remove();
        const films = UI.getFilms().filter((film) => {
            return film.name !== $headingElement.textContent;
        });

        UI.setFilms(films);
    }

    static deleteAllFilms(el: HTMLUListElement, isSoftDelete = false) {
        while (el.firstElementChild) {
            el.firstElementChild.remove();
        }

        if (!isSoftDelete) {
            UI.setFilms([]);
        }
    }

    static loadFilms(el: HTMLUListElement, films = UI.getFilms()) {
        films.forEach((item) => {
            let film = new Film(item.name, item.director, item.is_favorite);
            el.appendChild(film.createElement());
        });
    }

    static filterFilms(name: string, el: HTMLUListElement) {
        const currentFilms = UI.getFilms();

        const filteredFilms: Array<IFilm> = [];
        currentFilms.forEach((film) => {
            if (film.name.toLowerCase().indexOf(name.toLowerCase()) > -1) {
                filteredFilms.push(film);
            }
        });

        UI.deleteAllFilms(el, true);
        UI.loadFilms(el, filteredFilms);
    }

    static sortFilms(name: string, type: string, el: HTMLUListElement) {
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
