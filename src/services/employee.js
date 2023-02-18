import { ID_PREFIXES, LOCAL_STORAGE_ENTITIES_ID } from "../constants/general";
import { generateEntityId, validateEntityId } from "../utility/general";
import { localStorageUtil } from "../utility/localstorage";
import { department } from "./department";

const EMP_ID_PREFIX = ID_PREFIXES.EMPLOYEE;
const DEPT_ID_PREFIX = ID_PREFIXES.DEPARTMENT;

const EMP_STORAGE_PREFIX = LOCAL_STORAGE_ENTITIES_ID.EMPLOYEE

const getById = (id) => {
    const error404 = `No employee record exists with id ${id}`; 
    return new Promise(async (resolve, reject) => {
        try {
            if (!validateEntityId(EMP_ID_PREFIX, id)) {
                reject(error404);
                return;
            }
            const allEmployees = localStorageUtil.get(EMP_STORAGE_PREFIX, []);
            const tmp = allEmployees.filter(emp => emp.id === id)[0];
            tmp ? resolve(tmp) : reject(error404);
        } catch (error) {
            reject(error);
        }
    });
};

const get = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const allEmployees = localStorageUtil.get(EMP_STORAGE_PREFIX, []);
            resolve(allEmployees);
        } catch (error) {
            reject(error);
        }
    });
};

const add = (employeeData) => {
    return new Promise(async (resolve, reject) => {
        try {
            const allEmployees = localStorageUtil.get(EMP_STORAGE_PREFIX, []);

            // todo: apply validation for non duplicate... (generate unitl uniq)
            const id = generateEntityId(EMP_ID_PREFIX);
            const newRecord = {...employeeData, id}

            const { departmentId } = employeeData;
            if (!validateEntityId(ID_PREFIXES.DEPARTMENT, departmentId)) {
                reject(`Invalid departmentId provided - ${departmentId}`);
                return;
            }
            // Following will fail if department id does not exists
            await department.getById(departmentId);

            allEmployees.push(newRecord);

            localStorageUtil.set(EMP_STORAGE_PREFIX, allEmployees);
            resolve(newRecord);
        } catch (error) {
            reject(error);
        }
    });
};

const editById = (id, updatedData) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!validateEntityId(EMP_ID_PREFIX, id)) {
                reject(`Invalid employee id ${id}`);
                return;
            }
            if (updatedData.hasOwnProperty('departmentId')) {
                const { departmentId } = updatedData;
                if(!validateEntityId(DEPT_ID_PREFIX, departmentId)){
                    reject(`Invalid department id ${departmentId}`);
                    return;
                }
            }

            const allEmployees = localStorageUtil.get(EMP_STORAGE_PREFIX, []);

            const index = allEmployees.findIndex(emp => emp.id === id);
            if (index === -1) {
                reject(`No employee record exists with id ${id}`);
                return;
            }
            
            const emp = allEmployees[index];
            Object.assign(emp, updatedData, { id });

            localStorageUtil.set(EMP_STORAGE_PREFIX, allEmployees);
            resolve(emp);
        } catch (error) {
            reject(error);
        }
    });
};

export const employee = {
    getById,
    add,
    editById,
    get,
};
