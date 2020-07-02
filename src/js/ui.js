import {Storage} from './storage';
import {Film} from './film'

class UI {
    constructor() {
        this.films = [];
    }

    addFilm(film) {
        films.innerHTML += film.createElement(film.name, film.director);
        this.films.push(film);
    }
    
    deleteFilm(element) {
        element.parentElement.remove();
    }

    deleteAllFilms() {
        while(films.firstElementChild) {
            films.firstElementChild.remove();
        }
    }

    loadFilms() {
        this.deleteAllFilms();
        Storage.getFilms().forEach(item => {
            let film = new Film(item.name, item.director)
            this.addFilm(film)
        })
    }

    filterFilms() {
        // Not quite my tempo...
        this.deleteAllFilms();
        let allFilms = this.films.filter(film => film.name.toLowerCase().indexOf(filter_input.value.toLowerCase()) > -1)
        allFilms.forEach(item => {
            let film = new Film(item.name, item.director)
            films.innerHTML += film.createElement(film.name, film.director);
        })
    }
    sortFilms(type) {
        let allFilms = Storage.getFilms();
        allFilms = allFilms.filter(film => film.name.toLowerCase().indexOf(filter_input.value.toLowerCase()) > -1)
        this.deleteAllFilms();
        console.log(allFilms);
        switch(type) {
            case 'asc':
                allFilms = allFilms.sort(function(a, b){
                    var x = a.name.toLowerCase();
                    var y = b.name.toLowerCase();
                    if (x < y) {return -1;}
                    if (x > y) {return 1;}
                    return 0;
                });
                console.log(allFilms);
                break;
            case 'desc':
                allFilms = allFilms.sort(function(a, b){
                    var x = a.name.toLowerCase();
                    var y = b.name.toLowerCase();
                    if (x > y) {return -1;}
                    if (x < y) {return 1;}
                    return 0;
                });
                break;
            default:
                break;
        }
        allFilms.forEach(item => {
            let film = new Film(item.name, item.director)
            this.addFilm(film)
        })
    }
}

export {UI}