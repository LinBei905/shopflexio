<template>
  <section class="bg-white py-8">
    <!-- <h1 class="w-full mt-2 mb-6 text-5xl font-bold leading-tight text-center text-gray-800">
      Integrations
    </h1> -->

    <div class="w-full mb-4">
      <div class="h-1 mx-auto gradient w-64 opacity-25 my-0 py-0 rounded-t"></div>
    </div>

    <transition name="el-fade-in">
      <div v-if="list.length != 0" class="marquee">
        <vt-marquee v-for="(list, pIndex) in [list1, list2]" :key="pIndex" :duration="50">
          <div
            v-for="item in list"
            :key="item.id"
            class="marquee__item gap-2 items-center mx-2 inline-flex py-4 px-6 mb-8"
          >
            <img :src="item.icon" style="width: 24px; height: 24px;" />
            <span>
              {{ item.name }}
            </span>
          </div>
        </vt-marquee>
      </div>
    </transition>

    <!-- <workflow-table /> -->
  </section>
</template>

<script lang="ts">
import { computed } from '@nuxtjs/composition-api'

import WorkflowTable from '~/components/workflow/table.vue'
import { useCommonStore } from '~/composables'

function filterHiddenItems(list: any[]) {
  return list.filter((item) => item.hidden != true)
}

function normalizeList(list: any[]) {
  return list.map((item) => {
    let { name, display } = item
    display = display || {}

    let _name = name
    let _icon = item.icon

    if (display.name) {
      _name = display.name
    }

    if (display.icon) {
      _icon = display.icon
    }

    return {
      ...item,
      name: _name,
      icon: _icon,
    }
  })
}

export default {
  name: 'Integrations',
  components: {
    WorkflowTable,
    VtMarquee: () => import('./VtMarquee.vue'),
  },
  setup() {
    const { platforms, integrations } = useCommonStore()
    const list = computed(() => {
      let _list = [...platforms.value, ...integrations.value]
      _list = filterHiddenItems(_list)
      return normalizeList(_list)
    })
    const mid = computed(() => {
      return Math.floor(list.value.length / 2)
    })

    const list1 = computed(() => {
      return list.value.slice(0, mid.value)
    })
    const list2 = computed(() => list.value.slice(mid.value + 1))

    return {
      platforms,
      integrations,
      list,
      mid,
      list1,
      list2,
    }
  },
}
</script>

<style lang="scss" scoped>
.marquee {
  color: black;

  &__item {
    background: #f4f4f5;
    border-radius: 999px;
    &:hover {
      color: var(--vt-c-primary);
      background: #e9f0fe;
    }
  }
}
</style>
