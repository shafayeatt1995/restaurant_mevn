<template>
  <header class="flex items-center justify-between h-20 px-6 bg-white border-b">
    <div class="relative flex flex-col items-start">
      <template v-if="owner">
        <p class="text-gray-600">
          Scan:
          <span :class="activeScan ? '' : 'text-rose-500'">{{
            activeScan ? showScanDate : "Expired"
          }}</span>
        </p>
        <p class="text-gray-600">
          Analysis:
          <span :class="activeAnalytic ? '' : 'text-rose-500'">{{
            activeAnalytic ? showAnalyticDate : "Expired"
          }}</span>
        </p>
      </template>
    </div>

    <div class="flex items-center">
      <div class="relative">
        <button
          class="transition-colors duration-300 rounded-lg sm:px-4 sm:py-2 focus:outline-none hover:bg-gray-100"
          @click="dropdownOpen = !dropdownOpen"
        >
          <span class="sr-only">User Menu</span>
          <div class="flex items-center md:-mx-2">
            <div
              class="hidden md:mx-2 md:flex md:flex-col md:items-end md:leading-tight"
            >
              <span v-if="owner" class="font-semibold text-sm text-gray-600">{{
                $auth.user.restaurant.name
              }}</span>
              <span v-else class="font-semibold text-sm text-gray-600">{{
                $auth.user.name
              }}</span>
              <span class="capitalize text-sm text-gray-600">{{
                $auth.user.type
              }}</span>
            </div>

            <img
              class="flex-shrink-0 w-10 h-10 overflow-hidden bg-gray-100 rounded-full md:mx-2"
              :src="owner ? $auth.user.restaurant.logo : $auth.user.avatar"
              alt="user profile image"
            />
          </div>
        </button>

        <transition
          enter-active-class="transition duration-200 ease-out"
          enter-from-class="transform scale-95 opacity-0"
          enter-to-class="transform scale-100 opacity-100"
          leave-active-class="transition duration-75 ease-in"
          leave-from-class="transform scale-100 opacity-100"
          leave-to-class="transform scale-95 opacity-0"
        >
          <div
            class="absolute right-0 z-50 w-56 p-2 bg-white border rounded-lg top-16 lg:top-20"
            v-show="dropdownOpen"
          >
            <div
              class="px-4 py-2 text-gray-600 transition-colors duration-300 rounded-lg cursor-pointer hover:bg-gray-100"
            >
              Profile
            </div>
            <div
              class="px-4 py-2 text-gray-600 transition-colors duration-300 rounded-lg cursor-pointer hover:bg-gray-100"
            >
              Messages
            </div>
            <div
              class="px-4 py-2 text-gray-600 transition-colors duration-300 rounded-lg cursor-pointer hover:bg-gray-100"
            >
              To-Do's
            </div>
          </div>
        </transition>
      </div>

      <div
        v-show="dropdownOpen"
        class="fixed inset-0 z-30"
        @click="dropdownOpen = false"
      ></div>

      <button
        class="relative p-2 mx-3 text-gray-400 transition-colors duration-300 rounded-full hover:bg-gray-100 hover:text-gray-600 focus:bg-gray-100"
      >
        <span class="sr-only">Notifications</span>
        <span
          class="absolute top-0 right-0 w-2 h-2 mt-1 mr-2 bg-green-500 rounded-full"
        ></span>
        <span
          class="absolute top-0 right-0 w-2 h-2 mt-1 mr-2 bg-green-500 rounded-full animate-ping"
        ></span>
        <font-awesome-icon :icon="['far', 'bell']" class="text-xl" />
      </button>

      <button
        class="p-2 text-gray-400 transition-colors duration-300 rounded-full focus:outline-none hover:bg-gray-100 hover:text-gray-600 focus:bg-gray-100"
        @click="$auth.logout('laravelJWT')"
      >
        <span class="sr-only">Log out</span>
        <font-awesome-icon
          :icon="['fas', 'arrow-right-from-bracket']"
          class="text-xl"
        />
      </button>
    </div>
  </header>
</template>
<script>
import moment from "moment";
import { mapGetters } from "vuex";
export default {
  name: "Topbar",
  data() {
    return {
      dropdownOpen: false,
      currentDate: new Date(),
      timerInterval: null,
    };
  },
  computed: {
    ...mapGetters([
      "owner",
      "scanDate",
      "activeScan",
      "activeAnalytic",
      "analyticDate",
    ]),

    showScanDate() {
      if (this.activeScan) {
        const timeDifference = this.scanDate - this.currentDate;
        const seconds = Math.floor(timeDifference / 1000);

        const days = Math.floor(seconds / 86400);
        const hours = Math.floor((seconds % 86400) / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const remainingSeconds = seconds % 60;

        return `${days}:${this.formatTime(hours)}:${this.formatTime(
          minutes
        )}:${this.formatTime(remainingSeconds)}`;
      } else {
        return "Expired";
      }
    },

    showAnalyticDate() {
      if (this.activeAnalytic) {
        const timeDifference = this.analyticDate - this.currentDate;
        const seconds = Math.floor(timeDifference / 1000);

        const days = Math.floor(seconds / 86400);
        const hours = Math.floor((seconds % 86400) / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const remainingSeconds = seconds % 60;

        return `${days}:${this.formatTime(hours)}:${this.formatTime(
          minutes
        )}:${this.formatTime(remainingSeconds)}`;
      } else {
        return "Expired";
      }
    },
  },
  mounted() {
    this.startTimer();
  },
  beforeDestroy() {
    this.stopTimer();
  },
  methods: {
    formatTime(time) {
      return time < 10 ? `0${time}` : time;
    },
    updateCurrentDate() {
      this.currentDate = new Date();
    },
    startTimer() {
      this.timerInterval = setInterval(() => {
        this.updateCurrentDate();
      }, 1000);
    },
    stopTimer() {
      clearInterval(this.timerInterval);
    },
  },
};
</script>
