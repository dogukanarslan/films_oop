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
        UI.deleteAllFilms();
        allFilms.forEach(item => {
            let film = new Film(item.name, item.director)
            UI.addFilm(film)
        })
    }

    static filterFilms() {
        let allFilms = Storage.getFilms();
        allFilms = allFilms.filter(film => film.name.toLowerCase().indexOf(filter_input.value.toLowerCase()) > -1)
        UI.deleteAllFilms();
        allFilms.forEach(item => {
            let film = new Film(item.name, item.director)
            UI.addFilm(film)
        })
    }

    static sortFilmsAsc() {
        let allFilms = Storage.getFilms();
        allFilms = allFilms.filter(film => film.name.toLowerCase().indexOf(filter_input.value.toLowerCase()) > -1)
        UI.deleteAllFilms();
        allFilms.sort(function(a, b){
            var x = a.name.toLowerCase();
            var y = b.name.toLowerCase();
            if (x < y) {return -1;}
            if (x > y) {return 1;}
            return 0;
          });
        allFilms.forEach(item => {
            let film = new Film(item.name, item.director)
            UI.addFilm(film)
        })
    }

    static sortFilmsDesc() {
        let allFilms = Storage.getFilms();
        allFilms = allFilms.filter(film => film.name.toLowerCase().indexOf(filter_input.value.toLowerCase()) > -1)
        UI.deleteAllFilms();
        allFilms.sort(function(a, b){
            var x = a.name.toLowerCase();
            var y = b.name.toLowerCase();
            if (x > y) {return -1;}
            if (x < y) {return 1;}
            return 0;
          });
        allFilms.forEach(item => {
            let film = new Film(item.name, item.director)
            UI.addFilm(film)
        })
    }
}

export {UI}