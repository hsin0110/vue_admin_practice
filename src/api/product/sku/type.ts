export interface ResponseData{ 
  code: number,
  message: string,
  ok:boolean
}

// 定義 SKU 對象的 ts 類型
export interface Attr {
  id?:number,
  attrId: number|string, // 平台屬性的 ID
  valueId: number|string, // 屬性值的ID
}
  
export interface saleAttr {
  id?:number,
  saleAttrId: number|string, // 屬性的 ID
  saleAttrValueId: number|string, // 屬性值的ID
}
  
export interface SkuData { 
  category3Id?: string | number, // 三級分類ID
  spuId?: string | number, // 已有的 SPU ID
  tmId?: string | number, // SPU品牌ID
  skuName?: string, // sku 名字
  price?: string | number, // sku 價格
  weight?: string | number, // sku 重量
  skuDesc?: string, // sku的描述
  skuAttrValueList?: Attr[], // 平台屬性的收集
  skuSaleAttrValueList?:saleAttr[], // 銷售屬性
  skuDefaultImg?: string, // sku 圖片地址
  isSale?:number, // 控制商品為上架/下架狀態
  id?:number,
}

// 獲取 SKU 接口返回的數據 ts 類型
export interface SkuResponseData extends ResponseData { 
  data: {
    records: SkuData[],
    total:number,
    size:number,
    current:number,
    orders:[],
    optimizeCountSql:boolean,
    hitCount:boolean,
    countId:null,
    maxLimit:null,
    searchCount:boolean,
    pages:number,
  }
}

// 獲取 SKU 商品詳情接口的 ts 類型
export interface SkuInfoData extends ResponseData { 
  data: SkuData
}