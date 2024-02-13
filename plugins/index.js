import Vue from "vue";
import moment from "moment";

export default ({ app }, inject) => {
  inject("moment", moment);
};
