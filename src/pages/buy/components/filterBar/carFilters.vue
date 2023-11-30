<template>
    <div>
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
    </div>
</template>

<script>
import { computed } from 'vue';

export default {
    name: 'CarFilters',
    props: {
        selectedBrand: String,
        selectedSeries: String,
        selectedPrice: String,
        brands: Array,
        seriesList: Array,
        priceRanges: Array,
        selectBrand: Function,
        selectSeries: Function,
        selectPrice: Function,
    },
};
</script>
