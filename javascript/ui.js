class UI {
    static addFilm(event, film) {
        const film_element = document.createElement('li');
        const film_name_element = document.createElement('h4');
        const film_director_element = document.createElement('p');
        const delete_film_element = document.createElement('button');
        film_element.className = 'list-group-item';
        film_name_element.innerHTML = film.name;
        film_director_element.innerHTML = film.director;
        delete_film_element.type = 'button';
        delete_film_element.className = 'btn btn-sm btn-danger';
        delete_film_element.innerHTML = 'Delete';
        delete_film_element.addEventListener('click', (event) => event.target.parentElement.remove());
        film_element.appendChild(film_name_element);
        film_element.appendChild(film_director_element);
        film_element.appendChild(delete_film_element);
        films.appendChild(film_element);
    }

    static deleteAllFilms() {
        if(confirm('All films will be deleted. Are you sure?')) {
            while(films.firstElementChild) {
                films.firstElementChild.remove();
            }
        }
    }
}