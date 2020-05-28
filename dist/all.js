const form=document.querySelector("#form"),films=document.querySelector("#films"),film_name_input=document.querySelector("#film_name"),film_director_input=document.querySelector("#film_director"),delete_all_button=document.querySelector("#delete_all_button"),eventListeners=()=>{form.addEventListener("submit",addFilm),films.addEventListener("click",deleteFilm),delete_all_button.addEventListener("click",deleteAllFilms),document.addEventListener("DOMContentLoaded",loadFilms)},addFilm=e=>{e.preventDefault();const t=new Film(film_name_input.value,film_director_input.value);film_element=t.createElement(),UI.addFilm(t),Storage.addFilm(t),clearInputs(film_name_input,film_director_input)},deleteFilm=e=>{"delete_film_button"===e.target.id&&(UI.deleteFilm(e.target),Storage.deleteFilm(e.target))},clearInputs=(...e)=>{e.forEach(e=>e.value="")},deleteAllFilms=()=>{confirm("All films will be deleted. Are you sure?")&&(UI.deleteAllFilms(),Storage.deleteAllFilms())},loadFilms=()=>{UI.loadFilms()},validate=()=>{film_director_input.value=film_director_input.value.replace(/[^a-zA-Z ]+/,"")};form.addEventListener("submit",addFilm),films.addEventListener("click",deleteFilm),delete_all_button.addEventListener("click",deleteAllFilms),document.addEventListener("DOMContentLoaded",loadFilms);class Film{constructor(e,t){this.name=e,this.director=t}createElement(){return`<li class="list-group-item">\n        <h4>${this.name}</h4>\n        <p>${this.director}</p>\n        <button id="delete_film_button" class="btn btn-sm btn-danger">Delete</button>\n        </li>`}}class Storage{static getFilms(){let e;return e=localStorage.getItem("films")?JSON.parse(localStorage.getItem("films")):[],e}static addFilm(e){let t=this.getFilms();t.push(e),localStorage.setItem("films",JSON.stringify(t))}static deleteFilm(e){let t=e.previousSibling.previousSibling.textContent,l=this.getFilms();l.forEach((e,i)=>{e.name===t&&l.splice(i,1)}),localStorage.setItem("films",JSON.stringify(l))}static deleteAllFilms(){localStorage.removeItem("films")}}class UI{static addFilm(e){films.innerHTML+=e.createElement(e.name,e.director)}static deleteFilm(e){e.parentElement.remove()}static deleteAllFilms(){for(;films.firstElementChild;)films.firstElementChild.remove()}static loadFilms(){Storage.getFilms().forEach(e=>{let t=new Film(e.name,e.director);UI.addFilm(t)})}}