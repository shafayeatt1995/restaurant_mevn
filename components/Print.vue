<template>
  <div>
<!-- <html> -->
  <head>
    <style>
    * {
  box-sizing: border-box;
}

body,html {
  height: 100%;
  width: 100%;
  background: #EEE;
}

.pos-receipt-print {
    width: 320px;
    text-align: left;
    direction: ltr;
    font-size: 27px;
    color: #000000;
    border: 1px solid #888;
    margin: 20px auto;
    padding: 10px;
    background: #FFF;
}

.pos-receipt .pos-receipt-right-align {
    float: right;
}

.pos-receipt .pos-receipt-center-align {
    text-align: center;
}

.pos-receipt .pos-receipt-left-padding {
    padding-left: 2em;
}

.pos-receipt .pos-receipt-logo {
    width: 50%;
    display: block;
    margin: 0 auto;
}

.pos-receipt .pos-receipt-contact {
    text-align: center;
    font-size: 75%;
}

.pos-receipt .pos-receipt-order-data {
    text-align: center;
    font-size: 75%;
}

.pos-receipt .pos-receipt-amount {
    font-size: 125%;
    padding-left: 6em;
}

.pos-receipt .pos-receipt-title {
    font-weight: bold;
    font-size: 125%;
    text-align: center;
}

.pos-receipt .pos-receipt-header {
    font-size: 125%;
    text-align: center;
}

.pos-receipt .pos-order-receipt-cancel {
    color: red;
}

.pos-receipt .pos-receipt-customer-note {
    word-break: break-all;
}

.pos-payment-terminal-receipt {
    text-align: center;
    font-size: 75%;
}

.responsive-price {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
}

.responsive-price > .pos-receipt-right-align {
    margin-left: auto;
}

