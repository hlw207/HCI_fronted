interface CarCollection{
  id: number,
  picturePath: string,
  name: string,
  price: number,
  time: string,
  mileage: number,
  source: string
}

interface CarStruct{
  id: number,
  name: string,
  price: number,
  color: string,
  image: string,
  time: string,
  mileage: number,
  source: string,
}

interface TypeChoose{
  type: string,
  choose : boolean
}

interface carRequest{
  search: string,
  brand: string,
  carType: string,
  price: string,
  carLevel: string,
  carDetailType: string,
  carAge: string,
  carPollution: string,
  carDistance: string,
  carColor: string,
  carGear: string
}

interface mask{
  name: string,
  description: string,
  brand: string,
  carType: string
}

interface choose{
  title: string,
  type: string,
  choose: string
}

export {CarCollection, CarStruct, TypeChoose, carRequest, mask, choose}