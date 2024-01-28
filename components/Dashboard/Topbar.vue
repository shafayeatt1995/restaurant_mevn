<template>
  <header
    class="flex items-center justify-between h-20 px-6 bg-white sticky top-0 z-10"
  >
    <div class="relative flex flex-col items-start">
      <template v-if="manager">
        <p class="text-gray-600">
          Subscription Exp:
          <span
            :class="activeScan ? '' : 'text-rose-500'"
            class="font-semibold"
            >{{ activeScan ? showScanDate : "Expired" }}</span
          >
        </p>
      </template>
    </div>

    <div class="flex items-center">
      <div class="relative">
        <button
          class="transition-colors duration-300 rounded-lg p-2 focus:outline-none hover:bg-gray-100"
          @click="dropdownOpen = !dropdownOpen"
        ></button>

        <div
          class="absolute right-0 z-50 w-56 p-2 bg-white border rounded-lg top-16 lg:top-20"
          v-if="dropdownOpen"
          v-click-outside="() => (dropdownOpen = false)"
        >
          <div
            class="px-4 py-2 text-gray-600 transition-colors duration-300 rounded-lg cursor-pointer hover:bg-gray-100"
          >
            <nuxt-link :to="{ name: 'dashboard-settings' }">
              <font-awesome-icon :icon="['fas', 'gear']" class="text-xl" />
              <span class="mx-4 font-medium">Logout</span>
            </nuxt-link>
          </div>
          <div
            class="px-4 py-2 text-rose-500 transition-colors duration-300 rounded-lg cursor-pointer hover:bg-gray-100 flex items-center"
            @click="logOut()"
          >
            <font-awesome-icon
              :icon="['fas', 'arrow-right-from-bracket']"
              class="text-xl"
            />
            <span class="mx-4 font-medium">Logout</span>
          </div>
        </div>
      </div>
      <div class="relative">
        <button
          class="transition-colors duration-300 rounded-lg p-2 focus:outline-none hover:bg-gray-100"
          @click="dropdownOpen = !dropdownOpen"
        >
          <span class="sr-only">User Menu</span>
          <div class="flex items-center md:-mx-2">
            <div
              class="hidden md:mx-2 md:flex md:flex-col md:items-end md:leading-tight"
            >
              <span
                v-if="manager"
                class="font-semibold text-sm text-gray-600"
                >{{ $auth.user.restaurant.name }}</span
              >
              <span v-else class="font-semibold text-sm text-gray-600">{{
                $auth.user.name
              }}</span>
              <span class="capitalize text-sm text-gray-600">{{
                $auth.user.type
              }}</span>
            </div>

            <img
              loading="lazy"
              class="flex-shrink-0 w-10 h-10 overflow-hidden bg-gray-100 rounded-full md:mx-2"
              :src="manager ? $auth.user.restaurant.logo : $auth.user.avatar"
              alt="user profile image"
            />
          </div>
        </button>

        <div
          class="absolute right-0 z-50 w-56 p-2 bg-white border rounded-lg top-16 lg:top-20"
          v-if="dropdownOpen"
          v-click-outside="() => (dropdownOpen = false)"
        >
          <div
            class="px-4 py-2 text-gray-600 transition-colors duration-300 rounded-lg cursor-pointer hover:bg-gray-100"
          >
            <nuxt-link :to="{ name: 'dashboard-settings' }">
              <font-awesome-icon :icon="['fas', 'gear']" class="text-xl" />
              <span class="mx-4 font-medium">Logout</span>
            </nuxt-link>
          </div>
          <div
            class="px-4 py-2 text-rose-500 transition-colors duration-300 rounded-lg cursor-pointer hover:bg-gray-100 flex items-center"
            @click="logOut()"
          >
            <font-awesome-icon
              :icon="['fas', 'arrow-right-from-bracket']"
              class="text-xl"
            />
            <span class="mx-4 font-medium">Logout</span>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>
<script>
import vClickOutside from "v-click-outside";
import { mapGetters } from "vuex";
export default {
  name: "TopBar",
  directives: { clickOutside: vClickOutside.directive },
  data() {
    return {
      dropdownOpen: false,
      currentDate: new Date(),
      timerInterval: null,
    };
  },
  computed: {
    ...mapGetters([
      "manager",
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
  watch: {
    $route(val) {
      this.dropdownOpen = false;
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
    async logOut() {
      try {
        await this.$auth.logout("laravelJWT");
        this.$router.push({ name: "auth-login" });
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>
