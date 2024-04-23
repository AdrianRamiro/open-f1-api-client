import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import PaginatedTable from '../PaginatedTable.vue'

// Mock for columns
const columnsMock = [
  { key: 'id', label: 'ID' },
  { key: 'firstName', label: 'First Name' },
  { key: 'lastName', label: 'Last Name' },
  { key: 'email', label: 'Email' },
  { key: 'city', label: 'City' }
]

// Mock for rows
const rowsMock = Array.from({ length: 25 }, (_, index) => ({
  id: index + 1,
  firstName: `First${index + 1}`,
  lastName: `Last${index + 1}`,
  email: `user${index + 1}@example.com`,
  city: `City${index + 1}`
}))

describe('PaginatedTable', () => {
  it('renders default page size', () => {
    const wrapper = mount(PaginatedTable, {
      props: {
        columns: columnsMock,
        rows: rowsMock
      }
    })

    expect(wrapper.findAll('.row').length).toBe(10)
  })

  it('renders number of elements set in pageSize prop', () => {
    const wrapper = mount(PaginatedTable, {
      props: {
        columns: columnsMock,
        rows: rowsMock,
        pageSize: 15
      }
    })

    expect(wrapper.findAll('.row').length).toBe(15)
  })

  it('displays number of total pages', () => {
    const wrapper = mount(PaginatedTable, {
      props: {
        columns: columnsMock,
        rows: rowsMock,
        pageSize: 15
      }
    })

    expect(wrapper.find('.page-count').text()).toContain('Page 1 of 2')
  })
})
