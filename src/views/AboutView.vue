<template>
  <div class="about">
    <div v-if="loading" class="loading">Loading...</div>
    <div v-else>
      <h1>Driver: {{ driver[0].full_name }} on {{ session[0].circuit_short_name }}</h1>
      <img :src="driver[0].headshot_url" alt="{{ driver[0].full_name }}" />
      <p>
        {{ session[0].location }}, {{ session[0].country_name }} {{ session[0].session_type }} held
        on
        {{ session[0].date_start }}
      </p>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Throttle</th>
            <th>RPM</th>
            <th>Gear</th>
            <th>Speed</th>
            <th>Brake</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in car" :key="item.date">
            <td>{{ item.date }}</td>
            <td>{{ item.throttle }}</td>
            <td>{{ item.rpm }}</td>
            <td>{{ item.n_gear }}</td>
            <td>{{ item.speed }}</td>
            <td>{{ item.brake }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { inject, onMounted, ref } from 'vue'

export default {
  setup() {
    const sessionKey = 9496
    const filters = { driver_number: 55, session_key: sessionKey }
    const openF1CarService = inject('openF1CarService')
    const openF1DriverService = inject('openF1DriverService')
    const openF1SessionService = inject('openF1SessionService')
    const car = ref([])
    const driver = ref([])
    const session = ref([])
    const loading = ref(true)
    const filterInvalidCarData = (data) =>
      data.filter((item) => item.throttle > 0 && item.throttle <= 100 && item.rpm > 0)

    onMounted(async () => {
      try {
        driver.value = await openF1DriverService.findBy(filters)
        car.value = filterInvalidCarData(await openF1CarService.findBy(filters))
        session.value = await openF1SessionService.findBy({ session_key: sessionKey })
        console.log(session.value)
      } catch (error) {
        console.error(error)
      } finally {
        loading.value = false
      }
    })
    return { car, driver, loading, session }
  }
}
</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}

table {
  width: 100%;
  border-collapse: collapse;
}
th,
td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}
th {
  background-color: #f4f4f4;
  color: red;
}
</style>
