   {/* Usercontext. I saw that i could definw a type ‘user’, with all necessary attributes needed for HTTP requests 
   with user information as attributes. I think a problem is that email is not a parameteer but the indicidual basket. Not sure how to change to fit our setup of the json file

Also made The userContext type takes a function – UpdateUser which makes it possible to change the User attributes and there by changing the Context.
In the App.tsx a Context UserContext is created with default values all set to “”, which indicates that no user yet has been logging in.  */}
export type user = {
    firstname : string;
    lastname : string;
    email : string;
}

export type userContext = {
    user : user;
    updateUser : (user : user) => void;
}
