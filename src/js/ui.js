import { Film } from './film'

class UI {
    constructor() {
        this.films = [];
    }

    addFilm(film) {
        films.innerHTML += film.createElement(film.name, film.director);
        this.films.push(film);
    }

    addFavorite(film) {
        this.films.map(item => {
            if (item.name === film.parentElement.firstElementChild.textContent) {
                item.is_favorite = !item.is_favorite;
            }
        })
        this.loadFilms();
    }

    deleteFilm(element) {
        element.parentElement.remove();
        for (let i = 0; i < this.films.length; i++) {
            if (this.films[i].name === element.parentElement.firstElementChild.textContent) {
                return this.films = this.films.splice(i, 1);
            }
        }
    }

    deleteAllFilms() {
        while (films.firstElementChild) {
            films.firstElementChild.remove();
        }
    }

    loadFilms() {
        this.deleteAllFilms();
        this.films.forEach(item => {
            let film = new Film(item.name, item.director, item.is_favorite)
            films.innerHTML += film.createElement();
        })
    }

    filterFilms() {
        this.deleteAllFilms();
        let allFilms = this.films.filter(film => film.name.toLowerCase().indexOf(filter_input.value.toLowerCase()) > -1)
        allFilms.forEach(item => {
            let film = new Film(item.name, item.director)
            films.innerHTML += film.createElement(film.name, film.director);
        })
    }

    sortFilms(type) {
        this.deleteAllFilms();
        let allFilms = this.films;
        allFilms = allFilms.filter(film => film.name.toLowerCase().indexOf(filter_input.value.toLowerCase()) > -1)
        switch (type) {
            case 'asc':
                allFilms = allFilms.sort(function (a, b) {
                    var x = a.name.toLowerCase();
                    var y = b.name.toLowerCase();
                    if (x < y) { return -1; }
                    if (x > y) { return 1; }
                    return 0;
                });
                break;
            case 'desc':
                allFilms = allFilms.sort(function (a, b) {
                    var x = a.name.toLowerCase();
                    var y = b.name.toLowerCase();
                    if (x > y) { return -1; }
                    if (x < y) { return 1; }
                    return 0;
                });
                break;
            default:
                break;
        }
        allFilms.forEach(item => {
            let film = new Film(item.name, item.director)
            films.innerHTML += film.createElement(film.name, film.director);
        })
    }
}

export { UI }