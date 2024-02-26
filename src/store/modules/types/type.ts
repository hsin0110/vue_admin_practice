import type { RouteRecordRaw } from "vue-router"
import type { CategoryObj } from "@/api/product/attr/type"
export interface UserState { 
  token: string | null,
  menuRoutes: RouteRecordRaw[],
  userName: string,
  avatar: string
}

// 定義分類倉庫 state 對象的 ts 類型
export interface CategoryState { 
  c1Id: string | number,
  c1Arr: CategoryObj[],
  c2Arr: CategoryObj[],
  c2Id: string | number,
  c3Arr: CategoryObj[],
  c3Id: string | number,
}