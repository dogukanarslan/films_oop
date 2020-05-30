class Storage {
    static getFilms() {
        let films;
        if (!localStorage.getItem('films')) {
            films = [];
        } else {
            films = JSON.parse(localStorage.getItem('films'));
        }
        return films;
    }

    static addFilm(film) {
        let films = this.getFilms();
        films.push(film);
        localStorage.setItem('films', JSON.stringify(films));
    }

    static deleteFilm(film_element) {
        let film_name = film_element.parentElement.firstElementChild.textContent;
        let films = this.getFilms();
        films.forEach((item, index) => {
            if (item.name === film_name) {
                films.splice(index, 1);
            }
        })
        localStorage.setItem('films', JSON.stringify(films))
    }

    static deleteAllFilms() {
        localStorage.removeItem('films');
    }


}