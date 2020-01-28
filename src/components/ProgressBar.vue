<template>
  <div :class="{ hidden: hidden }" :style="{ width: `${percent}%` }"></div>
</template>

<script>
export default {
  data() {
    return {
      hidden: true,
      percent: 0
    };
  },
  methods: {
    start() {
      this.hidden = false;
      this.percent = 0;
      // Using a timer function in a component. Creates an interval, and saves it as a property of the vm, so you can use a reference in the future. Then you can stop the interval running when the finish method is called using spies
      this.timer = setInterval(() => {
        this.percent++;
      }, 100);
    },
    finish() {
      this.hidden = true;
      this.percent = 100;
      clearInterval(this.timer); // Clears the setInterval timeout with the timer ID saved to this.timer
    }
  }
};
</script>

<style scoped></style>
