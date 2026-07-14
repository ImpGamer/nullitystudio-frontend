<template>
    <div class="main-container b-padding vertical-container mid-aligner m-separator">
        <div>
            <h4 class="title-font">Fill out this form to contact us</h4>
            <p class="text">(Any off-topic contact will be ignored)</p>
        </div>
        <form ref="formRef" class="vertical-container mid-aligner m-separator form-container" @submit.prevent>
            <div class="vertical-container start-aligner s-separator use-all-width">
                <label for="name" class="text">Name</label>
                <input v-model="form.name" type="text" id="name" placeholder="Your Name Here" />
            </div>
            <div class="vertical-container s-separator start-aligner use-all-width">
                <label for="email" class="text">Email</label>
                <input v-model="form.email" type="email" id="email" placeholder="Example: myemailaddress@gmail.com"
                    required />
            </div>
            <div class="vertical-container s-separator start-aligner use-all-width">
                <label for="issue" class="text">Issue</label>
                <input v-model="form.issue" type="text" id="issue" placeholder="Example: Report Bug on [Name Game]" />
            </div>
            <div class="vertical-container s-separator start-aligner use-all-width">
                <label for="message" class="text">Message</label>
                <textarea v-model="form.message" type="text" id="message"
                    placeholder="Example: Hi Nullity Studio! (your also can append HTML)" required></textarea>
            </div>

            <ButtonComponent :busy="isSending" @click="onSubmit" content="Send" icon="/images/icons/send_icon.svg"
                color="white" />
        </form>
        <div class="vertical-container s-separator mid-aligner">
            <p class="text">Or, you can also contact us by email.</p>
            <ButtonComponent content="Email" :href="`mailto:${contactEmail}`" color="#a31225"
                icon="/images/icons/email_icon.svg" />
        </div>
    </div>
</template>

<script setup>
import ButtonComponent from '@components/ButtonComponent.vue'
import { contactEmail } from '@config/sources.config';
import { useToast } from 'vue-toastification';
import { ref, reactive } from 'vue';

const toast = useToast()

const formRef = ref(null)
const form = reactive({
    name: '',
    email: '',
    issue: '',
    message: ''
})
const isSending = ref(false);
const EMAIL_TIMER = {
    key: 'email-timer',
    timer: null
};

let emailTime = parseInt(sessionStorage.getItem(EMAIL_TIMER.key));
if (!Number.isNaN(emailTime) && emailTime > 0) {
    EMAIL_TIMER.timer = setInterval(emailTimerFunction, 1000);
}

async function onSubmit() {
    if (EMAIL_TIMER.timer) {
        toast.info(`You will be able to send another email at ${emailTime}s`)
        return;
    }

    if (!formRef.value.checkValidity()) {
        formRef.value.reportValidity();
        return;
    }

    const body = {
        from: form.email,
        to: contactEmail,
        subject: `📧 New Message from${form.name} 📧`,
        html: `
            <h1>⚡ Title Issue: <b>${form.issue} </b> ⚡</h1>
            <h3>Contact Email: <p>${form.email}</p></h3>
            <br/>
            <h3>📧 Message: 📧</h3>
            <p>${form.message}</p>
        `
    }
    try {
        isSending.value = true;
        const res = await fetch(`${import.meta.env.VITE_EMAIL_URL}/email`, {
            body: JSON.stringify(body),
            method: "POST",
            headers: { 'Content-Type': 'application/json' }
        });

        const json = await res.json();
        if (res.ok) {
            const totalTimer = 60;
            emailTime = totalTimer;
            sessionStorage.setItem(EMAIL_TIMER.key, totalTimer.toString());

            EMAIL_TIMER.timer = setInterval(emailTimerFunction, 1000);
            toast.success(json.message)
        } else {
            toast.error(json.error);
        }
    } catch (ex) {
        toast.error(ex.message)
    } finally {
        isSending.value = false;
    }
}

function emailTimerFunction() {
    emailTime--;
    if (emailTime <= 0) {
        clearInterval(EMAIL_TIMER.timer);
        EMAIL_TIMER.timer = null;

        sessionStorage.setItem(EMAIL_TIMER.key, '0');
    }
    if (emailTime % 5 === 0) {
        sessionStorage.setItem(EMAIL_TIMER.key, emailTime.toString());
    }
}
</script>

<style scoped>
.form-container {
    width: clamp(300px, 75vw, 800px);
}
</style>
