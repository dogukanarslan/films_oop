import { Film } from "../scripts/film";

export interface ISort {
    sortValues(sortType: any): Array<Film>;
}
