<template>
    <header>
        <hi>Header</hi>
    </header>
    <slot name="content"></slot>
    <footer>
        @2022 - Ulises Núñez
    </footer>
</template>

<style scoped>
    header {
        width: 100%;
        color:aliceblue;
        background-color: #000;
        height: 60px;
    }
</style>