<template>
  <div class="relative" v-click-outside="() => (notification = false)">
    <button
      class="relative transition-colors duration-300 rounded-lg p-2 focus:outline-none hover:bg-gray-100 w-14 h-14 text-gray-700"
      @click="notification = !notification"
    >
      <div
        class="absolute text-xs bg-rose-500 text-white w-5 h-5 rounded-full flex justify-center items-center top-0 right-0"
        v-if="unread > 0"
      >
        {{ unread }}
      </div>
      <i class="text-2xl far fa-bell" />
    </button>

    <div
      class="absolute right-0 z-50 bg-white border rounded-lg w-72 lg:w-96 shadow-xl"
      v-if="notification"
    >
      <div class="p-3 flex justify-between items-center border-b">
        <h1 class="text-lg font-medium text-gray-700">Notifications</h1>
        <div class="flex gap-2">
          <!-- <button class="border size-9 rounded-lg" @click="refetch">
            <i class="fa-solid fa-rotate text-sm"></i>
          </button> -->
          <button
            class="underline text-sky-600"
            @click="markAllRead"
            v-if="items.length > 0"
          >
            Mark all read
          </button>
        </div>
      </div>
      <ul class="flex h-auto flex-col overflow-y-auto max-h-[440px]">
        <li v-for="(notification, key) in items" :key="key">
          <hr />
          <button
            class="w-full flex flex-col border-stroke px-4 p-2 hover:bg-gray-200 text-gray-700"
            :class="notification.mark ? 'bg-white' : 'bg-gray-100'"
            @click="markNotification(notification)"
          >
            <p class="font-bold">
              <span v-html="notificationIcon(notification.title)"></span>
              {{ notification.title }}
            </p>
            <p class="text-left">{{ notification.body }}</p>
            <p class="text-xs self-end">
              {{ notification.created_at | agoDate }}
            </p>
          </button>
        </li>
        <li v-if="items.length === 0">
          <hr />
          <div
            class="my-10 flex flex-col items-center text-gray-700"
            v-if="activeSubscription"
          >
            <p
              class="text-6xl text-center bg-gray-100 h-40 w-40 rounded-full flex justify-center items-center"
            >
              <i class="far fa-bell-slash" />
            </p>
            <p class="mt-3">There are no notifications</p>
          </div>

          <div class="my-10 flex flex-col items-center text-gray-700" v-else>
            <Upgrade>
              <p
                class="text-6xl text-center bg-gray-100 h-40 w-40 rounded-full flex justify-center items-center"
              >
                <i class="fas fa-lock" />
              </p>
            </Upgrade>
            <Upgrade class="mt-2"> Upgrade your account</Upgrade>
          </div>
        </li>
        <Observer @load="fetchItems">_</Observer>
      </ul>
    </div>

    <RealtimeNotification @refetch="newNotification" />
  </div>
</template>
<script>
import vClickOutside from "v-click-outside";
import { mapGetters } from "vuex";
export default {
  name: "TopBarNotification",
  directives: { clickOutside: vClickOutside.directive },
  data() {
    return {
      notification: false,
      loading: false,
      click: true,
      unread: 0,
      perPage: 10,
      items: [],
    };
  },
  computed: {
    ...mapGetters(["manager", "activeSubscription"]),
  },
  mounted() {
    this.fetchItems();
  },
  methods: {
    async fetchItems() {
      if (this.click && this.activeSubscription) {
        try {
          this.click = false;
          this.loading = true;
          const params = {
            perPage: this.perPage,
            page: this.items.length / this.perPage + 1,
          };
          if (Number.isInteger(params.page)) {
            const { notification, unread } =
              await this.$managerApi.fetchNotification(params);
            this.unread = unread;
            this.items = this.items.concat(notification);
          }
        } catch (error) {
        } finally {
          this.loading = false;
          this.click = true;
        }
      }
    },
    async markNotification(notification) {
      try {
        if (notification.mark === false) {
          await this.$managerApi.toggleNotification({
            notificationID: notification._id,
          });

          const index = this.items.findIndex(
            ({ _id }) => notification._id === _id
          );
          if (index !== -1) {
            this.items[index].mark = true;
            --this.unread;
          }
        }
        if (
          notification.type === "requestBill" ||
          notification.type === "updateOrder" ||
          notification.type === "cancelOrderRequest" ||
          notification.type === "newOrder"
        ) {
          this.$router.push({
            name: "dashboard-order",
            params: { order_id: notification.additional.orderID },
          });
          this.notification = false;
          setTimeout(
            () => {
              this.$nuxt.$emit(
                "openOrderDetails",
                notification.additional.orderID
              );
            },
            this.$route.name === "dashboard-order" ? 0 : 1000
          );
        }
      } catch (error) {}
    },
    async markAllRead() {
      try {
        await this.$managerApi.markAllNotification();
        this.items = this.items.map((data) => ({ ...data, mark: true }));
        this.unread = 0;
      } catch (error) {}
    },
    async newNotification(notification) {
      try {
        if (notification) {
          this.items = [notification, ...this.items];
          ++this.unread;
        }
      } catch (error) {}
    },
    notificationIcon(title) {
      if (title == "Order Cancel Request") {
        return `<i class="fas fa-xmark text-rose-600"></i>`;
      } else if (title == "Requesting Bill" || title == "Requesting bill") {
        return `<i class="fas fa-file-invoice text-purple-600"></i>`;
      } else if (title == "New Order") {
        return `<i class="far fa-calendar-plus text-green-600"></i>`;
      } else if (title == "Order updated") {
        return `<i class="fas fa-file-invoice-dollar text-amber-600"></i>`;
      }
    },
    async refetch() {
      this.items = [];
      await this.fetchItems();
    },
  },
};
</script>
