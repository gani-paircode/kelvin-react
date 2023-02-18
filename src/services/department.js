import { ID_PREFIXES, LOCAL_STORAGE_ENTITIES_ID } from "../constants/general";
import { generateEntityId, validateEntityId } from "../utility/general";
import { localStorageUtil } from "../utility/localstorage";
const DEPT_ID_PREFIX = ID_PREFIXES.DEPARTMENT;
const DEPT_STOREAGE_PREFIX = LOCAL_STORAGE_ENTITIES_ID.DEPARTMENT;

const getById = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!validateEntityId(DEPT_ID_PREFIX, id)) {
                reject(`Invalid department id - ${id}`);
                return;
            }
            const departments = localStorageUtil.get(DEPT_STOREAGE_PREFIX, []);
            const tmp = departments.filter(emp => emp.id === id)[0];
            tmp ? resolve(tmp) : reject(`Department does not exists with id ${id}`);
        } catch (error) {
            reject(error);
        }
    });
};

const get = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const departments = localStorageUtil.get(DEPT_STOREAGE_PREFIX, []);
            resolve(departments);
        } catch (error) {
            reject(error);
        }
    });
};

const add = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const departments = localStorageUtil.get(DEPT_STOREAGE_PREFIX, []);

            // todo: apply validation for duplicate id / name
            const id = generateEntityId(DEPT_ID_PREFIX);
            const newRecord = { ...data, id }
            departments.push(newRecord);

            localStorageUtil.set(DEPT_STOREAGE_PREFIX, departments);
            resolve(newRecord);
        } catch (error) {
            reject(error);
        }
    });
};

const editById = (id, updatedData) => {
    const error404 = `Department does not exists with id ${id}`;
    return new Promise(async (resolve, reject) => {
        try {
            if (!validateEntityId(DEPT_ID_PREFIX, id)) {
                reject(`Invalid department id - ${id}`);
                return;
            }
            const departments = localStorageUtil.get(DEPT_STOREAGE_PREFIX, []);

            const index = departments.findIndex(emp => emp.id === id);
            if (index === -1) {
                reject(error404);
                return;
            }
            const emp = departments[index];
            Object.assign(emp, updatedData, { id });

            localStorageUtil.set(DEPT_STOREAGE_PREFIX, departments);
            resolve(emp);
        } catch (error) {
            reject(error);
        }
    });
};

export const department = {
    getById,
    add,
    editById,
    get,
};

