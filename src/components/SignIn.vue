<template>
    <h1>Esta es la ventana de Login</h1>
    <div>
        <form @submit.prevent="signIn">
            <div>
                <div>
                    <label for="username">Username: </label>
                    <input 
                        name="username"
                        type="email"
                        placeholder="example@mail.com"
                        id="email"
                        v-model="email"
                        required
                    />
                <div>
                </div>
                    <label for="password">Password</label>
                    <input
                        name="password"
                        type="password"
                        placeholder="**********"
                        id="password"
                        v-model="password"
                        required
                    />
                </div>
                <button type="submit">Sign In</button>
            </div>
        </form>
    </div>
    
    </template>
    
    
    <script setup>

        //imports to use in the script
        import { ref, reactive} from "vue";
        import { store } from "../stores/users";
        import { useRouter } from "vue-router";
        
        //Var to connect to the login form
        const email = ref("");
        const password = ref("");
        const redirect = useRouter();
    
        //signin function to signin into app and connect to supabase
        const signIn = async () => {                            // async function
            try {                                               
                await store.signIn(email, password);            //await funtion imported from store to get de email and password
                redirect.push({ path: "/" });                   // if its fine, redirect to the home path
            }
            catch (error) {                                     
                redirect.push({ path: "/auth/signup" });        //catching the error
            }
    
        };
    </script>
    
    
    <style>
    
    </style>