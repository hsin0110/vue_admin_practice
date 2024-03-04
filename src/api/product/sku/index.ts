// SKU 模塊接口管理
import request from "@/utils/request"
import type { SkuResponseData, SkuInfoData } from "./type"

enum API {
  // 獲取已有的商品數據 - SKU
  SKU_URL = '/admin/product/list/',
  // 商品上架
  SALE_URL='/admin/product/onSale/',
  // 商品下架
  CANCELSALE_URL = '/admin/product/cancelSale/',

  // 獲取商品詳情
  SKUINFO_URL = '/admin/product/getSkuInfo/',

  // 刪除已有商品
  DELETESKU_URL = '/admin/product/deleteSku/{skuId}',
  
}

// 獲取商品 SKU 接口
export const reqSkuList = (page: number, limit:number) => request.get<any, SkuResponseData>(API.SKU_URL + `${page}/${limit}`)

// 已有商品上架請求
export const reqSaleSku = (skuId:number)=>request.get<any, any>(API.SALE_URL + skuId)
// 已有商品下架請求
export const reqCancelSale = (skuId: number) => request.get<any, any>(API.CANCELSALE_URL + skuId)

// 獲取商品詳情
export const reqSkuInfo = (skuId: number) => request.get<any, SkuInfoData>(API.SKUINFO_URL + skuId)

// 刪除已有商品
export const reqRemoveSku = (skuId: number) => request.delete<any, any>(API.DELETESKU_URL + skuId)