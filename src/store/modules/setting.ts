// layout 組件配置相關
import { defineStore } from "pinia";

let useLayoutSettingStore = defineStore('SettingStore', {
  state: () => { 
    return {
      isFold: false, // sidebar 收合/展開
      refresh: false, // 刷新
    }
  }
})

export default useLayoutSettingStore