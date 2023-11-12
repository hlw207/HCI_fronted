<template>
    <div class="car-buying-page">
        <h1>我要买车</h1>

        <div class="filters">
            <button
                    :class="{ active: selectedBrand === '' }"
                    @click="selectBrand('')"
            >
                全部品牌
            </button>
            <button
                    v-for="brand in brands"
                    :key="brand"
                    :class="{ active: selectedBrand === brand }"
                    @click="selectBrand(brand)"
            >
                {{ brand }}
            </button>
        </div>

        <div class="filters">
            <button
                    :class="{ active: selectedSeries === '' }"
                    @click="selectSeries('')"
            >
                全部车系
            </button>
            <button
                    v-for="series in seriesList"
                    :key="series"
                    :class="{ active: selectedSeries === series }"
                    @click="selectSeries(series)"
            >
                {{ series }}
            </button>
        </div>

        <div class="filters">
            <button
                    :class="{ active: selectedPrice === '' }"
                    @click="selectPrice('')"
            >
                全部价格
            </button>
            <button
                    v-for="priceRange in priceRanges"
                    :key="priceRange"
                    :class="{ active: selectedPrice === priceRange }"
                    @click="selectPrice(priceRange)"
            >
                {{ priceRange }}
            </button>
        </div>

        <ul class="car-list">
            <li v-for="car in filteredCars" :key="car.id" class="car-item">
                <div class="car-info">
                    <div class="car-image">
                        <img :src="car.image" alt="Car Image">
                    </div>
                    <div class="car-details">
                        <h2>{{ car.brand }} - {{ car.series }}</h2>
                        <p>价格：{{ car.price }} 元</p>
                        <p>颜色：{{ car.color }}</p>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
import { reactive, computed } from 'vue';
import carData from './carData';

export default {
    name: 'CarBuyingPage',
    components: {
        carData,
    },
    setup() {
        const state = reactive({
            selectedBrand: '',
            selectedSeries: '',
            selectedPrice: '',
            cars: carData,
        });

        const brands = computed(() => {
            // 获取可选的品牌列表
            const brandSet = new Set();
            for (const car of state.cars) {
                brandSet.add(car.brand);
            }
            return [''].concat(Array.from(brandSet));
        });

        const seriesList = computed(() => {
            // 获取可选的车系列表
            const seriesSet = new Set();
            for (const car of state.cars) {
                if (state.selectedBrand === '' || car.brand === state.selectedBrand) {
                    seriesSet.add(car.series);
                }
            }
            return [''].concat(Array.from(seriesSet));
        });

        const priceRanges = computed(() => {
            // 获取可选的价格区间列表
            const priceRangeSet = new Set();
            for (const car of state.cars) {
                if (
                    (state.selectedBrand === '' || car.brand === state.selectedBrand) &&
                    (state.selectedSeries === '' || car.series === state.selectedSeries)
                ) {
                    priceRangeSet.add(formatPriceRange(car.price));
                }
            }
            return [''].concat(Array.from(priceRangeSet));
        });

        const filteredCars = computed(() => {
            // 根据筛选条件过滤车辆
            return state.cars.filter(car => {
                const brandMatched =
                    state.selectedBrand === '' || car.brand === state.selectedBrand;
                const seriesMatched =
                    state.selectedSeries === '' || car.series === state.selectedSeries;
                const priceMatched =
                    state.selectedPrice === '' ||
                    formatPriceRange(car.price) === state.selectedPrice;
                return brandMatched && seriesMatched && priceMatched;
            });
        });

        function selectBrand(brand) {
            state.selectedBrand = brand;
            state.selectedSeries = ''; // 重置车系选择
            state.selectedPrice = ''; // 重置价格选择
        }

        function selectSeries(series) {
            state.selectedSeries = series;
            state.selectedPrice = ''; // 重置价格选择
        }

        function selectPrice(priceRange) {
            state.selectedPrice = priceRange;
        }

        function formatPriceRange(price) {
            // 格式化价格范围的函数
            // 在这里编写你的代码，根据价格值返回对应的价格范围字符串
        }

        return {
            brands,
            seriesList,
            priceRanges,
            filteredCars,
            selectBrand,
            selectSeries,
            selectPrice,
        };
    },
};
</script>
<style>
.car-buying-page {
    max-width: 800px;
    margin-left: 10%;
    margin-right: 50%;
    padding: 5px;
}

.filters {
    margin-bottom: 20px;
}

.filters button {
    margin-right: 10px;
    padding: 5px 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #fff;
    cursor: pointer;
}

.filters button.active {
    background-color: #ccc;
}

.car-list {
    list-style: none;
    padding: 0;
}

.car-item {
    margin-bottom: 20px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

.car-info {
    display: flex;
}

.car-image {
    margin-right: 10px;
}

.car-details {
    flex-grow: 1;
}

.car-details h2 {
    margin: 0;
}

</style>
