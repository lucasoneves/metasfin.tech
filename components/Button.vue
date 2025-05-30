<template>
  <button
    @click="handleClick"
    :class="`rounded-xl ${buttonClasses} cursor-pointer text-sm py-3 w-full flex items-center justify-center`"
  >
    <Icon v-if="iconName" :name="iconName" :size="iconSize"></Icon>
    {{ text }}
  </button>
</template>

<script lang="ts" setup>
const props = defineProps({
  text: String,
  iconName: String,
  variant: {
    type: String,
    default: "default",
  },
  iconSize: {
    type: Number,
    default: 18,
  },
});
const emit = defineEmits(["click"]);
const handleClick = () => {
  emit("click");
};

const buttonClasses = computed(() => {
  const classes: string[] = [];

  switch (props.variant) {
    case "primary":
      classes.push("bg-blue-700 hover:bg-blue-800 text-white");
    case "outline-primary":
      classes.push("border border-blue-600 text-blue-600 hover:bg-blue-50");
      break;

    case "secondary":
      classes.push("bg-gray-200 hover:bg-gray-300 text-gray-800");
      break;

    case "success":
      classes.push("bg-green-600 hover:bg-green-700 text-white");
      break;

    case "outline-secondary":
      classes.push("border border-blue-600 text-blue-600 hover:bg-blue-50");
      break;

    case "danger":
      classes.push("bg-red-700 hover:bg-red-800 text-white");
      break;

    case "outline-danger":
      classes.push("border border-blue-600 text-blue-600 hover:bg-blue-50");
      break;

    default:
      classes.push("bg-transparent p-0");
      break;
  }

  return classes.join(" ");
});
</script>

<style></style>
