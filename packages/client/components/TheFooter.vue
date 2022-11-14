<template>
  <footer
    class="py-2 px-4 border-t-1 border-solid border-color-lightgray border-t"
    style="border-color: #eee;"
  >
    <div class="flex items-center flex-col gap-2 sm:flex-row sm:justify-between">
      <div class="left">
        <p class="gray">Contact Us: support@shopflex.io</p>
        <p class="gray">
          ShopFlex @2021.
          <a class="gray link" href="https://www.shopflex.io/privacy_policy">
            Privacy Police
          </a>
        </p>
      </div>

      <div class="right flex items-center gap-2">
        <img style="width: 16px; height: 16px;" src="/footer-logo.png" />
        <h4 class="font-semibold">Hope you get what you want here!</h4>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts"></script>

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
}
</style>
