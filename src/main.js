import Vue from "vue";
import App from "./App";
// import { fetchListData } from './api/api'
import ProgressBar from "./components/ProgressBar";

Vue.config.productionTip = false;

const bar = new Vue(ProgressBar).$mount(); // Creates a mounted ProgressBar instance
Vue.prototype.$bar = bar; // Adds the mounted progress bar to the base Vue constructor prototype, which will be available to child component instances
document.body.appendChild(bar.$el); // Adds the ProgressBar root element to the Document <body>

// Creates a new Vue instance using #app as the root element
new Vue({
  el: "#app",
  render: h => h(App)
});
// fetchListData('top')
//   .then((items) => {
//     window.items = items
//     new Vue({
//       el: '#app',
//       render: h => h(App)
//     })
//   })
