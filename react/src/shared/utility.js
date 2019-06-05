//Used to combine new and old state objects and return it as a updated COPY
export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    };
};