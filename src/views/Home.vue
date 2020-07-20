<template>
  <div class="home">
    <TradingChart></TradingChart>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import TradingChart from "../components/TradingChart";

export default {
  name: 'Home',
  components: {
    TradingChart
  }
}
</script>
