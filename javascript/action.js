const form = document.querySelector('#form');
const films = document.querySelector('#films')
const film_name_input = document.querySelector('#film_name');
const film_director_input = document.querySelector('#film_director');
const delete_all_button = document.querySelector('#delete_all_button');

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const film = new Film(film_name_input.value, film_director_input.value);
    UI.addFilm(event, film);
    film_name_input.value = '';
    film_director_input.value = '';
});

delete_all_button.addEventListener('click', UI.deleteAllFilms);