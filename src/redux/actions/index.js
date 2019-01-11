export const CHANGE_ACTIVE = 'ADD_ACTIVE';
export const CLEAR_ACTIVE = 'CLEAR_ACTIVE';
export const ADD_HIGHLIGHTED = 'ADD_HIGHLIGHTED';
export const CLEAR_HIGHLIGHTED = 'REMOVE_HIGHLIGHTED';
export const SET_SELECTED = 'SET_SELECTED';
export const ON_TOGGLE = 'ON_TOGGLE';

export const changeActive = (item) => ({
    type: CHANGE_ACTIVE, item
});

export const clearActive = () => ({
    type: CLEAR_ACTIVE
});

export const addHighlighted = (item) => ({
    type: ADD_HIGHLIGHTED, item
});

export const clearHighlighted = (item) => ({
    type: CLEAR_HIGHLIGHTED, item
});

export const setSelected = (selected) => ({
    type: SET_SELECTED, selected
});

export const onToggle = () => ({
    type: ON_TOGGLE
});
