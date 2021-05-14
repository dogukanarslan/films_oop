import { Film } from "./film";

class UI {
    private films: Array<Film>;

    constructor(films: Array<Film>) {
        this.films = films;
    }

    getFilms() {
        return this.films;
    }

    setFilms(val: Array<Film>) {
        this.films = val;
    }

    addFilm(film: Film, el: HTMLUListElement) {
        el.appendChild(film.createElement());
        const films: Array<Film> = this.getFilms();
        this.setFilms([...films, film]);
    }

    addFavorite(el: HTMLButtonElement) {
        const $liElement = el.parentElement as HTMLLIElement;
        const $headingElement = $liElement.firstElementChild as HTMLHeadingElement;

        $liElement.classList.toggle("border-warning");
        const films = this.getFilms().map((film) => {
            if (film.name === $headingElement.textContent) {
                film.is_favorite = !film.is_favorite;
                return film;
            }

            return film;
        });

        this.setFilms(films);
    }

    deleteFilm(el: HTMLButtonElement) {
        const $liElement = el.parentElement as HTMLLIElement;
        const $headingElement = $liElement.firstElementChild as HTMLHeadingElement;

        $liElement.remove();
        const films = this.getFilms().filter((film) => {
            return film.name !== $headingElement.textContent;
        });

        this.setFilms(films);
    }

    deleteAllFilms(el: HTMLUListElement) {
        while (el.firstElementChild) {
            el.firstElementChild.remove();
        }
    }

    loadFilms(el: HTMLUListElement, films = this.getFilms()) {
        this.deleteAllFilms(el);
        films.forEach((item) => {
            let film = new Film(item.name, item.director, item.is_favorite);
            el.appendChild(film.createElement());
        });
    }

    filterFilms(name: string, el: HTMLUListElement) {
        const currentFilms = this.getFilms();

        const filteredFilms: Array<Film> = [];
        currentFilms.forEach((film) => {
            if (film.name.toLowerCase().indexOf(name.toLowerCase()) > -1) {
                filteredFilms.push(film);
            }
        });

        this.deleteAllFilms(el);
        this.loadFilms(el, filteredFilms);
    }

    sortFilms(name: string, type: string, el: HTMLUListElement) {
        let currentFilms = this.getFilms();
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

        this.loadFilms(el, currentFilms);
    }
}

export { UI };