.pos-receipt {
}
    </style>
  </head>
  <body>
    
   <div class="pos-receipt-print">
  <div class="pos-receipt">
    <!-- LOGO SECTION START-->
    <t t-if="receipt.company.logo">
       <img class="pos-receipt-logo" src="https://bit.ly/3Jabxbe" width="300px" style="border-radius:6px;" alt="Logo">
    </t>
    <t t-if="!receipt.company.logo">
      <h2 class="pos-receipt-center-align">
        <t t-esc="receipt.company.name" />
      </h2>
    </t>
    <!-- LOGO SECTION END -->
    <!-- HEADER SECTION START-->    
    <div class="aku-pos-receipt-header" style="font-family: 'Courier New', monospace; font-size: 10px; line-height: 1.5;">
      <div class="aku-header-line">
        <span style="float: left">Kasir: Bobby Ryandra</span>
        <span style="float: right">000082</span>
      </div>
      <br />
      <div class="aku-header-line">
        <span style="float: left">Pelanggan: <t t-if="receipt.cashier" t-esc="receipt.cashier" />[field id="name"]</span>
        <span style="float: right">
          [field id="date"] [field id="time"]
          <t t-if="receipt.date.localestring">
            <t t-esc="receipt.date.localestring" />
          </t>
          <t t-else="">
            <t t-esc="receipt.date.validation_date" />
          </t>
        </span>
      </div>
      <br />
      <div class="aku-header-line">
        <span style="float: left">Returret: 14 Dage</span>
        <span style="float: right"><t t-esc="receipt.name" />Ordre 2022-220-232</span>
      </div>
      <br />   
    </div>
    <hr style="border: none; height: 1px; background: #000; background: repeating-linear-gradient(90deg,#000,#000 4px,transparent 4px,transparent 8px);"/>
    <!-- HEADER SECTION END-->
    <!-- CUSTOM HEADER CONTENT START -->
    <t t-if="receipt.header_html or receipt.header">
      <div style="font-family: 'Courier New', monospace; font-size: 12px; line-height: 1.5; text-align: center;">
        <t t-if="receipt.header_html">
          <t t-raw="receipt.header_html" />
        </t>
        <t t-if="!receipt.header_html and receipt.header">
          <div>
            Her skal være 'receipt.header' <br />
            Lorem ipsum dolor sit amet.
          </div>
        </t>
      </div>
    <hr style="border: none; height: 1px; background: #000; background: repeating-linear-gradient(90deg,#000,#000 4px,transparent 4px,transparent 8px);"/>
    </t> 
    <!-- CUSTOM HEADER CONTENT END -->

    <!-- ORDER LINES START -->

    <div class="orderlines" style="font-family: 'Courier New', monospace; font-size: 12px; line-height: 1.5;">
      <t t-name="OrderLinesReceipt" owl="1">
        <t t-foreach="receipt.orderlines" t-as="line" t-key="line.id">
          <div style="margin-bottom: 6px;">
            <t t-if="isSimple(line)">
              <div>
                <!-- JEG MANGLER AT FINDE EN MÅDE AT FÅ DEFAULT_CODE -->
                <strong>
                  <t t-esc="line.product_id.default_code" />FEND-0113910772
                </strong>
                <br />
                <span>
                  <t t-esc="line.product_name_wrapped[0]" />Fender Limited Edition American Professional II Stratocaster® HSS, Rosewood Neck, Sonic Blue
                </span>
                <br>
                <div style="font-weight:800;">
                  <!-- <span style="float: left">1 x 13.800,00</span> -->
                  <span style="float: right">
                    <t t-esc="env.pos.format_currency_no_symbol(line.price_display)" />13.800,00
                  </span>
                  <div style="clear: both;"></div>
                </div>
                <WrappedProductNameLines line="line" />
              </div>
            </t>
            <t t-else="">
              <div>
                <!-- JEG MANGLER AT FINDE EN MÅDE AT FÅ DEFAULT_CODE -->
                <strong>
                  <t t-esc="line.product_id.default_code" />FEND-0113910772
                </strong>
                <br />
                <span>
                  <t t-esc="line.product_name_wrapped[0]" />Fender Limited Edition American Professional II Stratocaster® HSS, Rosewood Neck, Sonic Blue
                </span>
                <br>
                <WrappedProductNameLines line="line" />

                <div style="font-weight:800;">
                  <span style="float: left">
                    <t t-esc="Math.round(line.quantity * Math.pow(10, env.pos.dp['Product Unit of Measure'])) / Math.pow(10, env.pos.dp['Product Unit of Measure'])" /> 1
                    <t t-if="!line.is_in_unit" t-esc="line.unit_name" /> x
                    <t t-esc="env.pos.format_currency_no_symbol(line.price_display_one)" />13.800,00
                  </span>
                  <span style="float: right">
                    <t t-esc="env.pos.format_currency_no_symbol(line.price_display)" />13.800,00
                  </span>
                  <div style="clear: both;"></div>
                </div>
                <t t-if="line.display_discount_policy == 'without_discount' and line.price != line.price_lst">
                  <div>
                    <span>
                      <t t-esc="env.pos.format_currency_no_symbol(line.price_lst)" />DKK 1.200,00 
                      -> 
                      <t t-esc="env.pos.format_currency_no_symbol(line.price)" />DKK 1.000,00 </span>
                  </div>
                </t>
                <t t-elif="line.discount !== 0">
                  <div>
                    <t t-if="env.pos.config.iface_tax_included === 'total'">
                      <t t-esc="env.pos.format_currency_no_symbol(line.price_with_tax_before_discount)" />
                    </t>
                    <t t-else="">
                      <t t-esc="env.pos.format_currency_no_symbol(line.price)" />
                    </t>
                  </div>
                </t>
                <t t-if="line.discount !== 0">
                  <div> 
                    Discount: <t t-esc="line.discount" />6%
                  </div>
                </t>
              </div>
            </t>
            <t t-if="line.customer_note">
              <div class="pos-receipt-customer-note" style="font-style:italic;">
                Note: <t t-esc="line.customer_note" />ksadkoakdasd
              </div>
            </t>
            <t t-if="line.pack_lot_lines">
              <div class="pos-receipt-left-padding">
                <ul style="margin:0;padding:0;">
                  <t t-foreach="line.pack_lot_lines" t-as="lot" t-key="lot.cid">
                    <li> SN
                      <t t-esc="lot.attributes['lot_name']" />
                    </li>
                  </t>
                </ul>
              </div>
            </t>
          </div>
        </t>
      </t>
    </div>
    <hr style="border: none; height: 1px; background: #000; background: repeating-linear-gradient(90deg,#000,#000 4px,transparent 4px,transparent 8px);"/>
    
    <!-- ORDER LINES END -->
    
    <!-- TOTAL DISCOUNT START -->
    <div style="font-family: 'Courier New', monospace; font-size: 12px; line-height: 1.5;">
      <t t-if="receipt.total_discount">
        <div>
          <span>Discounts</span>
          <span t-esc="env.pos.format_currency(receipt.total_discount)" class="pos-receipt-right-align" />DKK -500,21</span>
        </div>
      </t>
    <hr style="border: none; height: 1px; background: #000; background: repeating-linear-gradient(90deg,#000,#000 4px,transparent 4px,transparent 8px);"/>
    </div>
    
    <!-- TOTAL DISCOUNT END -->

    <!-- SUBTOTALS START -->

    <t t-if="!isTaxIncluded">
      <div style="font-family: 'Courier New', monospace; font-size: 12px; line-height: 1.5;">
        <div>
          <span>Subtotal</span>
          <span t-esc="env.pos.format_currency(receipt.subtotal)" class="pos-receipt-right-align" />DKK 1.000,20</span>
         </div>
        <t t-foreach="receipt.tax_details" t-as="tax" t-key="tax.name">
          <div class="responsive-price">
            <span t-esc="tax.name">Salgsmoms</span>
            <span t-esc='env.pos.format_currency_no_symbol(tax.amount)' class="pos-receipt-right-align">DKK 20,82</span>
          </div>
        </t>
      </div>
      <hr style="border: none; height: 1px; background: #000; background: repeating-linear-gradient(90deg,#000,#000 4px,transparent 4px,transparent 8px);"/>
    </t>
    <!-- SUBTOTALS END -->
  
    <!-- TOTALS START -->
  
    <div style="font-family: 'Courier New', monospace; font-size: 12px; line-height: 1.5;">
      <div style="padding-left:0; font-size: 150%; font-weight:800;" class="pos-receipt-amount">
        <span>TOTAL</span>
        <span t-esc="env.pos.format_currency(receipt.total_with_tax)" class="pos-receipt-right-align">DKK 1.021,02</span>
      </div>
      <t t-if="isTaxIncluded">
        <!-- Her listes hver enkel moms-type. Ikke nødvendig -->
        <span style="display:none">
        <t t-foreach="receipt.tax_details" t-as="tax" t-key="tax.name">
          <div class="responsive-price">
            <span t-esc="tax.name">Salgsmoms</span>
            <span t-esc='env.pos.format_currency_no_symbol(tax.amount)' class="pos-receipt-right-align">DKK 20,82</span>
          </div>
        </t>
        </span>
        <!-- Vi viser bare den totale moms -->
        <div>
          <span>Total Taxes (Heraf moms)</span>
          <span t-esc="env.pos.format_currency(receipt.total_tax)" class="pos-receipt-right-align">DKK 20,82</span>
        </div>
      </t>
      <t t-if="receipt.total_rounded != receipt.total_with_tax">
        <div style="padding-left:0; font-size: 100%;" class="pos-receipt-amount">
          <span>Rounding</span>
          <span t-esc='env.pos.format_currency(receipt.rounding_applied)' class="pos-receipt-right-align">DKK -00,02</span>
        </div>
        <div style="padding-left:0; font-size: 100%;" class="pos-receipt-amount">
          <span>To Pay</span>
          <span t-esc='env.pos.format_currency(receipt.total_rounded)' class="pos-receipt-right-align">DKK 1.021,00</span>
        </div>
      </t>
    </div>
    <hr style="border: none; height: 1px; background: #000; background: repeating-linear-gradient(90deg,#000,#000 4px,transparent 4px,transparent 8px);"/>
    <!-- TOTALS END -->
  
    <!-- PAYMENT LINES START -->
  
    <div style="font-family: 'Courier New', monospace; font-size: 12px; line-height: 1.5;">
      <t t-foreach="receipt.paymentlines" t-as="line" t-key="line.cid">
        <div>
          <span t-esc="line.name">Betalingskort Aarhus</span>
          <span t-esc="env.pos.format_currency_no_symbol(line.amount)" class="pos-receipt-right-align">DKK 1.000,00</span>
        </div>
        
        <div>
          <span t-esc="line.name">Kontant Aarhus</span>
          <span t-esc="env.pos.format_currency_no_symbol(line.amount)" class="pos-receipt-right-align">DKK 100,00</span>
        </div>
      </t>
    </div>
    <hr style="border: none; height: 1px; background: #000; background: repeating-linear-gradient(90deg,#000,#000 4px,transparent 4px,transparent 8px);"/>      
  
    <!-- PAYMENT LINES END -->
  
    <!-- CHANGE START -->
    <div style="font-family: 'Courier New', monospace; font-size: 12px; line-height: 1.5; font-weight: 800">
      <div style="padding-left:0; font-size: 100%;" class="pos-receipt-amount receipt-change">
        <span>CHANGE</span>        
        <span t-esc="env.pos.format_currency(receipt.change)" class="pos-receipt-right-align" >DKK -79,00</span>
      </div>
    </div>
    <hr style="border: none; height: 1px; background: #000; background: repeating-linear-gradient(90deg,#000,#000 4px,transparent 4px,transparent 8px);"/>

    <div class="before-footer" />

    
    <!-- CUSTOM FOOTER CONTENT START -->
    <t t-if="receipt.footer_html or receipt.footer">
      <div style="font-family: 'Courier New', monospace; font-size: 12px; line-height: 1.5; text-align: center; padding: 20px 0;">
        <t t-if="receipt.footer_html">
          <t t-raw="receipt.footer_html" />
        </t>
        <t t-if="!receipt.footer_html and receipt.footer">
          <div>
            <Strong>Austikken A/S</strong><br />
            Jægergårdsgade 154B · 8000 Aarhus C<br />
            +45 86 12 60 34 · CVR: DK32339816<br />
            www.akustikken.dk
          </div>
        </t>
      </div>
    <hr style="border: none; height: 1px; background: #000; background: repeating-linear-gradient(90deg,#000,#000 4px,transparent 4px,transparent 8px);"/>
    </t> 
    <!-- CUSTOM FOOTER CONTENT END -->

    <div class="after-footer" />
  </div>
