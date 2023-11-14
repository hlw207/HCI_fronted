<template>
  <div class="instructionContainer">
    <div class="instructionTitle">
      <el-text style="color: #eda01f;font-size: 30px;" tag="b">交易流程</el-text>
    </div>
    <div class="instructionDetail">
      <div style="position: relative; top: 35%">
        <el-result
            icon="info"
            title="预约卖车"
            sub-title="一键预约，免费服务"
        >
        </el-result>
      </div>
      <el-icon size="30px" style="position: relative;top: 25%;color: #eda01f;margin: 30px">
        <TopRight />
      </el-icon>
      <div style="position: relative; top: -5%">
        <el-result
            icon="warning"
            title="坐等上门评估"
            sub-title="上门检测，提供建议价"
        >
        </el-result>
      </div>
      <el-icon size="30px" style="position: relative;top: 25%;color: #eda01f;margin: 30px">
        <BottomRight />
      </el-icon>
      <div style="position: relative; top: 35%">
        <el-result
            icon="error"
            title="买家上门看车"
            sub-title="专属顾问，买车省心"
        >
        </el-result>
      </div>
      <el-icon size="30px" style="position: relative;top: 25%;color: #eda01f;margin: 30px">
        <TopRight />
      </el-icon>
      <div style="position: relative; top: -5%">
        <el-result
            icon="success"
            title="交易过户"
            sub-title="管家式过户协办，专业高效"
        >
        </el-result>
      </div>
    </div>

  </div>
</template>

<script>
import {BottomRight, Edit, Picture, TopRight, Upload} from "@element-plus/icons-vue";

export default {
  name: "index",
  components: {BottomRight, TopRight},
  computed: {
    Picture() {
      return Picture
    },
    Upload() {
      return Upload
    },
    Edit() {
      return Edit
    }
  }
}
</script>

<style scoped>
.instructionContainer{
  width: 100%;
  height: 300px;
  margin-top: 30px;
  margin-bottom: 30px;
  background-color: #fff;
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
}

.instructionTitle{
  width: 20%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.instructionDetail{
  width:80%;
  height: 100%;
  display: flex;
  flex-direction: row;
}

</style>
