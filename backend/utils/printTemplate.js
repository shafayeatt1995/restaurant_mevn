const print = `<div style="font-size: 12px" ref="itemList">
<table style="width: 100%">
  <tbody style="font-size: 12px">
    <tr>
      <td>
        <div>
          <b>Date:</b>
          {{ $moment().format("DD/MM/YYYY - HH:MMa") }}
        </div>
      </td>
    </tr>
    <tr>
      <td>
        <div><b>Table: </b> {{ orderDetails?.tableName }}</div>
      </td>
    </tr>
    <tr>
      <td>
        <div><b>Waiter: </b> {{ orderDetails?.waiterName }}</div>
      </td>
    </tr>
  </tbody>
</table>
<div style="margin-top: 5px"></div>
<table style="width: 100%; border-collapse: collapse; text-align: center; border: 1px solid #000">
  <tbody style="font-size: 12px">
    <tr style="font-weight: 600; border-bottom: 1px solid #000">
      <td style="width: calc(100% - 30px); border-right: 1px solid #000">
        Name
      </td>
      <td style="width: 25px; border-right: 1px solid #000; padding: 0 5px">
        Qty
      </td>
    </tr>
    <tr
      :style="border-bottom: 1px {
        key + 1 === orderDetails?.orderItems?.length ? 'solid' : 'dashed'
      } #000"
      v-for="(item, key) in orderDetails?.orderItems"
      :key="key"
    >
      <td style="width: calc(100% - 30px); border-right: 1px solid #000; text-align: left">
        <div style="font-size: 20px; font-weight: 700;">
          {{ item.name }}
        </div>
        <div v-for="(choice, index) in item.choice" :key="choice-{index}" style="font-size: 16px;">
          <p style="margin: 0;">+ {{ choice.name }}</p>
        </div>
        <div v-for="(addon, index) in item.addon" :key="addon-{index}">
          <p style="margin: 0;">+ {{ addon.name }}</p>
        </div>
      </td>
      <td style="width: 25px; border-right: 1px solid #000; padding: 0 2px">
        <div style="font-size: 20px">x{{ item.qty }}</div>
      </td>
    </tr>
  </tbody>
</table>
</div>`

module.exports = {print};