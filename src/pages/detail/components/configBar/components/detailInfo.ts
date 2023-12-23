const parameterDetails = {
  '基本类型': [
    { name: '厂商', value: '广汽乘用车' },
    { name: '生产方式', value: '国产' },
    { name: '厂商指导价(万元)', value: '19.28' },
    { name: '上市时间', value: '2020.09' },
    { name: '能源形式', value: '汽油' },
    { name: '发动机', value: '2.0T 252马力 L4' },
    { name: '变速箱', value: '8挡自动' },
    { name: '工信部综合油耗(L/100km)', value: '8.3' },
    { name: '车身形式', value: '5门7座MPV' },
    { name: '整车质保(生产厂商)', value: '三年或10万公里' },
    // 添加更多基本类型的具体指标
    { name: '车身长度(mm)', value: '4865' },
    { name: '车身宽度(mm)', value: '1922' },
    { name: '车身高度(mm)', value: '1750' },
    { name: '轴距(mm)', value: '2850' },
    { name: '前轮距(mm)', value: '1668' },
    { name: '后轮距(mm)', value: '1670' },
    { name: '整备质量(kg)', value: '1835' },
  ],
  '发动机': [
    { name: '发动机型号', value: 'xxx' },
    { name: '进气形式', value: 'xxx' },
    // 添加更多发动机类型的具体指标
    { name: '排量(L)', value: '2.0' },
    { name: '气缸排列方式', value: '直列四缸' },
    { name: '最大马力(kW)', value: '185' },
    { name: '最大扭矩(N·m)', value: '350' },
  ],
  '变速箱': [
    { name: '变速箱类型', value: '自动' },
    // 添加更多变速箱类型的具体指标
    { name: '挡位个数', value: '8' },
    { name: '换挡方式', value: '手动/自动' },
  ],
  '车身结构': [
    // 添加车身结构的具体指标
    { name: '车门数', value: '5' },
    { name: '座位数', value: '7' },
  ],
  '底盘转向': [
    // 添加底盘转向的具体指标
    { name: '驱动方式', value: '前置前驱' },
    { name: '前悬挂类型', value: '麦弗逊式独立悬挂' },
    { name: '后悬挂类型', value: '多连杆式独立悬挂' },
    { name: '助力类型', value: '电动助力转向' },
  ],
  '安全配置': [
    // 添加安全配置的具体指标
    { name: '车辆稳定控制系统', value: '有' },
    { name: '防抱死制动系统(ABS)', value: '有' },
    { name: '制动力分配(EBD/CBC等)', value: '有' },
    { name: '高速安全系统', value: '有' },
    { name: '胎压监测装置', value: '有' },
    { name: '盲点辅助', value: '有' },
    { name: '主动刹车/主动安全系统', value: '有' },
    { name: '泊车辅助/倒车影像', value: '有' },
    { name: '自动驻车', value: '有' },
    { name: '自动泊车入位', value: '有' },
    { name: '夜视系统', value: '无' },
    { name: '后排座椅安全气囊', value: '有' },
  ],
  '辅助操控配置': [
    // 添加辅助操控配置的具体指标
    { name: '定速巡航系统', value: '有' },
    { name: '自适应巡航系统', value: '有' },
    { name: '倒车雷达数量', value: '4' },
    { name: '倒车视频影像', value: '有' },
    { name: '行车电脑显示屏', value: '有' },
    { name: '全景摄像头', value: '无' },
    { name: 'HUD抬头数字显示', value: '无' },
    { name: '胎压监测装置', value: '有' },
    { name: '自动泊车入位', value: '有' },
  ],
  '外部配置': [
    // 添加外部配置的具体指标
    { name: '前大灯类型', value: 'LED大灯' },
    { name: '日间行车灯', value: '有' },
    { name: '前雾灯', value: '有' },
    { name: '后雾灯', value: '有' },
    { name: '前电动车窗', value: '有' },
    { name: '后电动车窗', value: '有' },
    { name: '后视镜电动调节', value: '有' },
    { name: '后视镜加热', value: '有' },
    { name: '后视镜电动折叠', value: '有' },
    { name: '感应雨刷', value: '有' },
    { name: '后排侧遮阳帘', value: '有' },
    { name: '后风挡遮阳帘', value: '无' },
    { name: '电动天窗', value: '有' },
    { name: '全景天窗', value: '无' },
    { name: '运动外观套件', value: '无' },
    { name: '铝合金轮圈', value: '有' },
  ],
  '内部配置': [
    // 添加内部配置的具体指标
    { name: '方向盘调节', value: '有' },
    { name: '方向盘电动调节', value: '无' },
    { name: '多功能方向盘', value: '有' },
    { name: '方向盘换挡', value: '无' },
    { name: '方向盘加热', value: '有' },
    { name: '方向盘记忆', value: '无' },
    { name: '定速巡航', value: '有' },
    { name: '前座中央扶手', value: '有' },
    { name: '后座中央扶手', value: '有' },
    { name: '前排座椅加热', value: '有' },
    { name: '后排座椅加热', value: '无' },
    { name: '前排座椅通风', value: '无' },
    { name: '后排座椅通风', value: '无' },
    { name: '座椅材质', value: '真皮' },
    { name: '运动风格座椅', value: '无' },
    { name: '座椅高低调节', value: '有' },
    { name: '腰部支撑调节', value: '有' },
  ],
  '座椅配置': [
    // 添加座椅配置的具体指标
    { name: '座椅材质', value: '真皮' },
    { name: '座椅颜色', value: '黑色' },
    { name: '座椅调节方式', value: '电动' },
    { name: '座椅加热', value: '可选' },
    { name: '座椅通风', value: '可选' },
  ],
  '多媒体配置': [
    // 添加多媒体配置的具体指标
    { name: '中控屏尺寸', value: '10英寸' },
    { name: '音响系统', value: 'Bose' },
    { name: '蓝牙连接', value: '支持' },
    { name: '导航系统', value: '内置' },
    { name: 'USB接口数量', value: '2个' },
  ],
  '灯光配置': [
    // 添加灯光配置的具体指标
    { name: '前大灯类型', value: 'LED' },
    { name: '日间行车灯', value: 'LED' },
    { name: '自动头灯', value: '支持' },
    { name: '转向辅助灯', value: '支持' },
    { name: '前雾灯', value: '支持' },
  ],
  '玻璃/后视镜': [
    // 添加玻璃/后视镜配置的具体指标
    { name: '前挡风玻璃', value: '隔音防噪' },
    { name: '后视镜电动调节', value: '支持' },
    { name: '后视镜加热', value: '支持' },
    { name: '后视镜电动折叠', value: '支持' },
    { name: '后挡风玻璃', value: '可开启' },
  ],
  '空调/冰箱': [
    // 添加空调/冰箱配置的具体指标
    { name: '空调控制方式', value: '自动空调' },
    { name: '后排独立空调', value: '支持' },
    { name: '空气调节/花粉过滤', value: '支持' },
    { name: '车内空气净化器', value: '支持' },
    { name: '行李箱冷藏箱', value: '支持' },
  ],
};


export default parameterDetails;