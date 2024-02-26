// 商品分類全局組件的小倉庫
import { defineStore } from 'pinia'
import { reqC1, reqC2 } from '@/api/product/attr'
import type { CategoryResponseData } from '@/api/product/attr/type'
import type { CategoryState } from './types/type'
let useCategoryStore = defineStore('Category', {
  state: ():CategoryState => { 
    return {
      // 一級分類數據
      c1Arr: [],
      // 一級分類 id
      c1Id: '',
      // 對應一級分類下的二級分類數據
      c2Arr: [],
      // 二級分類 id
      c2Id: '',
      // 對應二級分類下的三級分類數據
      c3Arr: [],
      // 三級分類 id
      c3Id: '',
      
    }
  },
  actions: {
    // 獲取一級
    async getC1() {
      let result: CategoryResponseData = await reqC1()
      if (result.code === 200) { 
        this.c1Arr = result.data
      }
    },
    // 獲取二級
    async getC2() { 
      let result: CategoryResponseData = await reqC2(this.c1Id)
      if (result.code === 200) { 
        this.c2Arr = result.data
      }
    },
    // 獲取三級
    async getC3() { 
      let result: CategoryResponseData = await reqC3(this.c2Id)
      if (result.code === 200) { 
        this.c3Arr = result.data
      }
    }
  },
  getters: {}
})

export default useCategoryStore