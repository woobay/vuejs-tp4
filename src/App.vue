<script setup>
import { RouterLink, RouterView } from 'vue-router'

</script>

<template>
  <header>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">      
      <ul class="navbar-nav">
        <li class="nav-item active">
          <RouterLink to="/">Home</RouterLink>
        </li>
        <li class="nav-item active">
          <RouterLink to="/add">Add</RouterLink>
        </li>
     </ul>
    </nav>
  </header>
  <RouterView />
</template>

<style>
nav li {
  padding: 10px;
}
</style>
