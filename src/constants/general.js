/* these prefixes will be used in ids of each entity like employee, department, hobbies, skills etc */
export const ID_PREFIXES = Object.freeze({
    EMPLOYEE: 'EMP_',
    DEPARTMENT: 'DPT_',
    PAYROL: 'PRL_'
});

export const LOCAL_STORAGE_ENTITIES_ID = Object.freeze({
    EMPLOYEE: 'hrms__employees',
    DEPARTMENT: 'hrms__departments',
    PAYROL: 'hrml__payrol'
});

export const ENTITY_ID_LENGTH = 32;
export const VALID_CHARS_IN_ENTITY_ID = 'abcdefghijklmnopqrstuvwxyz0123456789';