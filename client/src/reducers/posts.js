// reducer 
// Reducers are functions that take the current state and an action as arguments, and return a new state result
const postReducer =  (posts=[],action)=>{
  switch (action.type) {
    case'FETCH_ALL':
      return action.payload;
    case 'CREATE':
      return [...posts, action.payload];
    case 'UPDATE':
      return posts.map((post) => (post._id === action.payload._id ? action.payload : post));
    default:
      return posts;
  }
}

export default postReducer;