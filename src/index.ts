import "./styles/main.scss";
import $ from "jquery";
import "bootstrap";
import { Film } from "./js/film";
import { Storage } from "./js/storage";
import { UI } from "./js/ui";
import { SortType } from "./enums/Main";

const asc_sort_button = document.querySelector(
    "#asc_sort"
) as HTMLButtonElement;
const delete_all_button = document.querySelector(
    "#delete_all_button"
) as HTMLButtonElement;
const desc_sort_button = document.querySelector(
    "#desc_sort"
) as HTMLButtonElement;
const films = document.querySelector("#films") as HTMLUListElement;
const film_name_input = document.querySelector(
    "#film_name"
) as HTMLInputElement;
const film_director_input = document.querySelector(
    "#film_director"
) as HTMLInputElement;
const filter_input = document.querySelector(
    "#filter_input"
) as HTMLInputElement;
const form = document.querySelector("#form") as HTMLFormElement;
const reset_sort_button = document.querySelector(
    "#reset_sort"
) as HTMLButtonElement;

const ui = new UI([]);

const addFilm = (event: Event) => {
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
        ui.addFilm(film, films);
        Storage.addFilm(film);
        clearInputs(film_name_input, film_director_input);
    }
};

const addFavorite = (event: Event) => {
    const $favoriteButton = event.target as HTMLButtonElement;
    if ($favoriteButton.id === "add_favorite_button") {
        ui.addFavorite($favoriteButton);
        Storage.addFavorite($favoriteButton);
    }
};

const deleteFilm = (event: Event) => {
    const $deleteButton = event.target as HTMLButtonElement;
    if ($deleteButton.id === "delete_film_button") {
        ui.deleteFilm($deleteButton);
        Storage.deleteFilm($deleteButton);
    }
};

const clearInputs = (...element: Array<HTMLInputElement>) => {
    element.forEach((element) => (element.value = ""));
};

const deleteAllFilms = () => {
    ui.deleteAllFilms(films);
    Storage.deleteAllFilms();
};

const loadFilms = () => {
    const storedFilms = Storage.getFilms();
    ui.setFilms(storedFilms);
    ui.loadFilms(films);
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

const filterFilms = () => ui.filterFilms(filter_input.value, films);

const sortFilms = (type: SortType) =>
    ui.sortFilms(filter_input.value, type, films);

(() => {
    films.addEventListener("click", addFavorite);
    films.addEventListener("click", deleteFilm);
    delete_all_button.addEventListener("click", deleteAllFilms);
    asc_sort_button.addEventListener("click", () => sortFilms(SortType.ASC));
    desc_sort_button.addEventListener("click", () => sortFilms(SortType.DESC));
    reset_sort_button.addEventListener("click", loadFilms);
    film_director_input.addEventListener("keyup", validate);
    filter_input.addEventListener("input", filterFilms);
    form.addEventListener("submit", addFilm);
    document.addEventListener("DOMContentLoaded", loadFilms);
})();
