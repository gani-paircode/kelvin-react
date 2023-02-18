import { ENTITY_ID_LENGTH, VALID_CHARS_IN_ENTITY_ID } from "../constants/general";

export const generateEntityId = (prefix) => {
    let id = '';    
    const charactersLength = VALID_CHARS_IN_ENTITY_ID.length;
    let counter = 0;
    while (counter < ENTITY_ID_LENGTH) {
      id += VALID_CHARS_IN_ENTITY_ID.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return prefix ?  `${prefix}${id}` : id;
}

export const validateEntityId = (prefix, id) => {
  if (
    !id ||
    !prefix ||
    typeof id !== 'string' ||
    typeof prefix !== 'string' ||
    id.length !== 36 ||
    !id.startsWith(prefix)
  )  {
    return false;
  }
  return true;
}