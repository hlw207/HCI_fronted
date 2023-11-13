<template>
    <div class="car-buying-page">
        <h1>我要买车</h1>

        <el-row class="filters">
            <el-button
                :class="{ active: selectedBrand === '' }"
                @click="selectBrand('')"
            >
                全部品牌
            </el-button>
            <el-button
                v-for="brand in brands"
                :key="brand"
                :class="{ active: selectedBrand === brand }"
                @click="selectBrand(brand)"
            >
                {{ brand }}
            </el-button>
        </el-row>

        <el-row class="filters">
            <el-button
                :class="{ active: selectedSeries === '' }"
                @click="selectSeries('')"
            >
                全部车系
            </el-button>
            <el-button
                v-for="series in seriesList"
                :key="series"
                :class="{ active: selectedSeries === series }"
                @click="selectSeries(series)"
            >
                {{ series }}
            </el-button>
        </el-row>

        <el-row class="filters">
            <el-button
                :class="{ active: selectedPrice === '' }"
                @click="selectPrice('')"
            >
                全部价格
            </el-button>
            <el-button
                v-for="priceRange in priceRanges"
                :key="priceRange"
                :class="{ active: selectedPrice === priceRange }"
                @click="selectPrice(priceRange)"
            >
                {{ priceRange }}
            </el-button>
        </el-row>

        <el-row :span="4" v-for="(group, index) in groupedCars" :key="index">
            <el-card v-for="car in group" :key="car.id" class="car-item">
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
            </el-card>
        </el-row>
    </div>
</template>

<script>
import { computed, reactive } from 'vue';
import carData from './carData';

export default {
    name: 'CarBuyingPage',
    components: {},
    setup() {
        const state = reactive({
            selectedBrand: '',
            selectedSeries: '',
            selectedPrice: '',
            cars: carData,
        });

        const brands = computed(() => {
            const brandSet = new Set();
            for (const car of state.cars) {
                brandSet.add(car.brand);
            }
            return Array.from(brandSet);
        });

        const seriesList = computed(() => {
            const seriesSet = new Set();
            for (const car of state.cars) {
                if (
                    state.selectedBrand === '' ||
                    car.brand === state.selectedBrand
                ) {
                    seriesSet.add(car.series);
                }
            }
            return Array.from(seriesSet);
        });

        const priceRanges = computed(() => {
            const priceRangeSet = new Set();
            for (const car of state.cars) {
                if (
                    (state.selectedBrand === '' || car.brand === state.selectedBrand) &&
                    (state.selectedSeries === '' || car.series === state.selectedSeries)
                ) {
                    priceRangeSet.add(formatPriceRange(car.price));
                }
            }
            return Array.from(priceRangeSet);
        });

        const filteredCars = computed(() => {
            return state.cars.filter((car) => {
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

        const groupedCars = computed(() => {
            const grouped = [];
            let group = [];
            for (let i = 0; i < filteredCars.value.length; i++) {
                group.push(filteredCars.value[i]);
                if ((i + 1) % 4 === 0 || i === filteredCars.value.length - 1) {
                    grouped.push(group);
                    group = [];
                }
            }
            if (group.length > 0) {
                grouped.push(group);
            }
            return grouped;
        });

        const selectBrand = (brand) => {
            state.selectedBrand = brand;
            state.selectedSeries = '';
            state.selectedPrice = '';
        };

        const selectSeries = (series) => {
            state.selectedSeries = series;
            state.selectedPrice = '';
        };

        const selectPrice = (price) => {
            state.selectedPrice = price;
        };

        const formatPriceRange = (price) => {
            if (price < 50000) {
                return '0-5万';
            } else if (price < 100000) {
                return '5-10万';
            } else if (price < 200000) {
                return '10-20万';
            } else {
                return '20万以上';
            }
        };

        return {
            brands,
            seriesList,
            priceRanges,
            groupedCars,
            selectBrand,
            selectSeries,
            selectPrice,
        };
    },
};
</script>

<style>
.car-buying-page {
    max-width: 1200px;
    margin-left: 10%;
    margin-right: 1%;
    padding: 5px;
}

.filters {
    margin-bottom: 20px;
}

.filters .active {
    background-color: #409eff;
    color: #fff;
}

.car-item {
    width: 23%;
    margin-bottom: 20px;
    margin-left: 5px;
    margin-right: 5px;
    padding: 2px;
    border: 1px solid #ccc;
    border-radius: 10px;
}

.car-info {
    display: flex;
    flex-direction: column;
}

.car-image {
    width: 100%;
    margin-right: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.car-image img {
    max-width: 100%;
    max-height: 100%;
}

.car-details {
    flex-grow: 1;
}

.car-details h2 {
    margin: 0;
}

h1 {
    font-size: 24px;
    margin-bottom: 20px;
}
</style>
