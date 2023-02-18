import { employee } from './employee';
import { department }  from './department';

export const services = Object.freeze({
    employee,
    department
});

// remove this later.. this is just to test the services from browser console
window.services = services;
