<template>
  <div class="session-time-series-car">
    <h2>Session time-series by car</h2>

    <div v-if="loading" class="loading">Loading...</div>
    <div v-else>
      <h3>Driver: {{ selectedDriver.full_name }} on {{ session.circuit_short_name }}</h3>
      <img :src="selectedDriver.headshot_url" :alt="selectedDriver.full_name" />
      <p>
        {{ session.location }}, {{ session.country_name }} {{ session.session_type }} held on
        {{ session.date_start }}
      </p>

      <label for="selectedDriver">Select driver:</label>
      <select v-model="selectedDriverNumber" id="selectedDriverNumber">
        <option v-for="driver in drivers" :key="driver.driver_number" :value="driver.driver_number">
          {{ driver.full_name }}
        </option>
      </select>

      <PaginatedTable :rows="filterInvalidCarData(car)" :columns="columns" :pageSize="pageSize" />
    </div>
  </div>
</template>

<script>
import { inject, onMounted, ref, watch } from 'vue'
import PaginatedTable from '@/components/PaginatedTable.vue'

const getDriverFromDrivers = (drivers, driverNumber) =>
  drivers.find((driver) => driver.driver_number === driverNumber)

export default {
  components: {
    PaginatedTable
  },
  computed: {
    selectedDriver() {
      return getDriverFromDrivers(this.drivers, this.selectedDriverNumber)
    }
  },
  setup() {
    const sessionKey = 9496
    const openF1CarService = inject('openF1CarService')
    const openF1DriverService = inject('openF1DriverService')
    const openF1SessionService = inject('openF1SessionService')
    const car = ref([])
    const drivers = ref([])
    const selectedDriverNumber = ref(1)
    const session = ref([])
    const loading = ref(true)
    const page = ref(1)
    const pageSize = ref(10)
    const filters = ref({ driver_number: selectedDriverNumber.value, session_key: sessionKey })
    const filterInvalidCarData = (data) => {
      return data?.filter((item) => item.throttle > 0 && item.throttle <= 100 && item.rpm > 0)
    }
    const columns = [
      { key: 'date', label: 'Date' },
      { key: 'throttle', label: 'Throttle %' },
      { key: 'rpm', label: 'RPM' },
      { key: 'n_gear', label: 'Gear' },
      { key: 'speed', label: 'Speed in Km/h' },
      { key: 'brake', label: 'Brake %' }
    ]

    const fetchCarData = () => {
      try {
        return openF1CarService.findBy(filters.value)
      } catch (error) {
        console.error(error)
      }
    }

    const fetchAndSetCarData = async () => {
      try {
        console.log('fetchAndSetCarData', filters.value, selectedDriverNumber.value)
        car.value = await fetchCarData()
      } catch (error) {
        console.error(error)
      }
    }

    watch(selectedDriverNumber, (newValue) => {
      filters.value = { driver_number: newValue, session_key: sessionKey }
      fetchAndSetCarData()
    })

    onMounted(async () => {
      try {
        await Promise.all([
          openF1DriverService.findBy({ session_key: sessionKey }),
          fetchCarData(filters),
          openF1SessionService.findOne({ session_key: sessionKey })
        ]).then((responses) => {
          drivers.value = responses[0]
          car.value = responses[1]
          session.value = responses[2]
        })
      } catch (error) {
        console.error(error)
      } finally {
        loading.value = false
      }
    })

    return {
      car,
      columns,
      drivers,
      fetchAndSetCarData,
      filterInvalidCarData,
      loading,
      session,
      page,
      pageSize,
      selectedDriverNumber
    }
  }
}
</script>

<style>
@media (min-width: 1024px) {
  .session-time-series-ar {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
