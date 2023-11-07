<script setup lang="ts">
import { submitForm, FormKitMessages } from "@formkit/vue";

definePageMeta({
  layout: "plain",
});

const router = useRouter();
const { convertPrice, getTotalCost } = useHelpers();

const cartStore = useCartStore();
const productStore = useProductStore();
const { dynamicHeaderHeight } = storeToRefs(useGeneralStore());

const showSuccessModal = ref(false);

const onCloseSuccessModal = () => {
  router.push("/");
  showSuccessModal.value = false;
  cartStore.clearCart();
};

const products = computed(() => {
  return Object.keys(cartStore.cart).map(key => productStore.findProduct(key));
});

const onSubmit = () => {
  showSuccessModal.value = true;
};

// Prevents hydration issues
const awaitMount = ref(false);
onMounted(() => {
  awaitMount.value = true;
});

const showOtherItems = ref(false);
</script>

<template>
  <div class="h-full pb-28">
    <div class="content-container pb-6 pt-8 md:pb-14 md:pt-20">
      <button class="group/back-button flex gap-3" @click="$router.back()">
        <svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg" class="rotate-180">
          <path d="M1.32227 1L6.32227 6L1.32227 11" stroke="#D87D4A" stroke-width="2" />
        </svg>
        <span
          class="text-button text-dark opacity-60 transition-all group-hover/back-button:text-primary group-hover/back-button:opacity-100"
        >
          Back
        </span>
      </button>
    </div>

    <div class="content-container">
      <FormKit
        id="checkout"
        v-slot="{ value }"
        type="form"
        :actions="false"
        :value="{
          productQnt: 1,
        }"
        @submit="onSubmit"
      >
        <Transition name="fade-move">
          <div v-if="awaitMount" class="grid grid-cols-1 gap-7 xl:grid-cols-3 xl:gap-8">
            <div class="rounded-lg bg-light p-6 md:p-8 lg:col-span-2 2xl:p-12">
              <div class="mb-8 md:mb-9 lg:mb-12">
                <p class="text-sub-title">Billing Details</p>
                <div class="grid grid-cols-1 gap-x-4 md:grid-cols-2">
                  <FormKit type="text" label="Name" validation="required" />
                  <FormKit type="email" label="Email Address" validation="required|email" />
                  <FormKit
                    type="tel"
                    label="Phone Number"
                    validation="required"
                    :validation-messages="{
                      matches: 'Please enter a valid phone number',
                    }"
                  />
                </div>
              </div>
              <div class="">
                <p class="text-sub-title">shipping info</p>
                <div class="grid grid-cols-1 gap-x-4 md:grid-cols-2">
                  <div class="md:col-span-2">
                    <FormKit type="text" label="Address" validation="required" />
                  </div>
                  <FormKit type="text" label="Zip Code" validation="required" />
                  <FormKit type="text" label="City" validation="required" />
                  <FormKit type="text" label="Country" validation="required" />
                </div>
              </div>
              <div>
                <p class="text-sub-title">Payment Details</p>
                <div class="grid grid-cols-1 gap-x-4 md:grid-cols-2">
                  <label class="font-bold">Payment Method</label>
                  <FormKit
                    type="radio"
                    name="paymentMethod"
                    validation="required"
                    :validation-messages="{
                      required: 'Please select an option',
                    }"
                    :options="{
                      eMoney: 'e-Money',
                      cash: 'Cash On Delivery',
                    }"
                  />
                </div>
                <TransitionGroup name="fade">
                  <div v-if="value?.paymentMethod === 'eMoney'" class="grid grid-cols-1 gap-x-4 md:grid-cols-2">
                    <FormKit type="text" label="e-Money Number" validation="required" />
                    <FormKit type="text" label="e-Money PIN" validation="required" />
                  </div>
                  <div v-if="value?.paymentMethod === 'cash'" class="flex items-center gap-8">
                    <svg
                      class="min-w-[48px]"
                      width="48"
                      height="48"
                      viewBox="0 0 48 48"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M42.2812 8.4375H46.5938C47.3704 8.4375 48 9.06713 48 9.84375C48 10.6204 47.3704 11.25 46.5938 11.25H45.0938V23.9062C45.0938 24.6829 44.4641 25.3125 43.6875 25.3125H33.8438V40.9688C33.8438 41.7454 33.2141 42.375 32.4375 42.375H25.0773C24.4239 45.5805 21.5831 48 18.1875 48H1.40625C0.629625 48 0 47.3704 0 46.5938C0 45.8171 0.629625 45.1875 1.40625 45.1875H18.1875C20.021 45.1875 21.585 44.012 22.1653 42.375H8.4375C7.66087 42.375 7.03125 41.7454 7.03125 40.9688C7.03125 40.1921 7.66087 39.5625 8.4375 39.5625H12.5625C13.3379 39.5625 13.9688 38.9317 13.9688 38.1562C13.9688 37.3808 13.3379 36.75 12.5625 36.75H9.43444C6.87619 36.75 4.37297 37.6373 2.38575 39.2485C1.78247 39.7376 0.896906 39.6454 0.407719 39.0419C-0.0814688 38.4385 0.0110625 37.553 0.614344 37.0639C2.84203 35.2578 5.58806 34.1792 8.4375 33.9741V18.375C8.4375 17.5984 9.06713 16.9688 9.84375 16.9688H18.375V7.03125C18.375 6.25462 19.0046 5.625 19.7812 5.625H28.1223C31.9334 2.02078 36.9875 0 42.2641 0H46.5938C47.3704 0 48 0.629625 48 1.40625C48 2.18287 47.3704 2.8125 46.5938 2.8125H42.2642C38.805 2.8125 35.4975 3.79453 32.658 5.625H38.0625C38.8326 5.625 39.4688 6.25228 39.4688 7.03125C39.4688 7.52423 39.3372 7.69561 38.4891 8.80021C38.0648 9.3528 37.4613 10.1389 36.6052 11.3157C36.2039 11.8513 36.3433 12.6075 36.8974 12.9688C37.4088 13.3025 38.0923 13.1781 38.4534 12.6856L41.1473 9.01219C41.4121 8.65088 41.8333 8.4375 42.2812 8.4375ZM32.4375 16.9688C32.9273 16.9688 33.3582 17.2195 33.6099 17.5993C35.4415 15.9118 34.2652 12.7969 31.7344 12.7969C29.5943 12.7969 28.2687 15.1348 29.3533 16.9688H32.4375ZM21.1875 8.4375H35.2472C35.0152 8.75898 34.8251 9.00687 34.6644 9.21646C34.3106 9.67792 34.0992 9.95371 33.896 10.4204C29.6796 8.64131 25.1696 12.4771 26.337 16.9688H21.1875V8.4375ZM22.5938 25.4062V19.7812H19.7812V25.4062H22.5938ZM31.0312 39.5625H16.5403C17.5098 36.8283 15.4711 33.9375 12.5625 33.9375H11.25V19.7812H16.9688V26.8125C16.9688 27.5891 17.5984 28.2188 18.375 28.2188H24C24.7766 28.2188 25.4062 27.5891 25.4062 26.8125V19.7812H31.0312V39.5625ZM33.8438 20.7288V22.5H42.2812V12.2217L40.7213 14.3488C39.9301 15.4278 38.6519 16.0371 37.2972 15.9602C37.1467 18.1043 35.7894 19.9393 33.8438 20.7288Z"
                        fill="#D87D4A"
                      />
                    </svg>
                    <p class="opacity-60">
                      The ‘Cash on Delivery’ option enables you to pay in cash when our delivery courier arrives at your
                      residence. Just make sure your address is correct so that your order will not be cancelled.
                    </p>
                  </div>
                </TransitionGroup>
              </div>
            </div>
            <div class="rounded-lg bg-light">
              <div>
                <ProductSummary
                  title="Summary"
                  show-additional-info
                  button-text="Continue & Pay"
                  class="sticky"
                  :style="{ top: `${dynamicHeaderHeight}px` }"
                  @click="() => submitForm('checkout')"
                />
              </div>
              <FormKitMessages class="!-mt-7 !px-6 !pb-5 md:!px-8 md:!pb-7 2xl:!px-12 2xl:!pb-10" />
            </div>
          </div>
        </Transition>
      </FormKit>
    </div>

    <Modal :show-modal="showSuccessModal" position="center" @close-modal="onCloseSuccessModal">
      <div class="p-6 md:p-8 lg:p-12">
        <svg
          width="64"
          height="64"
          viewBox="0 0 64 64"
          class="mb-6 md:mb-8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="32" cy="32" r="32" fill="#D87D4A" />
          <path d="M20.7539 33.3328L27.5054 40.0843L43.3085 24.2812" stroke="white" stroke-width="4" />
        </svg>

        <p class="text-heading-2xl">Thank you for your order</p>
        <p class="opacity-60">You will receive an email confirmation shortly.</p>
        <div class="mb-6 grid grid-cols-1 md:mb-8 md:grid-cols-2">
          <div
            class="flex max-h-56 flex-col gap-4 overflow-y-scroll rounded-t-lg bg-gray-medium p-6 md:rounded-l-lg md:rounded-tr-none"
          >
            <div
              v-for="(product, idx) in products"
              :key="product?.key"
              class="flex gap-4"
              v-show="idx === 0 || showOtherItems"
            >
              <div class="flex h-16 w-14 items-center justify-center">
                <NuxtImg
                  class="max-h-full w-full object-contain object-left"
                  height="100"
                  :src="`/products/${product?.key}/display.png`"
                />
              </div>
              <div class="flex flex-col">
                <p class="mb-0 font-bold">{{ product?.name }}</p>
                <p class="mb-0 opacity-60">$ {{ convertPrice(product?.price ?? 0) }}</p>
              </div>
              <div class="ml-auto">
                <div class="opacity-60">x{{ cartStore.cart[product?.key ?? ""] }}</div>
              </div>
            </div>
            <button
              v-if="!showOtherItems"
              @click.stop="() => (showOtherItems = true)"
              class="mb-0 mt-2 cursor-pointer text-center text-sm font-bold opacity-60 hover:opacity-100"
            >
              And {{ products.length - 1 }} other item(s)
            </button>
          </div>
          <div class="flex flex-col justify-center rounded-b-lg bg-gray-dark p-6 md:rounded-r-lg md:rounded-bl-none">
            <p class="text-light opacity-50">Grand Total</p>
            <p class="text-light">
              $ {{ convertPrice(getTotalCost(cartStore.cart, productStore.products) + cartStore.shippingCost) }}
            </p>
          </div>
        </div>
        <Button btn-style="primary" class="w-full" @click="onCloseSuccessModal">Back to home</Button>
      </div>
    </Modal>
  </div>
</template>
