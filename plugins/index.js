import Vue from "vue";
import moment from "moment";
import SlideUpDown from "vue-slide-up-down";
import VueHtmlToPaper from "vue-html-to-paper";

Vue.component("slide-up-down", SlideUpDown);
Vue.use(VueHtmlToPaper);
export default ({ app }, inject) => {
  inject("moment", moment);
};
