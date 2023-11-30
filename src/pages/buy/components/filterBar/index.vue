<template>
    <div class="car-buying-page">
        <h1>我要买车</h1>

        <el-container>
            <div class="filter-container">
                <div class="filter-card">
                    <car-filters
                        :selectedBrand="selectedBrand"
                        :selectedSeries="selectedSeries"
                        :selectedPrice="selectedPrice"
                        :brands="brands"
                        :seriesList="seriesList"
                        :priceRanges="priceRanges"
                        :selectBrand="selectBrand"
                        :selectSeries="selectSeries"
                        :selectPrice="selectPrice"
                    ></car-filters>
                </div>
            </div>
        </el-container>

        <el-container>
            <div class="car-container" @click="router.push('/detail')">
                <el-row :span="4" v-for="(group, index) in groupedCars" :key="index">
                    <el-card v-for="car in group" :key="car.id" class="car-item">
                        <div class="car-info">
                            <div class="car-image">
                                <div class="car_picture">
                                    <img :src="car.image" alt="Car Image" class="car_picture_main">
                                </div>
                            </div>
                            <div class="car-details">
                                <h2>{{ car.brand }} - {{ car.series }}</h2>
                                <div style="margin: 15px 0 0 0">
                                    <span style="color: #fa5c3d;font-size: 20px">{{ car.price }} 元 </span>
                                    <span style="font-size: 16px;"> 首付：{{car.price / 2}} 元</span>
                                </div>
                                <div style="display: flex; align-items: center;">
                                    <p style="margin-right: 150px;">{{ car.color }}</p>
                                    <el-icon @click.stop="toggleShow(car)" style="font-size: 25px;">
                                        <Star :style="{ color: isCarShining(car) ? '#fa5c3d' : '#9ba3af'}" />
                                    </el-icon>
                                </div>
                                <div style="color: #9ba3af;font-size: 15px">
                                    {{car.time}} / {{car.mileage}}万公里 / {{car.source}}
                                </div>
                            </div>
                        </div>
                    </el-card>
                </el-row>
            </div>
        </el-container>

        <buy-bottom-bar/>


    </div>
</template>

<script>
import { computed, reactive } from 'vue';
import carData from './carData';
import CarFilters from './carFilters.vue';
import BuyBottomBar from "~/pages/buy/components/bottomBar/buyBottomBar.vue";
import {useRouter} from "vue-router";

export default {
    name: 'CarBuyingPage',
    components: {
        BuyBottomBar,
        CarFilters,
    },
    methods: {
        toggleShow(car) {
            car.shine = !car.shine;
        },
        isCarShining(car) {
            return car.shine;
        },
    },
    setup() {
        const router = useRouter()

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
            router,
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

.filter-container {
    width: 100%;
    height: 180px;
    background-image: url('/pictures/home/searchBarBackground.png');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
    overflow: clip;
    border-radius: 10px;

}

.filter-card {
    margin-top: 20px;
    margin-bottom: 20px;
    margin-left: 10px;
    margin-right: 10px;
}


.filters {
    margin-bottom: 20px;

}

.filled {
    color: #fa5c3d;
}

.filters .active {
    background-color: #ff5040;
    color: #fff;
}

.car-container {
    width: 100%;
    margin-top: 20px;
}

.car-item {
    width: 23%;
    margin-bottom: 20px;
    margin-left: 5px;
    margin-right: 5px;
    padding: 2px;
    border: 1px solid #ff7940;
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

.car_picture{
    overflow: hidden;
    width: 100%;
}

.car_picture_main{
    width: 100%;
    transition: all 0.5s;
}

.car_picture_main:hover{
    transform: scale(110%);
    transition: all 0.5s;
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
