<template>
    <div>
        <h1>Add a new Task</h1>
        <div v-if="showErrorMessage">
            <p class="error-text">{{ errorMessage }}</p>
        </div>
        <div>
            <div class="input-field">
                <input type="text" placeholder="Add a Task Title" v-model="name">
            </div>
            <div class="input-field">
                <input type="text" placeholder="Add a Task Description" v-model="description">
            </div>
            <button @click="addTask" class="button">Add</button>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { useTasksStore } from "../stores/tasks"  

const taskStore = useTasksStore();

// const var to the inputs values
const name = ref('');
const description = ref('');

// const to save a variable that holds an initial false boolean value for the errorMessage container that is conditionally displayed depending if the input field is empty
const showErrorMessage = ref(false);

// const to save a variable that holds the value of the error message
const errorMessage = ref(null);

// Arrow function to create task.
const addTask = () => {
if(name.value.length === 0 || description.value.length === 0){                       //first we check that all input have data

    showErrorMessage.value = true;
    errorMessage.value = 'The task title or description is empty';                //show error
    setTimeout(() => {                                                           //timeout to hide error
    showErrorMessage.value = false;
    }, 5000);

} else {
    // Aquí mandamos los valores a la store para crear la nueva Task. Esta parte de la función tenéis que refactorizarla para que funcione con emit y el addTask del store se llame desde Home.vue.

    //here we send the value to the taks store for create a new task,

    taskStore.addTask(name.value, description.value);
    name.value = '';
    description.value = '';
}
};

</script>

<style></style>
  