<template>
    <div class="">
        <Bar
            id="my-chart-id"
            :options="chartOptions"
            :data="chartData"
            v-if="loaded_grafico"
        />
        <div v-else>
            <p class="text-white">Carregando ...</p>
        </div>

    </div>
</template>

<script>
import { Bar } from 'vue-chartjs'
import axios from "axios"
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
    name: "HistoricoComponent",
    components: { Bar },
    data() {
        return {
            historico: [],
            chartData: {
                labels: [], 
                datasets: [{ data: [], backgroundColor: '#e8b705', label: 'Leituras'}]
            },
            chartOptions: {
            },
            loaded_grafico: false,
            loaded: false
        }
    },
    async mounted() {
        try {
            const response = await axios.get('leitura-sensores/' + this.$route.params.id);
            this.historico = response.data.items;
            this.montagem_dados_grafico();
            this.loaded = true;
        } catch (error) {
            console.error('Erro ao buscar sensores:', error);
        }
    },
    methods: {
        montagem_dados_grafico() {
            const novosLabels = this.historico.map(el => el.data_ocorrencia);
            const novosDados = this.historico.map(el => el.valor);
            this.chartData.labels = novosLabels;
            this.chartData.datasets[0].data = novosDados;
            this.loaded_grafico = true;
        },
    }
}
</script>

<style>
</style>