</div>
    
  </body>
<!-- </html> -->
    <div id="invoice-POS">
      <center id="top">
        <div class="logo"></div>
        <div class="info">
          <h2>SBISTechs Inc</h2>
        </div>
      </center>
  
      <div id="mid">
        <div class="info">
          <h2>Contact Info</h2>
          <p>
            Address : street city, state 0000 <br />
            Email : JohnDoe@gmail.com <br />
            Phone : 555-555-5555 <br />
          </p>
        </div>
      </div>
  
      <div id="bot">
        <div id="table">
          <table>
            <tr class="tabletitle">
              <td class="item"><h2>Item</h2></td>
              <td class="Hours"><h2>Qty</h2></td>
              <td class="Rate"><h2>Sub Total</h2></td>
            </tr>
  
            <tr class="service">
              <td class="tableitem"><p class="itemtext">Communication</p></td>
              <td class="tableitem"><p class="itemtext">5</p></td>
              <td class="tableitem"><p class="itemtext">$375.00</p></td>
            </tr>
  
            <tr class="service">
              <td class="tableitem"><p class="itemtext">Asset Gathering</p></td>
              <td class="tableitem"><p class="itemtext">3</p></td>
              <td class="tableitem"><p class="itemtext">$225.00</p></td>
            </tr>
  
            <tr class="service">
              <td class="tableitem">
                <p class="itemtext">Design Development</p>
              </td>
              <td class="tableitem"><p class="itemtext">5</p></td>
              <td class="tableitem"><p class="itemtext">$375.00</p></td>
            </tr>
  
            <tr class="service">
              <td class="tableitem"><p class="itemtext">Animation</p></td>
              <td class="tableitem"><p class="itemtext">20</p></td>
              <td class="tableitem"><p class="itemtext">$1500.00</p></td>
            </tr>
  
            <tr class="service">
              <td class="tableitem">
                <p class="itemtext">Animation Revisions</p>
              </td>
              <td class="tableitem"><p class="itemtext">10</p></td>
              <td class="tableitem"><p class="itemtext">$750.00</p></td>
            </tr>
  
            <tr class="tabletitle">
              <td></td>
              <td class="Rate"><h2>tax</h2></td>
              <td class="payment"><h2>$419.25</h2></td>
            </tr>
  
            <tr class="tabletitle">
              <td></td>
              <td class="Rate"><h2>Total</h2></td>
              <td class="payment"><h2>$3,644.25</h2></td>
            </tr>
          </table>
        </div>
  
        <div id="legalcopy">
          <p class="legal">
            <strong>Thank you for your business!</strong>  Payment is expected
            within 31 days; please process this invoice within that time. There
            will be a 5% interest charge per month on late invoices.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script></script>
