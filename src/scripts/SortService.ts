import { ISort } from "../interfaces/ISort";
import { Film } from "./film";

class SortService {
    public static getSortedValues(type: ISort, data: Array<Film>): Array<Film> {
        return type.sortValues(data);
    }
}

export default SortService;
