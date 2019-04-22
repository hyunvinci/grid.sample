// 定義拖拉元件排版
var dashboard = [
	    {"x":0,"y":0,"w":4,"h":5,"i":"0","type":"Country", "chartTypes": [
			 'line-chart',
			 'pie-chart',
			 'bar-chart'
		 ]},
	    {"x":4,"y":0,"w":4,"h":5,"i":"1","type":"Missing", "chartTypes": [
			 'pie-chart',
			 'line-chart',
			 'bar-chart'
		 ]},
	    {"x":8,"y":0,"w":4,"h":5,"i":"2","type":"Completeness", "chartTypes": [
			 'bar-chart',
			 'pie-chart',
			 'radar-chart'
		 ]},
	    {"x":0,"y":0,"w":4,"h":5,"i":"3","type":"Coverage & Status", "chartTypes": [
			 'radar-chart',
			 'pie-chart',
			 'bar-chart'
		 ]},
	    {"x":4,"y":0,"w":4,"h":5,"i":"4","type":"Owner / Inventor", "chartTypes": [
			 'pie-chart',
			 'line-chart',
			 'bar-chart'
		 ]},
	    {"x":8,"y":0,"w":4,"h":5,"i":"5","type":"Quality & Value", "chartTypes": [
			 'bar-chart',
			 'pie-chart',
			 'line-chart'
		 ]}
	];

// 定義標題所對應的圖表類型
var typeGraphMap = {
				'Country': 'line-chart',
				'Missing': 'pie-chart',
				'Completeness': 'bar-chart',
				'Coverage & Status': 'radar-chart',
				'Owner / Inventor': 'pie-chart',
				'Quality & Value': 'bar-chart'
			}


// vue-grid component 引入
var GridLayout = VueGridLayout.GridLayout;
var GridItem = VueGridLayout.GridItem;

// chart wrapper 讓chart參照大小響應
Vue.component('report-item', {
	template: '#report-item',
	props: ['type', 'idx'],
	data () {
		return {
			typeGraphMap
		}
	},
	methods: {
		openModel () {
			vm.modelOpen = true
			vm.modelType = this.type
			vm.clickReportItem = dashboard[this.idx]
			vm.modelChartList = dashboard[this.idx].chartTypes
			vm.chartTempList = vm.modelChartList
		}
	},
	computed: {
		graphType () {
			return dashboard[this.idx].chartTypes[0]
		}
	}
})

Vue.component('line-chart', {
	template: '#line',
	props: ['type'],
	mounted () {
		let canvas = document.getElementById('lineChart' + this.type)
		let ctx = canvas.getContext('2d')
		
		let lineChart = new Chart(ctx, {
			type: 'line',
			data: {
				datasets: [{
					data: [{
						  x: 10,
						  y: 20
					 }, {
						  x: 15,
						  y: 10
					 }]
				}]
			},
			options: {
				responsive: true,
    			maintainAspectRatio: false
			}
		})
	}
})

Vue.component('pie-chart', {
	template: '#pie',
	props: ['type'],
	mounted () {
		let canvas = document.getElementById('pieChart' + this.type)
		let ctx = canvas.getContext('2d')
		
		let lineChart = new Chart(ctx, {
			type: 'doughnut',
			data: {
				datasets: [{
					data: [10, 15, 20]
				}],
				labels: ['One', 'Two', 'Three']
			},
			options: {
				responsive: true,
    			maintainAspectRatio: false
			}
		})
	}
})

Vue.component('bar-chart', {
	template: '#bar',
	props: ['type'],
	mounted () {
		let canvas = document.getElementById('barChart' + this.type)
		let ctx = canvas.getContext('2d')
		
		let lineChart = new Chart(ctx, {
			type: 'bar',
			data: {
				datasets: [{
					data: [10, 15, 20]
				}],
				labels: ['One', 'Two', 'Three']
			},
			options: {
				responsive: true,
    			maintainAspectRatio: false,
				scales: {
					  yAxes: [{
							ticks: {
								 beginAtZero: true
							}
					  }]
				 }
			}
		})
	}
})

Vue.component('radar-chart', {
	template: '#radar',
	props: ['type'],
	mounted () {
		let canvas = document.getElementById('radarChart' + this.type)
		let ctx = canvas.getContext('2d')
		
		let lineChart = new Chart(ctx, {
			type: 'radar',
			data: {
				datasets: [{
					data: [10, 15, 20]
				}],
				labels: ['One', 'Two', 'Three']
			},
			options: {
				responsive: true,
    			maintainAspectRatio: false
			}
		})
	}
})

Vue.component('select-bar', {
	template: '#select',
	props: ['items'],
	data () {
		return {
			nowSelect: this.items[0],
			listOpen: false
		}
	},
	methods: {
		onClick () {
			this.listOpen = !this.listOpen
		},
		selectItem (item) {
			this.nowSelect = item
		}
	}
})

Vue.component('ip-info', {
	template: '#ip-info',
	data () {
		return {
			ip: {
			  ipNumber: 'CN102165437A',
			  legalStatus: '申請已公開',
			  ipName: '信息處理裝置及方法',
			  country: '中國',
			  assignee: '鴻海精密工業',
			  price: '5,500.00'
		 }
		}
	}
})
	
var vm = new Vue({
	el: '#app',
	components: {
		  GridLayout,
		  GridItem,
	 },
	data: {
		dashboard,
		modelOpen: false,
		modelType: '',
		modelChartList: [],
		chartTempList: [],
		dashboardIdx: null,
		modelSaveStatus: false,
		clickReportItem: {},
		dragOptions: {
			group: 'modelChart',
			animation: 100
		}
	 },
	computed: {
		modelGraphType () {
			return this.modelChartList[0]
		}
	},
	methods: {
		closeModel () {
			this.modelOpen = false
			this.modelChartList = this.chartTempList
		},
		saveModel () {
			this.modelOpen = false
			this.clickReportItem.chartTypes = this.modelChartList
		}
	}
});

var split = Split(['.dashboard', '.control-panel'], {
	sizes: [70, 30],
	minSize: [800, 300]
})