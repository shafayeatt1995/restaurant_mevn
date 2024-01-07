import Vue from "vue";
import moment from "moment";

// Date Format
Vue.filter("date", (value) => {
  return moment(value).startOf("hour").fromNow();
});

Vue.filter("normalDate", (value) => {
  return moment(value).format("ll");
});

Vue.filter("normalDate2", (value) => {
  return moment(value).format("DD/MM/YYYY h:mm a");
});

Vue.filter("fullDate", (value) => {
  return moment(value).format("LLLL");
});

Vue.filter("agoDate", (value) => {
  return moment(value).fromNow();
});

Vue.filter("year", (value) => {
  return moment(value).format("YYYY");
});

// Number Format
Vue.filter("number", (value) => {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
});
