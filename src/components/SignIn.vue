<template>
    <div>
        <h1>Esta es la ventana de Login</h1>
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
        import { ref, reactive} from "vue";
        import { useUsersStore } from "../stores/users";
        import { useRouter } from "vue-router";
        
        // const var to connecto with the signin form
        const email = ref("");
        const password = ref("");
        const redirect = useRouter();
        const store = useUsersStore();
    
        const signIn = async () => {                                             //arrow function for signin
            try {
                await store.signIn(email, password);                             //call the signin function from the user store
                console.log(store.currentUser);
                redirect.push({ path: "/" });                                  //routing to the home path 
            }
            catch (error) {                                                   //catching error
                alert(error);       
            }
        };
    </script>
    
    
    <style>
    
    </style>