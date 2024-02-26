// 服務器全部接口返回的數據類型

export interface ResponseData{ 
  code: number,
  message: string,
  ok:boolean
}

// SPU 數據的 ts 類型: 需要修改
export interface SpuData {
  id?: number,
  spuName: string,
  tmId: number|string, // 品牌 id
  description: string,
  spuImageList: null|SpuImg[]
  category3Id: string | number,  
  spuSaleAttrList: null|SaleAttr[],  
}

// 數組：元素都是已有 SPI 數據類型
export type Records = SpuData[]

// 獲取已有的 SPU 接口返回的數據 ts 類型
export interface HasSpuResponseData extends ResponseData{ 
  data: {
    records: Records,
    total: number,
    size: number,
    current: number,
    searchCount: boolean,
    pages: number
  }
}

// 品牌數據的 ts 類型
export interface Trademark { 
  id: number,
  tmName: string,
  logoUrl: string
}

// 品牌接口返回的數據 ts 類型
export interface AllTrademark extends ResponseData{ 
  data:Trademark[]
}

// 商品圖片的 ts 類型
export interface SpuImg { 
  id?: number,
  createTime?: string,
  updateTime?: string,
  spuId?: number,
  imgName?: string,
  imgUrl?: string,
  name?: string,
  url?: string,
}

// 已有的 SPU 照片牆數據的 ts 類型
export interface SpuHasImg extends ResponseData{ 
  data:SpuImg[]
}

// 已有的銷售屬性值對象 ts 類型
export interface SaleAttrValue { 
  id?: number,
  createTime: null,
  updateTime: null,
  spuId?: number,
  baseSaleAttrId: number|string,
  saleAttrValueName: string,
  saleAttrName?: string,
  isChecked?: null
}

// 存已有的銷售屬性值數組類型
export type spuSaleAttrValueList = SaleAttrValue[]

// 銷售屬性對象 ts 類型
export interface SaleAttr { 
  id?: number,
  createTime?: null,
  updateTime?: null,
  spuId?: number,
  baseSaleAttrId: number|string,
  saleAttrName: string,
  spuSaleAttrValueList: spuSaleAttrValueList,
  flag?: boolean,
  saleAttrValue?:string
}

// SPU 已有的銷售屬性接口返回數據 ts 類型
export interface SaleAttrResponseData extends ResponseData{ 
  data:SaleAttr[]
}

// 已有的全部 SPU 的返回數據 ts 類型
export interface HasSaleAttr { 
  id:number,
  name:string
}

export interface HasSaleAttrResponseData extends ResponseData{ 
  data:HasSaleAttr[]
}