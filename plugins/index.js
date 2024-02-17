import Vue from "vue";
import moment from "moment";
import timezone from "moment-timezone";

export default ({ app }, inject) => {
  inject("moment", moment);
  inject("timezone", timezone);
};
