const buyDataPrice = ['3万以下','3-5万','5-10万','10-15万','15-20万','20-30万','30-60万','60万以上']

const buyDataType = [
    {title: '降价车', type: 'brand', choose: '不限'}
    ,{title: '准新车', type: 'brand', choose: '不限'}
    ,{title: '急售车', type: 'brand', choose: '不限'}
    ,{title: '紧凑型车', type: 'carLevel', choose: '紧凑型车'}
    ,{title: '中大型车', type: 'carLevel', choose: '中大型车'}
    ,{title: '豪华车', type: 'carLevel', choose: '大型车'}
    ,{title: '超值SUV', type: 'carDetailType', choose: 'SUV'}
    ,{title: '商务行政', type: 'carDetailType', choose: 'MPV'}

]

const buyDataBrand = [
    {brand: '大众', path: 'https://box.nju.edu.cn/thumbnail/07d3ddadbcd84a228e26/1024/icon1.png'}
    ,{brand: '本田', path: 'https://box.nju.edu.cn/thumbnail/07d3ddadbcd84a228e26/1024/icon2.png'}
    ,{brand: '丰田', path: 'https://box.nju.edu.cn/thumbnail/07d3ddadbcd84a228e26/1024/icon3.png'}
    ,{brand: '别克', path: 'https://box.nju.edu.cn/thumbnail/07d3ddadbcd84a228e26/1024/icon4.png'}
    ,{brand: '宝马', path: 'https://box.nju.edu.cn/thumbnail/07d3ddadbcd84a228e26/1024/icon5.png'}
    ,{brand: '福特', path: 'https://box.nju.edu.cn/thumbnail/07d3ddadbcd84a228e26/1024/icon6.png'}
    ,{brand: '日产', path: 'https://box.nju.edu.cn/thumbnail/07d3ddadbcd84a228e26/1024/icon7.png'}
]

export default {buyDataPrice, buyDataType, buyDataBrand}