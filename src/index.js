import "./styles/main.scss";
import $ from "jquery";
import "bootstrap";
import { Film } from "./js/film";
import { Storage } from "./js/storage";
import { UI } from "./js/ui";

const asc_sort_button = document.querySelector("#asc_sort");
const delete_all_button = document.querySelector("#delete_all_button");
const desc_sort_button = document.querySelector("#desc_sort");
const films = document.querySelector("#films");
const film_name_input = document.querySelector("#film_name");
const film_director_input = document.querySelector("#film_director");
const filter_input = document.querySelector("#filter_input");
const form = document.querySelector("#form");
const reset_sort_button = document.querySelector("#reset_sort");

const addFilm = (event) => {
    event.preventDefault();
    if (!film_name_input.value || !film_director_input.value) {
        if (!film_name_input.value) {
            const warning = document.createElement("div");
            warning.className = "alert alert-danger p-2";
            warning.setAttribute("role", "alert");
            const warning_box = document.querySelectorAll(".col-md-5")[0];
            warning.textContent = "This field cannot be left blank";
            warning_box.appendChild(warning);
            setTimeout(() => warning.remove(), 2000);
        }

        if (!film_director_input.value) {
            const warning = document.createElement("div");
            warning.className = "alert alert-danger p-2";
            warning.setAttribute("role", "alert");
            warning.textContent = "This field cannot be left blank";
            const warning_box = document.querySelectorAll(".col-md-5")[1];
            warning_box.appendChild(warning);
            setTimeout(() => warning.remove(), 2000);
        }
    } else if (filmExists()) {
        $("#film_exists").modal();
    } else {
        const film = new Film(film_name_input.value, film_director_input.value);
        UI.addFilm(film, films);
        Storage.addFilm(film);
        clearInputs(film_name_input, film_director_input);
    }
};

const addFavorite = (event) => {
    if (event.target.id === "add_favorite_button") {
        UI.addFavorite(event.target);
        Storage.addFavorite(event.target);
    }
};

const deleteFilm = (event) => {
    if (event.target.id === "delete_film_button") {
        UI.deleteFilm(event.target);
        Storage.deleteFilm(event.target);
    }
};

const clearInputs = (...element) => {
    element.forEach((element) => (element.value = ""));
};

const deleteAllFilms = () => {
    UI.deleteAllFilms(films);
    Storage.deleteAllFilms();
};

const loadFilms = () => {
    const storedFilms = Storage.getFilms();
    UI.setFilms(storedFilms);
    UI.loadFilms(films);
};

const validate = () => {
    film_director_input.value = film_director_input.value.replace(
        /[^a-zA-Z ]+/,
        ""
    );
};

const filmExists = () => {
    return Storage.getFilms().some(
        (film) => film.name === film_name_input.value
    );
};

const filterFilms = () => UI.filterFilms(filter_input.value, films);

const sortFilms = (type) => UI.sortFilms(filter_input.value, type, films);

(() => {
    films.addEventListener("click", addFavorite);
    films.addEventListener("click", deleteFilm);
    delete_all_button.addEventListener("click", deleteAllFilms);
    asc_sort_button.addEventListener("click", () => sortFilms("asc"));
    desc_sort_button.addEventListener("click", () => sortFilms("desc"));
    reset_sort_button.addEventListener("click", loadFilms);
    film_director_input.addEventListener("keyup", validate);
    filter_input.addEventListener("input", filterFilms);
    form.addEventListener("submit", addFilm);
    document.addEventListener("DOMContentLoaded", loadFilms);
})();
