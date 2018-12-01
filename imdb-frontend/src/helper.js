export let userData = {
  auth : window.localStorage.getItem("imdb.auth.user.auth") ? JSON.parse(localStorage.getItem("imdb.auth.user.auth")) : false,
  token: window.localStorage.getItem("imdb.auth.user.token") ? JSON.parse(localStorage.getItem("imdb.auth.user.token")) : null
}
    
export const setUserData = userDataParam => {
  console.log(userDataParam);
  if(!userDataParam){
    delete window.localStorage["imdb.auth.user.auth"]
    delete window.localStorage["imdb.auth.user.token"]
    userData.auth = false;
    userData.token = null;
  }else{
    window.localStorage.setItem("imdb.auth.user.auth", JSON.stringify(userDataParam.auth));
    window.localStorage.setItem("imdb.auth.user.token", JSON.stringify(userDataParam.token));
  }
};