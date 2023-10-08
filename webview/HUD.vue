<template>
    <div class="hud">
        <div class="hud-item">
            <div class="hud-label">Bank <Icon icon="icon-bank" :size="24" /></div>
            <div class="hud-value">{{ formatNumberWithThousandsSeparator(bankBalance) }}$</div>
        </div>
        <div class="hud-item">
            <div class="hud-label">Cash <Icon icon="icon-cash" :size="24" /></div>
            <div class="hud-value">{{ formatNumberWithThousandsSeparator(cashBalance) }}$</div>
        </div>
        <div class="hud-item">
            <div class="hud-label">Speed <Icon icon="icon-speed" :size="24"></Icon></div>
            <div class="hud-value">{{ speed }} km/h</div>
        </div>
        <div class="hud-item">
            <div class="hud-label">Time <Icon icon="icon-clock" :size="24"></Icon></div>
            <div class="hud-value">{{ currentTime }}</div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import WebViewEvents from '@utility/webViewEvents';
import { HUD_EVENTS } from '../shared/events';
import Icon from '@/components/Icon.vue';

let bankBalance = ref(0);
let cashBalance = ref(0);
let speed = ref('');
let currentTime = ref('');

onMounted(() => {
    WebViewEvents.on(HUD_EVENTS.UPDATE_HUD, updateData);
    WebViewEvents.on(HUD_EVENTS.UPDATE_SPEED, updateSpeed);

    updateTime();
    setInterval(updateTime, 1000);
});

function updateTime() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    currentTime.value = `${hours}:${minutes}:${seconds}`;
}

function updateData(bank: number, cash: number) {
    bankBalance.value = bank;
    cashBalance.value = cash;
}

function updateSpeed(speedClient: string) {
    speed.value = speedClient;
}

function formatNumberWithThousandsSeparator(number: number) {
    if (typeof number !== 'number' || isNaN(number)) {
        return 'Invalid Number';
    }

    const numberString = number.toString();
    const parts = numberString.split('.');
    const wholePart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    const formattedNumber = parts.length === 2 ? wholePart + '.' + parts[1] : wholePart;

    return formattedNumber;
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter&display=swap');

.hud {
    position: fixed;
    top: 50px; /* Adjust the top value as needed */
    right: 10px; /* Adjust the right value as needed */
    background-color: rgba(0, 0, 0, 0.7);
    color: white;
    padding: 10px;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    width: 200px;
}

.hud-item {
    display: flex;
    justify-content: space-between;
    margin: 5px 0;
}

.hud-label {
    font-weight: bold;
}

.hud-value {
    font-size: 20px;
    font-family: 'Inter';
}
</style>
