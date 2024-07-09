<template>
    <div class="my-2 bg-gray-600 h-[1px]"></div>
    <aside class="w-56 bg-zinc-950 p-6">
        <img src="/logo-uninter.png" alt="">
        <nav class="flex flex-col space-y-6 mt-10">
            <RouterLink to="/mapa"
            exact :class="{ 'bg-yellow-600': $route.path === '/mapa' }" class="flex items-center p-3 rounded-md duration-300 cursor-pointer hover:bg-yellow-600 text-white">
                <box-icon name='map-alt' color="#ffffff" class="mr-2"></box-icon>
                Mapa
            </RouterLink>
            <RouterLink to="/sensores"
            exact :class="{ 'bg-yellow-600': $route.path === '/sensores' }" class="flex items-center p-3 rounded-md duration-300 cursor-pointer hover:bg-yellow-600 text-white">
                <box-icon name='microchip' color="#ffffff" class="mr-2"></box-icon>
                Sensores
            </RouterLink>
        </nav>
    </aside>
</template>
<script>
export default {
    name: "SideBar"
}
</script>
<style></style>