import './styles/main.scss';
import $ from 'jquery';
import 'bootstrap';
import { Film } from './js/film';
import { Storage } from './js/storage';
import { UI } from './js/ui';
import { Netflix } from './js/netflix';

let ui = new UI;

const asc_sort_button = document.querySelector('#asc_sort');
const delete_all_button = document.querySelector('#delete_all_button');
const desc_sort_button = document.querySelector('#desc_sort');
const films = document.querySelector('#films');
const film_name_input = document.querySelector('#film_name');
const film_director_input = document.querySelector('#film_director');
const filter_input = document.querySelector('#filter_input');
const form = document.querySelector('#form');
const reset_sort_button = document.querySelector('#reset_sort');
const sidebar_collapse = document.querySelector('#sidebarCollapse')

const eventListeners = () => {
    asc_sort_button.addEventListener('click', () => sortFilms('asc'));
    delete_all_button.addEventListener('click', deleteAllFilms);
    desc_sort_button.addEventListener('click', () => sortFilms('desc'));
    document.addEventListener('DOMContentLoaded', loadFilms);
    films.addEventListener('click', addFavorite);
    films.addEventListener('click', deleteFilm);
    film_director_input.addEventListener('keyup', validate);
    filter_input.addEventListener('input', filterFilms);
    form.addEventListener('submit', addFilm);
    reset_sort_button.addEventListener('click', loadFilms);
}

const addFilm = (event) => {
    event.preventDefault();
    if (!film_name_input.value || !film_director_input.value) {
        if (!film_name_input.value) {
            const warning = document.createElement('div');
            warning.className = 'alert alert-danger p-2';
            warning.setAttribute('role', 'alert');
            const warning_box = document.querySelectorAll('.col-md-12')[0]
            warning.textContent = 'This field cannot be left blank';
            warning_box.appendChild(warning);
            setTimeout(() => warning.remove(), 2000);
        }

        if (!film_director_input.value) {
            const warning = document.createElement('div');
            warning.className = 'alert alert-danger p-2';
            warning.setAttribute('role', 'alert');
            const warning_box = document.querySelectorAll('.col-md-12')[1];
            warning.textContent = 'This field cannot be left blank';
            warning_box.appendChild(warning);
            setTimeout(() => warning.remove(), 2000);
        }
    } else if (filmExists()) {
        $('#film_exists').modal()
    } else {
        const film = new Film(film_name_input.value, film_director_input.value);
        const film_element = film.createElement();
        ui.addFilm(film);
        Storage.addFilm(film);
        clearInputs(film_name_input, film_director_input);
    }
}

const addFavorite = event => {
    if (event.target.id === 'add_favorite_button') {
        ui.addFavorite(event.target);
    }
}

const deleteFilm = (event) => {
    if (event.target.id === 'delete_film_button') {
        ui.deleteFilm(event.target);
        Storage.deleteFilm(event.target);
    }
}

const clearInputs = (...element) => {
    element.forEach(element => element.value = '');
}

const deleteAllFilms = () => {
    ui.deleteAllFilms();
    Storage.deleteAllFilms();
    ui.films = [];
}

const loadFilms = () => {
    let films = Storage.getFilms();
    ui.films = films;
    ui.loadFilms();
}

const validate = () => {
    film_director_input.value = film_director_input.value.replace(/[^a-zA-Z ]+/, '')
}

const filmExists = () => {
    /*     let films = Storage.getFilms();
        let res;
        for (let i= 0; i < films.length;i++) {
            if (films[i].name === film_name_input.value) {
                return res = true;
            }
        }
        return res; */
    return Storage.getFilms().some(film => film.name === film_name_input.value);
}

const toggleSidebar = () => document.querySelector('#sidebar').classList.toggle('active');

const filterFilms = () => ui.filterFilms();

const sortFilms = (type) => ui.sortFilms(type);

eventListeners();

