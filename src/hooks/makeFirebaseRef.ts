import {getDatabase, ref} from "firebase/database";

export function makeFirebaseRef(path: string) {
    return ref(getDatabase(), path);
}
