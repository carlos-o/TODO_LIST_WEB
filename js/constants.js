function constants(){
  //https://project-todolist.herokuapp.com/api/
  //const server = 'http://127.0.0.1:8000/api/'
  const server = 'https://project-todolist.herokuapp.com/api/'
  return {
    login: server + 'login/',
    logout: server + 'logout/',
    register: server + 'register/',
    recoverchange: server + 'recoverchange/',
    todolists: server + 'todolists/',
    todolist: server + 'todolist/',
    listdetail: server + 'listdetail/'
  }
}
