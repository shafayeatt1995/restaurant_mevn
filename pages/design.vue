<template>
  <div class="mx-auto w-[1050px] h-[800px]">
    <div
      class="grid grid-cols-[repeat(21,_minmax(0,_1fr))] grid-rows-[repeat(16,_minmax(0,_1fr))] w-full h-full text-white text-lg gap-[1px]"
    >
      <div
        class="bg-green-500 grid-cols-[repeat(20,_minmax(0,_1fr))] grid-rows-[repeat(8,_minmax(0,_1fr))] col-span-10 row-span-4 grid gap-[1px]"
      >
        <div class="bg-black col-span-3 row-span-3">
          Empty <Block> 1.5/1.5</Block>
        </div>
        <div class="bg-black col-span-5 row-span-3">
          Chula <Block> 2.5/1.5</Block>
        </div>
        <div class="bg-black col-span-12 row-span-3">
          Oven, rice cooker & other <Block> 6/1.5</Block>
        </div>
        <div class="bg-black col-span-3 row-span-5">
          Sink <Block> 1.5/2.5</Block>
        </div>
        <div class="bg-transparent col-span-12 row-span-5">
          Available moving space <Block> 8.5/2.5</Block>
        </div>
        <div class="bg-transparent col-span-5 row-span-5">
          <p class="font-bold text-6xl">10/4</p>
        </div>
        <!-- <h1 class="text-5xl text-white font-bold">10/4</h1> -->
      </div>
      <div
        class="bg-orange-500 col-span-11 row-span-8 grid-cols-[repeat(22,_minmax(0,_1fr))] grid-rows-[repeat(16,_minmax(0,_1fr))] grid gap-[1px]"
      >
        <div class="bg-black col-span-8 row-span-3">
          Wall <Block>Cabinet</Block> <Block> 1.5/4</Block>
        </div>
        <div class="bg-transparent col-span-4 row-span-8"></div>
        <div class="bg-black col-span-10 row-span-16">
          Bed <Block> 5/8</Block>
        </div>
        <div class="bg-transparent col-span-12 row-span-2"></div>
        <div class="bg-black col-span-1 row-span-6">Door <Block> 3</Block></div>
      </div>
      <div
        class="bg-blue-500 col-span-6 row-span-4 grid-cols-[repeat(12,_minmax(0,_1fr))] grid-rows-[repeat(8,_minmax(0,_1fr))] grid gap-[1px]"
      >
        <div class="bg-black col-span-6 row-span-8">
          Toilet <Block> 3/4</Block>
        </div>
        <div class="bg-black col-span-6 row-span-4">
          Bathroom <Block> 3/4</Block>
        </div>
        <div class="bg-transparent col-span-2 row-span-4">
          <p class="font-bold text-4xl">6/4</p>
        </div>
        <div class="bg-black col-span-4 row-span-4 rounded-tl-full">
          Door<Block>2/2</Block>
        </div>
        <!-- <h1 class="text-5xl text-white font-bold">6/4</h1> -->
      </div>
      <div class="bg-pink-500 col-span-4 row-span-4">
        <h1 class="text-5xl text-white font-bold">4/4</h1>
      </div>
      <div class="bg-cyan-500 col-span-4 row-span-8">
        <h1 class="text-5xl text-white font-bold">4/8</h1>
      </div>
      <div
        class="bg-pink-500 col-span-6 row-span-8 grid-cols-[repeat(12,_minmax(0,_1fr))] grid-rows-[repeat(16,_minmax(0,_1fr))] grid gap-[1px]"
      >
        <div class="bg-black col-span-4 row-span-4">
          Washing <Block>machine</Block> <Block> 2/2</Block>
        </div>
        <div class="bg-transparent col-span-8 row-span-4"></div>
        <div class="bg-black col-span-4 row-span-4">
          Freeze <Block> 2/2</Block>
        </div>
        <div class="bg-transparent col-span-8 row-span-4"></div>
        <div class="bg-transparent col-span-12 row-span-3">
          <p class="font-bold text-6xl">6/8</p>
        </div>
        <div class="bg-black col-span-6 row-span-6 rounded-tr-full">
          Main Door<Block>3/3</Block>
        </div>
      </div>
      <div
        class="bg-yellow-500 col-span-11 row-span-8 grid-cols-[repeat(22,_minmax(0,_1fr))] grid-rows-[repeat(16,_minmax(0,_1fr))] grid gap-[1px]"
      >
        <div class="bg-black col-span-1 row-span-6">Door <Block> 3</Block></div>
        <div class="bg-transparent col-span-11 row-span-6"></div>
        <div class="bg-black col-span-10 row-span-16">
          Bed <Block> 5/8</Block>
        </div>
        <div class="bg-transparent col-span-12 row-span-7"></div>
        <div class="bg-black col-span-8 row-span-3">
          Wall Cabinet <Block> 1.5/4</Block>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "indexPage",
  auth: false,
};
</script>

<style>
.bg-black,
.bg-transparent {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.row-span-16 {
  grid-row: span 16 / span 16;
}
</style>
