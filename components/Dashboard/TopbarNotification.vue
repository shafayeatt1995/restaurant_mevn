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
      <font-awesome-icon :icon="['far', 'bell']" class="text-2xl" />
    </button>

    <div
      class="absolute right-0 z-50 bg-white border rounded-lg w-72 lg:w-96 shadow-xl"
      v-if="notification"
    >
      <div class="p-3 flex justify-between">
        <h3 class="text-lg font-medium text-gray-700">Notifications</h3>
        <button
          class="underline text-sky-600"
          @click="markAllRead"
          v-if="items.length > 0"
        >
          Mark all read
        </button>
      </div>
      <ul class="flex h-auto flex-col overflow-y-auto max-h-[440px]">
        <li v-for="(notification, key) in items" :key="key">
          <hr />
          <button
            class="w-full flex flex-col gap-2 border-stroke px-4 p-2 hover:bg-gray-200 text-gray-700"
            :class="notification.mark ? 'bg-white' : 'bg-gray-100'"
            @click="markNotification(notification)"
          >
            <p class="text-sm"></p>
            {{ notification.body }}
            <p class="text-xs text-right">
              {{ notification.created_at | agoDate }}
            </p>
          </button>
        </li>
        <li v-if="items.length === 0">
          <hr />
          <div class="my-10 flex flex-col items-center text-gray-700">
            <p
              class="text-6xl text-center bg-gray-100 h-40 w-40 rounded-full flex justify-center items-center"
            >
              <font-awesome-icon :icon="['far', 'bell-slash']" />
            </p>
            <p class="mt-3">There are no notifications</p>
          </div>
        </li>
        <Observer @load="fetchItems" />
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
    ...mapGetters(["manager", "scanDate", "activeScan"]),
  },
  mounted() {
    this.fetchItems();
  },
  methods: {
    async fetchItems() {
      if (this.click) {
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
          console.error(error);
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
          }
        }
        if (notification.type === "requestBill") {
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
      } catch (error) {
        console.error(error);
      }
    },
    async markAllRead() {
      try {
        await this.$managerApi.markAllNotification();
        this.items = this.items.map((data) => ({ ...data, mark: true }));
        this.unread = 0;
        this.$nuxt.$emit("success", "All notification mark as read");
      } catch (error) {
        console.error(error);
      }
    },
    async newNotification(notification) {
      try {
        if (notification) {
          this.items = [notification, ...this.items];
          ++this.unread;
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>
