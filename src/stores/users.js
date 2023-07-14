//here we imports all the functions and components
import { defineStore } from "pinia";
import { supabase } from "../supabase";
import { ref, reactive } from 'vue';

//Define pinia store and export it
export const useUsersStore = defineStore('user', () => {
  const currentUser = ref(null);                                      //create const var for the user data
  const profile = ref(null);                                         //create const var for the user profile
  
  const setUser = (user) => {                                       // function to get the user and routing 
      if (user) {                                             
        currentUser.value = user;                                 //save the user data
        router.push({ path: '/' });                              //route to the path
      } else {
        console.log('user null');
        currentUser.value = null;
        router.push({ path: '/auth' });
      }
    };
   
  const signUp = async (email, password) => {                                           //Function to register new users
    let { data, error } = await supabase.auth.signUp({                                 //We call a supabase method define by supabase docu
      email: email.value,                                                             //Pass the email and password parameters
      password: password.value                                                       
    });
    if (error) throw error;                                                        //error handling and return the user and error values.
    return (data, error);
  };

  //Signin is the function that we use to login users in our website.
  //This function calls a method defined in the Supabase documentation (supabase.auth.signInWithPassword)
  //and passes it the email and password parameters.
  //This function connects to supabase using the credentials defined in the supabase.js file. 
  const signIn = async (email, password) => {                                           //Function to login with a registered user
    let { data, error } = await supabase.auth.signInWithPassword({                     //We call a supabase method define by supabase docu
      email: email.value,                                                             //Pass the email and password parameters
      password: password.value
    });
    if (error) throw error;                                                         //error handling and return the user and error values.
    currentUser.value = data.user;
    //console.log(data.user);                  this consolelog check the user data its ok
    //console.log(currentUser.value);          this clg cjeck the user data save in the const var its ok
    return (data, error);
  };
  

  const signOut = async () => {                                                       //Function to singout the user
    let { error } = await supabase.auth.signOut();                                   //We call a supabase method define by supabase docu
    if (error) throw error;                                                         //catching error
    return (error);
  };

  return { currentUser, profile, signIn, signUp, signOut, setUser};                  //return all the functions into the store
},

{
    persist: {                                                                   // persist the userlogin data into localstorage
      enabled: true,
      strategies: [
        {
          key: 'user',
          storage: localStorage,
        },
      ],
    },
  },

);

