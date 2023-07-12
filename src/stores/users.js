// import { ref, computed } from 'vue'
//ejemplo composition API

// export const useCounterStore = defineStore('counter', () => {
//   const count = ref(0)
//   const doubleCount = computed(() => count.value * 2)
//   function increment() {
//     count.value++
//   }

//   return { count, doubleCount, increment }
// })

import { defineStore } from "pinia";
import { supabase } from "../supabase";
import { reactive } from 'vue';

//using composition api

export const store = reactive({                                               //define the function and get reactive
  user: null,                                                               
  profile: null,
  async signUp(email, password) {                                             // async signup funtion to get the email and password
    let { data, error } = await supabase.auth.signUp({                        //capturing it and pushing into supabase
      email: email.value,                                                     //Values
      password: password.value
    })
    return (data, error);                                                      
  },
  async signIn(email, password) {                                             //async signin funtion to get the mail and password
    let { data, error } = await supabase.auth.signInWithPassword({            //capturing and pushing into supabase
      email: email.value,                                                     //values
      password: password.value
    });
    if (error) throw error;                                                   //capturing error
    return (data, error);
  },
  // async fetchUser() {
  //   const user = await supabase.auth.user();
  //   if(user) {
  //     this.user = user;
  //     const { data: profile } = await supabase
  //     .from('profiles')
  //     .select()
  //     .match({ user_id: this.user.id });

  //     if (profile) this.profile = profile[0];
  //     // console.log('user in store: ', this.user);
  //     // console.log('profile in store: ', this.profile);
  //   }
  // },
});

//export default store;