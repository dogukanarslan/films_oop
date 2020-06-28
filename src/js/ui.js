import {Storage} from './storage';
import {Film} from './film'

class UI {
    static addFilm(film) {
        films.innerHTML += film.createElement(film.name, film.director);
    }
    
    static deleteFilm(element) {
        element.parentElement.remove();
    }

    static deleteAllFilms() {
        while(films.firstElementChild) {
            films.firstElementChild.remove();
        }
    }

    static loadFilms() {
        const allFilms = Storage.getFilms();
        allFilms.forEach(item => {
            let film = new Film(item.name, item.director)
            UI.addFilm(film)
        })
    }

    static filterFilms() {
        let allFilms = Storage.getFilms();
        allFilms = allFilms.filter(film => film.name.indexOf(filter_input.value) > -1)
        UI.deleteAllFilms();
        allFilms.forEach(item => {
            let film = new Film(item.name, item.director)
            UI.addFilm(film)
        })
    }
}

export {UI}