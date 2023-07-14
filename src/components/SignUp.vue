<template>
    <div>
        <h1>Esta es la ventana de SignUp</h1>
        <form @submit.prevent="signUp">
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
                </div>
                <div>
                    <label for="password">Password: </label>
                    <input
                        name="password"
                        type="password"
                        placeholder="**********"
                        id="password"
                        v-model="password"
                        required
                    />
                </div>
                <div>
                    <label for="confirmpassword">Confirm your Password: </label>
                    <input
                        name="confirmpassword"
                        type="password"
                        placeholder="**********"
                        id="confirmpassword"
                        v-model="confirmPassword"
                        required
                    />
                </div>
                <button type="submit">Sign Up</button>
            </div>
        </form>
    </div>
    </template>
    
    
    <script setup>
    import { ref, reactive} from "vue"
    import { useUsersStore } from "../stores/users"
    import { useRouter } from "vue-router";
    
    // const var to connect with the signup form
    const email = ref("");
    const password = ref("");
    const confirmPassword = ref("");
    const redirect = useRouter();
    const store = useUsersStore();
    
    const signUp = async () => {                                    //arrow function for login
        if(password.value === confirmPassword.value)               //confirm the password values input field
        try {
            await store.signUp(email, password);                    //call the signin function to the user store
            alert("Tus datos se guardaron correctamente. Por favor, chequea tu correo para continuar con el proceso de alta.");
            redirect.push({ path: "/auth/login" });                 //routing to login once user have been registered
        }
        catch (error) {                                             //Catching the error
            alert(error);
        }
        else
        alert("Las contraseñas no coinciden, por favor, corrige el error e intenta nuevamente.");     //error message
    };
    
    </script>
    
    
    <style>
    
    </style>