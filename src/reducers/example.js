import { fromJS } from 'immutable';

const initState = fromJS({
  module: 'Example',
  test: true,
});

function exampleReducer(state = initState, action) {
  switch (action.type) {
    default:
      return state;
  }
}

export default exampleReducer;
