
// 定義屬性相關 API 文件
import request from "@/utils/request"
import type { CategoryResponseData, AttrResponseData, Attr} from "./type"
// 屬性管理模塊接口
enum API { 
  // 獲取一級分類
  C1_URL = '/admin/product/getCategory1',
  // 獲取二級分類
  C2_URL = '/admin/product/getCategory2/',
  // 獲取三級分類
  C3_URL = '/admin/product/getCategory3/',
  // 獲取分類下已有的屬性與屬性值
  ATTR_URL = '/admin/product/attrInfoList/',
  // 添加或修改已有的屬性
  ADDORUPDATEATTR_URL = '/admin/product/saveAttrInfo',
  // 刪除已有屬性
  DELETEATTR_URL='/admin/product/deleteAttr/'
}

// 獲取一級分類方法
export const reqC1 = () => request.get<any, CategoryResponseData>(API.C1_URL)
// 獲取二級分類方法
export const reqC2 = (category1Id: number|string) => request.get<any, CategoryResponseData>(API.C2_URL + category1Id)
// 獲取三級分類方法
export const reqC3 = (category2Id: number | string) => request.get<any, CategoryResponseData>(API.C3_URL + category2Id)
// 獲取分類下已有的屬性與屬性值方法
export const reqAttr = (category1Id: number | string, category2Id: number | string, category3Id: number | string) => request.get<any, AttrResponseData>(API.ATTR_URL + `${category1Id}/${category2Id}/${category3Id}`)
// 添加或修改已有的屬性方法
export const reqAddOrUpdateAttr = (data:Attr) => request.post<any, any>(API.ADDORUPDATEATTR_URL, data)
// 刪除已有屬性
export const reqRemoveAttr = (attrId: number) => request.delete<any, any>(API.DELETEATTR_URL + attrId)
