const form = document.querySelector('#form');
const films = document.querySelector('#films')
const film_name_input = document.querySelector('#film_name');
const film_director_input = document.querySelector('#film_director')

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const film = new Film(film_name_input.value, film_director_input.value);
    UI.addFilm(film);
    film_name_input.value = '';
    film_director_input.value = '';
});  