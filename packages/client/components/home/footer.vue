<template>
  <footer
    class="py-2 px-4 border-t-1 border-solid border-color-lightgray border-t max-w-6xl mx-auto"
    style="border-color: #eee;"
  >
    <div class="flex items-center flex-col gap-2 sm:flex-row sm:justify-between">
      <div class="left">
        <p class="gray">
          Contact Us:
          <a class="underline" href="mailto:support@shopflex.io">
            support@shopflex.io
          </a>
        </p>
        <p class="gray">
          <a class="gray link" href="https://www.shopflex.io/privacy_policy">
            ShopFlex &copy;{{ currentYear }}. Privacy Policy
          </a>
        </p>
      </div>

      <div class="center flex items-center gap-2">
        <!-- <a href="https://twitter.com/ShopFlexApp" target="_blank" title="Twitter">
          <img class="social-icon" src="../../assets/icons/twitter.svg" alt="" width="25px" height="25px">
        </a> -->
        <a href="https://www.linkedin.com/company/shopflex/" target="_blank" title="LinkedIn">
          <img class="social-icon" src="../../assets/icons/linkedin-fill.svg" alt="" width="25px" height="25px">
        </a>
        <a href="https://www.youtube.com/channel/UCbRav4l3M30l3p8hhBPz5VQ" target="_blank" title="Youtube">
          <img class="social-icon" src="../../assets/icons/Youtube.svg" alt="" width="25px" height="25px">
        </a>
      </div>

      <div class="right flex items-center gap-2">
        <img class="rounded-full" style="width: 24px; height: 24px;" src="/logo.png" />
        <h4 class="font-semibold">Hope you get what you want here!</h4>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const currentYear = new Date().getFullYear()
</script>

<style scoped lang="scss">
footer {
  background: #fff;
  color: black;

  p,
  h4 {
    margin-bottom: 0;
  }

  .gray {
    color: #909090;
  }
  .link {
    &:hover {
      color: var(--color-primary);
    }
  }
  .social-icon:hover {
    cursor: pointer;
  }
}
</style>
