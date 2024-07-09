<template>
    <div class="bg-red-400 w-72 h-12 mb-4 flex justify-center rounded-lg p-3 shadow-lg"
     v-on:click="CloseMensagem"
     v-show="showMensagem">
        <h1>MENSAGEM</h1>
    </div>
</template>
<script>
    export default {
        name: "Mensagem",
        data(){
            return {
                showMensagem: true
            };
        },
        methods: {
            CloseMensagem() {
                this.showMensagem = false
            }
        },
    }
</script>
<style></style>