<template>
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg bg-zinc-500 p-6">
        <table class="w-full text-sm">
            <thead class="bg-zinc-600">
                <tr class="">
                    <th class="text-md px-6 py-3 text-center rounded-l-xl">Nome do sensor</th>
                    <th class="text-md px-6 py-3">Endereço</th>
                    <th class="text-md px-6 py-3">Ativo</th>
                    <th class="text-md px-6 py-3">Alterar niveis</th>
                    <th class="text-md px-6 py-3 rounded-r-xl">Histórico</th>
                </tr>
            </thead>
            <tbody class="divide-y divide-zinc-400">
                <tr v-for="sensor in sensores" :key="sensor.id">
                    <td class="text-center">{{ sensor.nome }}</td>
                    <td class="text-center">{{ sensor.address }} , {{ sensor.city }}</td>
                    <td class="text-center">
                        <span class="inline-block w-3 h-3 rounded-full"
                            v-bind:class="{ 'bg-green-500': sensor.active, 'bg-red-500': !sensor.active }"></span>
                    </td>
                    <td class="text-center">
                        <button @click="OpenModal(sensor)">
                            <box-icon type='solid' name='layer'></box-icon>
                        </button>
                    </td>

                    <td class="text-center">
                        <button @click="historicoSensor(sensor.id)">
                            <box-icon name='history' type="solid" class="mr-2"></box-icon>
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <div v-if="modalShow"

        class="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-900 bg-opacity-50 z-50 shadow-lg">
        <form action="" @submit="updateCamadas">
            <div class="bg-zinc-500 p-8 rounded-lg shadow-lg">
                <h3 class="text-lg font-bold mb-2 mt-2">Atualizar niveis de alerta</h3>
                <div class="grid grid-cols-1 gap-4">
                    <div>
                        <label for="baixo" class="block font-semibold mb-1">Baixo (cm) (Verde):</label>
                        <input type="text" id="baixo" v-model="baixo" class="border border-gray-300 rounded p-2 w-full">
                    </div>
                    <div>
                        <label for="medio" class="block font-semibold mb-1">Médio (cm) (Amarelo):</label>
                        <input type="text" id="medio" v-model="medio" class="border border-gray-300 rounded p-2 w-full">
                    </div>
                    <div>
                        <label for="alto" class="block font-semibold mb-1">Alto (cm) (Vermelho):</label>
                        <input type="text" id="alto" v-model="alta" class="border border-gray-300 rounded p-2 w-full">
                    </div>
                </div>
                <div class="flex justify-between mt-4">
                    <button class="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
                        type="submit">Salvar</button>
                    <button @click="CloseModal"
                        class="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400">Fechar</button>
                </div>
            </div>
        </form>

    </div>

</template>

<script>
import axios from "axios"
import Mensagem from "./MensagemComponent.vue"
import { useRoute } from "vue-router";
export default {
    name: "SensoresComponent",
    components: {
        Mensagem,
    },
    data() {
        return {
            sensores: null,
            modalShow: false,
            camadas: null,
            baixo: null,
            medio: null,
            alta: null,
            sensor_id: null
        };
    },
    async mounted() {
        await axios.get('sensores/')
            .then(response => {
                this.sensores = response.data.items
            })
    },
    methods: {
        historicoSensor(sensor_id) {
            this.$router.push({name: 'Historico', params: {id: sensor_id}});
        },  
        OpenModal(sensor) {
            this.modalShow = true;
            this.sensor_id = sensor.id;
            this.alta = sensor.distance_layer.alta;
            this.medio = sensor.distance_layer.medio;
            this.baixo = sensor.distance_layer.baixo;

        },
        CloseModal() {
            this.modalShow = false
        },

        async updateCamadas(e) {
            e.preventDefault(); 
            const data = {
                baixo: this.baixo,
                medio: this.medio,
                alta: this.alta
            };

            try {
                const response = await axios.patch("/sensores/" + this.sensor_id, JSON.stringify(data), {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                console.log("Sensor atualizado com sucesso:", response);
                await axios.get('sensores/')
                .then(response => {
                    this.sensores = response.data.items
                })
                this.CloseModal();
            } catch (error) {
                console.error('Erro ao atualizar os dados:', error);
            }
        }
    },
}
</script>