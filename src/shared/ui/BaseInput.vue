<template>
  <label class="input">
    <input
      :type="type"
      :value="modelValue ?? ''"
      :placeholder="placeholder"
      :disabled="disabled"
      class="input__field"
      :class="{ 'input__field--number': type === 'number' }"
      @input="onInput"
      @focus="onFocus"
    />
  </label>
</template>

<script lang="ts" setup>
const props = defineProps<{
  modelValue: string | number | null
  type?: string
  placeholder?: string
  disabled?: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number): void
}>()

const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  const rawValue = props.type === 'number' ? parseFloat(target.value) : target.value

  const value = isNaN(rawValue as number) ? '' : rawValue
  emit('update:modelValue', value)
}

const onFocus = (event: Event) => {
  const target = event.target as HTMLInputElement
  target.select()
}
</script>

<style scoped lang="scss">
.input {
  display: block;

  &__field {
    width: 100%;
    padding: 0.75rem 1rem;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 8px;
    color: #333;
    background-color: #fff;
    transition: all 0.2s ease;
    outline: none;
    text-overflow: ellipsis;
    overflow: hidden;

    &:hover {
      border-color: #999;
    }

    &:focus {
      border-color: #007bff;
      box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.2);
    }

    &:disabled {
      background-color: #f5f5f5;
      color: #999;
      cursor: not-allowed;
    }

    &--number {
      text-align: right;
    }
  }

  input[type='number'] {
    -moz-appearance: textfield;

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }
}
</style>
