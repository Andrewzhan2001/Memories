// reducer 
// Reducers are functions that take the current state and an action as arguments, and return a new state result
export default (posts=[],action)=>{
  switch (action.type) {
    case'FETCH_ALL':
      return action.payload;
    case 'CREATE':
      return posts;
    default:
      return posts;
  }
}