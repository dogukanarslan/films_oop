class UI {
    static addFilm(film) {
        const film_element = document.createElement('li');
        const film_name_element = document.createElement('h4');
        const film_director_element = document.createElement('p');
        film_name_element.innerHTML = film.name;
        film_director_element.innerHTML = film.director;
        film_element.appendChild(film_name_element);
        film_element.appendChild(film_director_element);
        films.appendChild(film_element);
    }

    static deleteFilm() {

    }
}