<style>
#invoice-POS {
  box-shadow: 0 0 1in -0.25in rgba(0, 0, 0, 0.5);
  padding: 2mm;
  margin: 0 auto;
  width: 44mm;
  background: #fff;

  ::selection {
    background: #f31544;
    color: #fff;
  }
  ::moz-selection {
    background: #f31544;
    color: #fff;
  }
  h1 {
    font-size: 1.5em;
    color: #222;
  }
  h2 {
    font-size: 0.9em;
  }
  h3 {
    font-size: 1.2em;
    font-weight: 300;
    line-height: 2em;
  }
  p {
    font-size: 0.7em;
    color: #666;
    line-height: 1.2em;
  }

  #top,
  #mid,
  #bot {
    border-bottom: 1px solid #eee;
  }

  #top {
    min-height: 100px;
  }
  #mid {
    min-height: 80px;
  }
  #bot {
    min-height: 50px;
  }

  #top .logo {
    height: 60px;
    width: 60px;
    background: url(http://michaeltruong.ca/images/logo1.png) no-repeat;
    background-size: 60px 60px;
  }
  .clientlogo {
    float: left;
    height: 60px;
    width: 60px;
    background: url(http://michaeltruong.ca/images/client.jpg) no-repeat;
    background-size: 60px 60px;
    border-radius: 50px;
  }
  .info {
    display: block;
    margin-left: 0;
  }
  .title {
    float: right;
  }
  .title p {
    text-align: right;
  }
  table {
    width: 100%;
    border-collapse: collapse;
  }
  td {
  }
  .tabletitle {
    font-size: 0.5em;
    background: #eee;
  }
  .service {
    border-bottom: 1px solid #eee;
  }
  .item {
    width: 24mm;
  }
  .itemtext {
    font-size: 0.5em;
  }

  #legalcopy {
    margin-top: 5mm;
  }
}
</style>
