interface OrderDetailData {
  id: number,
  train_id: number,
  seat: string,
  status: string,
  created_at: string,
  start_station_id: number,
  end_station_id: number,
  departure_time: string,
  arrival_time: string,
  price: number
  price_last: number
}

interface OrderData{
  id: number,
  user_name: string,
  train_name: string,
  seat: string,
  start_station_id: number,
  end_station_id: number,
  arrival_time: string,
  departure_time: string,
  status: string,
  price: number
}

interface OrderInfo{
  id: number,
  user_name: string,
  train_name: string
}
interface TicketInfo {
  type: string,
  price: number,
  count: number,
}

interface RouteInfo {
  id: number,
  name: string,
  station_ids: Array<number>,
}

interface StationInfo {
  id: number,
  name: string,
}

interface TrainInfo {
  id: number,
  name: string,
  route_id: number,
  train_type: string,
  date: string,
  departure_times: Array<string>,
  arrival_times: Array<string>,
  extra_infos: Array<string>,
  price: Array<number>
}

interface TrainDetailInfo {
  id: number,
  name: string,
  station_ids: Array<number>,
  date: string,
  departure_times: Array<string>,
  arrival_times: Array<string>,
  extra_infos: Array<string>
}

export { OrderDetailData, OrderData,OrderInfo,TicketInfo, RouteInfo, StationInfo, TrainInfo,TrainDetailInfo }