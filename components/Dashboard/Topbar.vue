<template>
  <header class="flex items-center justify-between h-20 px-6 bg-white border-b">
    <div class="relative flex items-center">
      <span class="absolute inset-y-0 left-0 flex items-center pl-3">
        <font-awesome-icon
          :icon="['fas', 'magnifying-glass']"
          class="w-5 h-5 text-gray-400"
        />
      </span>

      <input
        type="text"
        class="py-2.5 pl-10 pr-4 text-gray-700 placeholder-gray-400 bg-white border border-transparent border-gray-200 rounded-lg sm:w-auto w-36 focus:border-green-400 focus:outline-none focus:ring focus:ring-green-300 focus:ring-opacity-40"
        placeholder="Search"
      />
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
              <span class="font-semibold text-sm text-gray-800">{{
                $auth.user.name
              }}</span>
              <span class="capitalize text-sm text-gray-600">{{
                $auth.user.type
              }}</span>
            </div>

            <img
              class="flex-shrink-0 w-10 h-10 overflow-hidden bg-gray-100 rounded-full md:mx-2"
              :src="$auth.user.avatar"
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
              class="px-4 py-2 text-gray-800 transition-colors duration-300 rounded-lg cursor-pointer hover:bg-gray-100"
            >
              Profile
            </div>
            <div
              class="px-4 py-2 text-gray-800 transition-colors duration-300 rounded-lg cursor-pointer hover:bg-gray-100"
            >
              Messages
            </div>
            <div
              class="px-4 py-2 text-gray-800 transition-colors duration-300 rounded-lg cursor-pointer hover:bg-gray-100"
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
export default {
  name: "Topbar",
  data() {
    return {
      dropdownOpen: false,
    };
  },
};
</script>
