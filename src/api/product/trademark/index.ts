// 品牌管理接口
import request from "@/utils/request"
import { TradeMarkResponseData, TradeMark } from './type'

enum API { 
  // 獲取已有的品牌資料
  TRADEMARK_URL="/admin/product/baseTrademark/",
  ADD_TRADEMARK_URL="/admin/product/baseTrademark/save",
  UPDATE_TRADEMARK_URL="/admin/product/baseTrademark/update",
  DELETE_URL="/admin/product/baseTrademark/remove",
}

// page: 獲取第幾頁數據 (默認第一頁)
// pageSize: 獲取一頁幾個數據
export const reqHasTrademark = (page: number, pageSize: number) => request.get<any, TradeMarkResponseData>(API.TRADEMARK_URL + `${page}/${pageSize}`)

// 新增與修改
export const reqAddOrUpdateTrademark = (data: TradeMark) => { 
  if (data.id) {
    // 修改
    return request.put<any, any>(API.UPDATE_TRADEMARK_URL, data)
  } else { 
    // 新增
    return request.post<any, any>(API.ADD_TRADEMARK_URL, data)
  } 
}

// 刪除
export const reqDeleteTrademark = (id: number) => request.delete<any, any>(API.DELETE_URL + id)