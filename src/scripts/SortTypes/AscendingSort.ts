import { ISort } from "../../interfaces/ISort";
import { Film } from "../film";

class AscendingSort implements ISort {
    sortValues(data: Array<Film>): Array<Film> {
         return data.sort(function (a, b) {
            const x = a.name.toLowerCase();
            const y = b.name.toLowerCase();
            if (x < y) {
                return -1;
            }
            if (x > y) {
                return 1;
            }
            return 0;
        });
    }
}

export default AscendingSort;
