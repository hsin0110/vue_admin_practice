// 分類相關的數據 ts 類型
export interface ResponseData { 
  code: number,
  message: string,
  ok:boolean
}

// 分類 ts 類型
export interface CategoryObj {
  id: number | string,
  name: string,
  category1Id?: number,
  category2Id?: number
}

// 相應的分類接口返回數據的類型
export interface CategoryResponseData extends ResponseData { 
  data: CategoryObj[]
}

// 屬性與屬性值的 ts 類型

// 屬性值對象的 ts 類型
export interface AttrValue { 
  id?: number,
  valueName: string,
  attrId?: number,
  flag?:boolean
}

// 存每一個屬性值的數組類型
export type AttrValueList = AttrValue[]
// 屬性對象
export interface Attr { 
  id?: number,
  attrName: string,
  categoryId: number | string,
  categoryLevel: number,
  attrValueList: AttrValueList
}

// 存每一個屬性對象的數組 ts 類型
export type AttrList = Attr[]

// 屬性接口返回的數據 ts 類型
export interface AttrResponseData extends ResponseData { 
  data:Attr[]
}