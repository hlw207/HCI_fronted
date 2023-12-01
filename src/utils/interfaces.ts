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

export {CarCollection, CarStruct}