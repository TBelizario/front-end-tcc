<template>
    <div>
        <div id="map" style="height:80vh;"></div>
    </div>
</template>
<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import "leaflet/dist/leaflet.css";
import * as L from 'leaflet';
import axios from 'axios';

const initialMap = ref(null);
let intervalId = null;

// Função para criar um ícone com base na cor
function createIcon(color) {
    return new L.Icon({
        iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });
}

// Função para buscar sensores e atualizá-los no mapa
async function fetchSensores() {
    try {
        // Busca os sensores ativos do backend
        const response = await axios.get('/sensores/maps');

        // Verifique a estrutura da resposta
        if (!response.data || !response.data.items) {
            throw new Error('Estrutura da resposta inválida');
        }

        const sensores = response.data.items;
        console.log(sensores);

        // Limpa os marcadores existentes
        initialMap.value.eachLayer((layer) => {
            if (layer instanceof L.Marker) {
                initialMap.value.removeLayer(layer);
            }
        });

        // Adiciona cada sensor no mapa com o ícone baseado na cor retornada do backend
        sensores.forEach(sensor => {
            const icon = createIcon(sensor.color_icon); // Usa a cor do ícone fornecida pelo backend
            const marker = L.marker([sensor.latitude, sensor.logitude], { icon }).addTo(initialMap.value);
            marker.bindPopup(`<b>${sensor.nome}</b><br>Endereço: ${sensor.address}<br>Cidade: ${sensor.city}</b><br><b>Última distância em cm: ${sensor.last_distance}</b>`).openPopup();
        });
    } catch (error) {
        console.error('Erro ao buscar sensores:', error);
    }
}

onMounted(() => {
    // Inicializa o mapa apenas uma vez
    initialMap.value = L.map('map').setView([-23.9999, -48.53718], 4);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 24,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(initialMap.value);

    // Busca sensores imediatamente ao montar o componente
    fetchSensores();

    // Configura intervalo para buscar sensores a cada 10 segundos
    // intervalId = setInterval(fetchSensores, 10000);
});

// onUnmounted(() => {
//     // Limpa o intervalo quando o componente é desmontado
//     if (intervalId) {
//         clearInterval(intervalId);
//     }
// });
</script>