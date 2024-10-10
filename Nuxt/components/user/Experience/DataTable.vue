<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { valueUpdater } from '@/lib/utils'
import { parseDate, type DateValue } from '@internationalized/date'
import type { ColumnDef, ColumnFiltersState, ExpandedState, SortingState, VisibilityState } from '@tanstack/vue-table'
import {
  FlexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useVueTable,
} from '@tanstack/vue-table'
import dayjs from 'dayjs'

const { editing, load, data, remove, form } = useExperience()
await load()

const columns: ColumnDef<Experience>[] = [
  {
    id: 'select',
    header: ({ table }) =>
      h(Checkbox, {
        checked: table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate'),
        'onUpdate:checked': (value) => table.toggleAllPageRowsSelected(!!value),
        ariaLabel: 'Select all',
      }),
    cell: ({ row }) =>
      h(Checkbox, {
        checked: row.getIsSelected(),
        'onUpdate:checked': (value) => row.toggleSelected(!!value),
        ariaLabel: 'Select row',
      }),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'duration',
    header: 'Duration',
    cell: ({ row }) =>
      h(
        'div',
        { class: 'capitalize' },
        `${dayjs(row.original.start).format('YYYY-MM')} ~ ${dayjs(row.original.end).format('YYYY-MM')}`,
      ),
  },
  {
    accessorKey: 'company',
    header: 'Company',
    cell: ({ row }) => h('div', { class: 'capitalize' }, row.getValue('company')),
  },
  {
    accessorKey: 'position',
    header: 'Position',
    cell: ({ row }) => h('div', { class: 'capitalize' }, row.getValue('position')),
  },
  {
    accessorKey: 'opration',
    header: 'Opration',
    cell: ({ row }) =>
      [
        {
          label: 'delete',
          onClick: () => remove(row.original.id),
        },
        {
          label: 'update',
          onClick: () => {
            Object.assign(form, {
              id: row.original.id,
              start: ref<DateValue>(parseDate(row.original.start)),
              end: ref<DateValue>(parseDate(row.original.end)),
              company: row.original.company,
              position: row.original.position,
            })
            editing.value = true
          },
        },
      ].map(({ onClick, label }) =>
        h(
          Button,
          {
            variant: 'outline',
            onClick,
            class: 'capitalize rounded-lg ml-2',
          },
          () => label,
        ),
      ),
  },
]

const sorting = ref<SortingState>([])
const columnFilters = ref<ColumnFiltersState>([])
const columnVisibility = ref<VisibilityState>({})
const rowSelection = ref({})
const expanded = ref<ExpandedState>({})

const table = useVueTable({
  data,
  columns,
  getCoreRowModel: getCoreRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
  getSortedRowModel: getSortedRowModel(),
  getFilteredRowModel: getFilteredRowModel(),
  getExpandedRowModel: getExpandedRowModel(),
  onSortingChange: (updaterOrValue) => valueUpdater(updaterOrValue, sorting),
  onColumnFiltersChange: (updaterOrValue) => valueUpdater(updaterOrValue, columnFilters),
  onColumnVisibilityChange: (updaterOrValue) => valueUpdater(updaterOrValue, columnVisibility),
  onRowSelectionChange: (updaterOrValue) => valueUpdater(updaterOrValue, rowSelection),
  onExpandedChange: (updaterOrValue) => valueUpdater(updaterOrValue, expanded),
  state: {
    get sorting() {
      return sorting.value
    },
    get columnFilters() {
      return columnFilters.value
    },
    get columnVisibility() {
      return columnVisibility.value
    },
    get rowSelection() {
      return rowSelection.value
    },
    get expanded() {
      return expanded.value
    },
  },
})
table.setPageSize(5)
</script>

<template>
  <!-- data tabel header -->
  <div class="flex gap-2 items-center py-4">
    <Button variant="outline" class="ml-auto rounded-md text-2xl" @click="editing = true"> + </Button>
  </div>
  <!-- data table -->
  <div class="rounded-md border">
    <Table>
      <TableHeader>
        <TableRow v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
          <TableHead v-for="header in headerGroup.headers" :key="header.id">
            <FlexRender
              v-if="!header.isPlaceholder"
              :render="header.column.columnDef.header"
              :props="header.getContext()"
            />
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <template v-if="table.getRowModel().rows?.length">
          <template v-for="row in table.getRowModel().rows" :key="row.id">
            <TableRow :data-state="row.getIsSelected() && 'selected'">
              <TableCell v-for="cell in row.getVisibleCells()" :key="cell.id">
                <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
              </TableCell>
            </TableRow>
            <TableRow v-if="row.getIsExpanded()">
              <TableCell :colspan="row.getAllCells().length">
                {{ JSON.stringify(row.original) }}
              </TableCell>
            </TableRow>
          </template>
        </template>
        <TableRow v-else>
          <TableCell :colspan="columns.length" class="h-24 text-center"> No results. </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </div>
  <!-- pagnition -->
  <div class="flex items-center justify-end space-x-2 py-4">
    <div class="flex-1 text-sm text-muted-foreground">
      {{ table.getFilteredSelectedRowModel().rows.length }} of {{ table.getFilteredRowModel().rows.length }} row(s)
      selected.
    </div>
    <div class="space-x-2">
      <Pagination
        v-slot="{ page }"
        @update:page="(page) => table.setPageIndex(page - 1)"
        :total="data.length"
        :items-per-page="5"
        show-edges
        :sibling-count="1"
        :default-page="1"
      >
        <PaginationList v-slot="{ items }" class="flex items-center gap-1">
          <PaginationFirst />
          <PaginationPrev />
          <template v-for="(item, index) in items">
            <PaginationListItem v-if="item.type === 'page'" :key="index" :value="item.value" as-child>
              <Button class="w-10 h-10 p-0" :variant="item.value === page ? 'default' : 'outline'">
                {{ item.value }}
              </Button>
            </PaginationListItem>
            <PaginationEllipsis v-else :key="item.type" :index="index" />
          </template>
          <PaginationNext />
          <PaginationLast />
        </PaginationList>
      </Pagination>
    </div>
  </div>
</template>
