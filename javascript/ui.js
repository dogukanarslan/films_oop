class UI {
    static addFilm(film) {
        const film_element = document.createElement('li');
        const film_name_element = document.createElement('h4');
        const film_director_element = document.createElement('p');
        const delete_film_element = document.createElement('button');

        film_element.className = 'list-group-item';
        delete_film_element.className = 'btn btn-sm btn-danger';
        delete_film_element.type = 'button';

        film_name_element.innerHTML = film.name;
        film_director_element.innerHTML = film.director;
        delete_film_element.innerHTML = 'Delete';

        delete_film_element.addEventListener('click', (event) => {
            let deleted_film_element = event.target.parentElement;
            deleted_film_element.remove();
            Storage.deleteFilm(film);
        });

        film_element.appendChild(film_name_element);
        film_element.appendChild(film_director_element);
        film_element.appendChild(delete_film_element);
        films.appendChild(film_element);
    }

    static deleteAllFilms() {
        while(films.firstElementChild) {
            films.firstElementChild.remove();
        }
    }

    static loadFilms() {
        const allFilms = Storage.getFilms();
        allFilms.forEach(film => {
            UI.addFilm(film)
        })
    }
}