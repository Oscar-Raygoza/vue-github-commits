<template>
    <header>
        <h1>Vue commits app</h1>
    </header>
    <slot name="content"></slot>
    <footer>
        @2022 - OscarRaygoza
    </footer>
</template>

<style scoped>
 header {
     width: 100%;
     background-color: #000;
     height: 70px;
     color: #fff;
 }
</style>