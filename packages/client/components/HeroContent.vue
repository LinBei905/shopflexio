<template>
  <div class="pt-24 text-black relative">
    <div class="container px-3 mx-auto flex flex-wrap flex-col md:flex-row items-center">
      <!--Left Col-->
      <div
        class="flex flex-col w-full md:w-2/5 justify-center items-start text-center md:text-left"
      >
        <!-- <p class="uppercase tracking-loose w-full">What business are you?</p> -->
        <h1 class="font-bold text-3xl">
          <span class="text-primary">B2B</span> and
          <span class="text-primary">Omni-Channel</span> Selling SaaS
        </h1>
        <p class="text-xl mt-8 font-medium">
          ShopFlex is the ideal platform for your omnichannel strategy, creating a seamless
          connection across sallers and influencers in order to sell all your products worldwide.
        </p>

        <section class="benefit">
          <h2 class="font-semibold text-2xl my-5">
            You will benefit from ShopFlex:
          </h2>

          <ul class="px-4 list" wrap>
            <li class="font-semibold text-xl mb-6">
              Multiple Sales Channels
            </li>
            <li class="font-semibold text-xl mb-6">
              Free Exposure Opportunities
            </li>
            <li class="font-semibold text-xl mb-6">
              Low Investment
            </li>
          </ul>
        </section>

        <!-- <p
          class="font-medium text-xl"
          v-html="bannerStore.description.value"
          v-bind="bannerStore.description.props"
        ></p> -->

        <!-- <button
          class="mx-auto lg:mx-0 hover:underline bg-white text-gray-800 font-bold rounded-full my-6 py-4 px-8 shadow-lg"
        >
          Subscribe
        </button> -->
      </div>
      <!--Right Col-->
      <div class="pl-18 w-full md:w-3/5 py-6 text-center hidden md:block">
        <img style="" class="w-full md:w-4/5 z-50" src="~/assets/img/banner.png" alt />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HeroContent',
}
</script>

<style lang="scss" scoped>
.list {
  li {
    display: flex;
    align-items: center;
    gap: 6px;
    &::before {
      content: '';
      display: block;
      border-radius: 999px;
      background: #000;
      width: 6px;
      height: 6px;
    }
  }
}

.banner {
  position: absolute;
  right: 40px;
  top: 60px;
}
</style>
