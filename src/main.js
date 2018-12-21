import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import datePicker from 'vue-bootstrap-datetimepicker';
import JQuery from 'jquery'

Vue.use(BootstrapVue);
Vue.use(datePicker);

Vue.config.productionTip = false

let $ = JQuery

$.extend(true, $.fn.datetimepicker.defaults, {
    icons: {
        time: 'far fa-clock',
        date: 'far fa-calendar',
        up: 'fas fa-arrow-up',
        down: 'fas fa-arrow-down',
        previous: 'fas fa-chevron-left',
        next: 'fas fa-chevron-right',
        today: 'fas fa-calendar-check',
        clear: 'far fa-trash-alt',
        close: 'far fa-times-circle'
    }
});

new Vue({
  render: h => h(App),
}).$mount('#app')
