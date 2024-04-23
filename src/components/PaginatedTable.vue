<template>
  <div>
    <div class="controls">
      <label for="pageSize">Rows per page:</label>
      <select id="pageSize" v-model="localPageSize">
        <option value="10">10</option>
        <option value="25">25</option>
        <option value="50">50</option>
        <option value="100">100</option>
      </select>
      <button @click="prevPage" :disabled="currentPage <= 1">Prev</button>
      <span class="page-count">Page {{ currentPage }} of {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage >= totalPages">Next</button>
    </div>
    <table>
      <thead>
        <tr>
          <th v-for="column in columns" :key="column.key" @click="sortByColumn(column.key)">
            {{ column.label }}
            <span v-if="sortKey === column.key">
              {{ sortOrder === 'asc' ? '🔼' : '🔽' }}
            </span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in tableData" :key="item.id" class="row">
          <td v-for="column in columns" :key="column.key">
            {{ item[column.key] }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { type sortOrder, sortData, paginateData } from '@/utils/table'

export interface Column {
  key: string
  label: string
}

export interface Row {
  [key: string]: any
}

export default defineComponent({
  props: {
    rows: {
      type: Array as () => Row[],
      required: true
    },
    columns: {
      type: Array as () => Column[],
      required: true
    },
    pageSize: {
      type: Number,
      default: 10
    }
  },
  data() {
    return {
      currentPage: 1,
      localPageSize: this.pageSize,
      sortKey: '',
      sortOrder: 'asc' // 'asc' or 'desc'
    }
  },
  watch: {
    localPageSize(newSize) {
      this.currentPage = 1 // Reset to first page when page size changes
      this.localPageSize = Math.max(parseInt(newSize, 10), 10) // Ensure it's a number >= 10
    }
  },
  computed: {
    totalPages() {
      const totalRows = this.rows?.length || 1
      return Math.ceil(totalRows / this.localPageSize)
    },
    tableData() {
      const orderBy: sortOrder = {
        key: this.sortKey,
        order: this.sortOrder === 'asc' || this.sortOrder === 'desc' ? this.sortOrder : 'asc'
      }

      return paginateData(sortData(this.rows, orderBy), this.currentPage, this.localPageSize)
    }
  },
  methods: {
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--
      }
    },
    sortByColumn(key: string) {
      if (this.sortKey === key) {
        this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc'
      } else {
        this.sortKey = key
        this.sortOrder = 'asc'
      }
    }
  }
})
</script>

<style>
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
  color: #333;
  font-weight: bold;
}
.controls {
  margin-bottom: 10px;
}
</style>
