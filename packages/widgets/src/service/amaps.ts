

export interface AmapsProps{
  serviceMethod: string;
}

export interface AmapService<T>{
  getResult:()=> T | undefined;
  searchPlaces:(searchKey: string)=> void
}


export class Amaps<T> implements AmapService<T>{
  // 高德服务接口
  private serviceMethod: string
  // 高德key
  public geoKey = 'f49a4a0f692f6a5a9c00457c89f86332'
  // 高德服务
  public AMap: any
  // 查询的地区的结果
  private res: T | undefined

  constructor(params: AmapsProps){
    const { serviceMethod } = params
    this.serviceMethod = serviceMethod

    this.loadMaps()
  }

  // 按需加载高德service
  loadMaps(){
    const src = `https://webapi.amap.com/maps?v=1.4.15&key=${this.geoKey}&plugin=AMap.${this.serviceMethod}`
    this.AMap = new Promise<any>((resolve, reject) => {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.async = true;
      script.src = src;
      script.onerror = reject;
      document.head.appendChild(script);
      script.onload = () => {
        resolve(window.AMap);
      };
    });
  }

  // Pio地区查询
  async searchPlaces(searchKey: string){
    const AMap = await this.AMap
    const placeSearch = new AMap[this.serviceMethod]()
    placeSearch.search(searchKey, (status: string, result: any) => {
      if (status === 'complete') {
        if (result.info === 'OK') {
          this.res = result.tips
        }
      } else {
        console.error('查询失败', result)
      }
    })
  }

  // 获取查询poi的结果
  getResult(): T | undefined {
    return this.res
  }
}
