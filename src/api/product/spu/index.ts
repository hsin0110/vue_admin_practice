// SPU 管理接口
import request from "@/utils/request"
import type {
  HasSpuResponseData, AllTrademark, SpuHasImg, SaleAttrResponseData, HasSaleAttrResponseData,
  SpuData, SkuData, SkuInfoData} from "./type"
enum API { 
  // 獲取已有的 SPU 資料
  HASSPU_URL = '/admin/product/',
  // 獲取全部品牌的數據
  ALLTRADEMARK_URL='/admin/product/baseTrademark/getTrademarkList',
  // 獲取某一 SPU 下的全部售賣商品圖片
  IMAGE_URL = '/admin/product/spuImageList/',
  // 獲取某一 SPU 下全部已有的銷售屬性接口地址
  SPUHASSALEATTR_URL = '/admin/product/spuSaleAttrList/',
  // 獲取整個項目全部的銷售屬性[顏色、版本、尺寸]
  ALLSALEATTR_URL = '/admin/product/baseSaleAttrList',
  // 追加一個新的 SPU
  ADDSPU_URL = '/admin/product/saveSpuInfo',

  // 更新已有的 SPU
  UPDATESPU_URL = '/admin/product/updateSpuInfo',

  // 追加一個新增的 SKU 地址
  ADDSKU_URL = '/admin/product/saveSkuInfo',

  // 查看已有的SPU下全部販售的商品
  SKUINFO_URL = '/admin/product/findBySpuId/',

  // 刪除已有的SPU
  REMOVESKU_URL = '/admin/product/deleteSku/',
  
}
// 獲取某個三級分類下已有的 SPU 數據
export const reqHasSpu = (page: number, limit: number, category3Id: string | number) => request.get<any, HasSpuResponseData>(API.HASSPU_URL + `${page}/${limit}?category3Id=${category3Id}`)

// 獲取全部 SPU 品牌的數據
export const reqAllTradeMark = () => request.get<any, AllTrademark>(API.ALLTRADEMARK_URL)

// 獲取某一已有的 SPU 下全部商品的圖片地址
export const reqSpuImageList = (spuId: number) => request.get<any, SpuHasImg>(API.IMAGE_URL + spuId)

// 獲取某一已有的 SPU 擁有多少個銷售屬性
export const reqSpuHasSaleAttr = (spuId: number) => request.get<any, SaleAttrResponseData>(API.SPUHASSALEATTR_URL + spuId)

// 獲取整個項目全部的銷售屬性[顏色、版本、尺寸]
export const reqAllSaleAttr = () => request.get<any, HasSaleAttrResponseData>(API.ALLSALEATTR_URL)

// 追加一個新的/更新 SPU
// data: 即為新增的 SPU | 已有的 SPU 對象
export const reqAddOrUpdateSpu = (data: SpuData) => { 
  if (data.id) {
    return request.post<any, any>(API.UPDATESPU_URL, data)
  } else { 
     return request.post<any, any>(API.ADDSPU_URL, data)
  }
}

// 添加 SKU
export const reqAddSku = (data: SkuData) => request.post<any, any>(API.ADDSKU_URL, data)

// 獲取 SKU
export const reqSkuList = (spuId: number | string) => request.get<any, SkuInfoData>(API.SKUINFO_URL + spuId)

// 刪除 SPU
export const reqRemoveSpu = (spuId: number|string) => request.delete<any, any>(API.REMOVESKU_URL+spuId)