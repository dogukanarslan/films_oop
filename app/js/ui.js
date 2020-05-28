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
}