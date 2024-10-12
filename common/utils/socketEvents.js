export const socketEvents = {
  AUTH: {
    signupWithEmailAndPassword: "auth:signup_with_emailpassword",
    successfulLogin: "auth:login_successful",
    tokenNotFound: "auth:token_not_found",
  },
  PROJECT: {
    createProject: "project:create",
    fetchUserProjects: "project:fetch_user_projects",
  },
};
