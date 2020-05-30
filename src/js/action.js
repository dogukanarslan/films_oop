const form = document.querySelector('#form');
const films = document.querySelector('#films')
const film_name_input = document.querySelector('#film_name');
const film_director_input = document.querySelector('#film_director');
const delete_all_button = document.querySelector('#delete_all_button');

const eventListeners = () => {
    form.addEventListener('submit', addFilm);
    films.addEventListener('click', deleteFilm);
    delete_all_button.addEventListener('click', deleteAllFilms);
    document.addEventListener('DOMContentLoaded', loadFilms);
}

const addFilm = (event) => {
    event.preventDefault();
    const film = new Film(film_name_input.value, film_director_input.value);
    const film_element = film.createElement();
    UI.addFilm(film);
    Storage.addFilm(film);
    clearInputs(film_name_input, film_director_input);
}

const deleteFilm = (event) => {
    if (event.target.id === 'delete_film_button') {
        UI.deleteFilm(event.target);
        Storage.deleteFilm(event.target);
    }
}

const clearInputs = (...element) => {
    element.forEach(element => element.value = '');
}

const deleteAllFilms = () => {
    if(confirm('All films will be deleted. Are you sure?')) {
        UI.deleteAllFilms();
        Storage.deleteAllFilms();
    }
}

const loadFilms = () => {
    UI.loadFilms();
}

const validate = () => {
    film_director_input.value = film_director_input.value.replace(/[^a-zA-Z ]+/, '')
}
 
eventListeners();