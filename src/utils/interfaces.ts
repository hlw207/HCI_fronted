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
  shine: boolean
}

interface TypeChoose{
  type: string,
  choose : boolean
}

interface carRequest{
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

export {CarCollection, CarStruct, TypeChoose, carRequest}