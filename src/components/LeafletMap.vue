<template>
  <div
    ref="mapRef"
    style="width: 100%; height: 400px; border-radius: 12px;"
  />
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from "vue";
import L from "leaflet";
import type { Map } from "leaflet";

interface Props {
  lat: number
  lng: number
  zoom?: number
  markerLabel?: string
}

const props = withDefaults(defineProps<Props>(), {
  zoom: 15,
  markerLabel: "We are here!"
});

const mapRef = ref<HTMLElement | null>(null);
let map: Map | null = null;

// icons are from CDN instead of npm import
const defaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

onMounted(async () => {
  if (!mapRef.value) return;

  // waiting until Vue fully renders DOM
  await nextTick();

  map = L.map(mapRef.value).setView([props.lat, props.lng], props.zoom);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap contributors"
  }).addTo(map);

  L.marker([props.lat, props.lng], { icon: defaultIcon })
    .addTo(map)
    .bindPopup(props.markerLabel)
    .openPopup();

  setTimeout(() => map?.invalidateSize(), 400);
});

onUnmounted(() => {
  map?.remove();
});
</script>