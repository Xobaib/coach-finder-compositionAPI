<script setup>
import { ref } from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';

const store = useStore();

const route = useRoute();
const router = useRouter();

const email = ref('');
const message = ref('');
const formIsVaild = ref(true);

function submitForm() {
  formIsVaild.value = true;

  if (
    email.value === '' ||
    !email.value.includes('@') ||
    message.value === ''
  ) {
    formIsVaild.value = false;
    return;
  }

  const newRequest = {
    coachId: route.params.id,
    email: email,
    message: message,
  };

  store.dispatch('requests/addRequest', newRequest);

  router.replace('/coaches'); // we can also use router.push() method but we use replace() because we want the user does not be able to come back to this page.
}
</script>

<template>
  <form @submit.prevent="submitForm">
    <div class="form-control">
      <label for="email">Your E-Mail</label>
      <input type="email" id="email" v-model.trim="email" />
    </div>
    <div class="form-control">
      <label for="message">Message</label>
      <textarea rows="5" id="message" v-model.trim="message"></textarea>
    </div>
    <h3 class="errors" v-if="!formIsVaild">
      Please enter a valid email and non empty message.
    </h3>
    <div class="actions">
      <BaseButton>Send Message</BaseButton>
    </div>
  </form>
</template>

<style scoped>
form {
  margin: 1rem;
  border: 1px solid #ccc;
  border-radius: 12px;
  padding: 1rem;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}

input:focus,
textarea:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}

.errors {
  font-weight: bold;
  color: red;
}

.actions {
  text-align: center;
}
</style>
