<template>
  <v-avatar
    :color="avatarColor"
    :size="size"
    class="text-white font-weight-bold"
  >
    {{ initials }}
  </v-avatar>
</template>

<script setup lang="ts">
    import { computed } from "vue";

    const props = withDefaults(defineProps<{
      name?: string;
      size?: number | string;
    }>(), {
      name: "Unknown User",
      size: 40,
    });

    // algorithm from MUI STRING AVATAR COMPONENT
    const stringToColor = (str: string): string => {
    let hash = 0;
    for (let i = 0; i < str.length; i += 1) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    let color = "#";
    for (let i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }
    
    return color;
    };

    const initials = computed(() => {
    const cleanName = props.name.trim();
    if (!cleanName) return "??";

    const parts = cleanName.split(/\s+/);
    
    // if only one word use first two latters
    if (parts.length === 1) {
        return parts[0].substring(0, 2).toUpperCase();
    }
    
    // if two or more get first Laters of first two words
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    });

    // calc color from text
    const avatarColor = computed(() => {
    if (!props.name || props.name === "Unknown User")
        return "grey";

    return stringToColor(props.name);
    });
</script>