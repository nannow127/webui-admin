<template>
  <div class="home mg-top_20">
    <el-input v-model="value"></el-input>
  </div>
</template>

<script>
// @ is an alias to /src

import { mapActions } from 'vuex'
export default {
  name: 'Home',
  data() {
    return{
      value:'Cindy'
    }
  },
  created() {
  this.getFundpurchaselist()
  },
  methods:{
    ...mapActions('text', ['tradeRank']),
    
		async getFundpurchaselist(type,keyword) {
			const res = await this.tradeRank({
				type:0,  //0-买入榜;1-卖出榜;2-持仓榜
        page_number: 1,
        page_size: '50'
      })
      console.log('res',res)
		},

  },
  components: {
  }
}
</script>
