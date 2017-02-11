<!-- created by waweru -->

<template>

    <transition name="zsrAlert">
        <div 
            :class="[
                'ui', 
                (alert.icon) ? 'icon' : '',
                (alert.level==='normal') ? 'black' : alert.level,
                'message'
        ]">
            <i :class="[alert.icon, 'icon']" v-if="alert.icon"></i>
            <div class="content">
                <div class="header" v-if="alert.heading">
                    {{ alert.heading }}
                </div>
                <p>{{ alert.message }}</p>
            </div>
        </div>
    </transition>

</template>

<script>
    export default {
        name: 'Alert',
        props: {
            alert: {
                type: Object,
                required: true
            },
            timeout: {
                type: Function,
                required: true
            }
        },
        mounted() {
            setTimeout(() => {
                this.timeout(this.alert.id);
            }, this.alert.timeout)
        }
    }
</script>

<style>
    /* transition for zsr-alert */
.zsrAlert-enter-active{
  animation: slideInUp .4s;
}
.zsrAlert-leave-active{
  animation: slideOutLeft .3s;
}
</style>