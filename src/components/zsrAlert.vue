<!-- created by waweru -->

<template>

    
    <div class="zsr-alert-container">
        <alert v-for="alert in alerts" :key="alert.id" :timeout="alertTimeout" :alert="alert"></alert>
    </div>

    
</template>

<script>
    import Alert from './Alert.vue'

    export default {
        name: 'zsrAlerts',
        components: {
            Alert
        },
        props: {
            alerts: {
                type: Array,
                required: true
            }
        },
        methods: {
            alertTimeout(id) {
                this.$store.dispatch('clear_alert', {
                    TYPE: 'CLEAR_ALERT',
                    id
                })
            }
        }
    }   
</script>

<style>
.zsr-alert-container{
    width: auto;
    max-width: 450px;
    height: auto;
    bottom: 0;
    display: block;
    position: fixed;
    margin: 0;
    padding-top: 0;
    padding-bottom: 10px;
    padding-left: 20px;
    padding-right: 0;
    z-index: 30;
    transition: all 1s ease;
}
</style>