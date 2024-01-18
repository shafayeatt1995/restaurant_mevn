import Vue from "vue";
import moment from "moment";
import SlideUpDown from "vue-slide-up-down";

Vue.component("slide-up-down", SlideUpDown);

export default ({ app }, inject) => {
  inject("moment", moment);
};
