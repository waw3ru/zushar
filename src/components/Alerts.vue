<!-- created by waweru -->

<template>
    <transition name="zsrAlert">
    
        <div class="zsr-alert-container" v-if="isActive">
            <div 
                :class="[
                    'ui', 
                    (alert.icon) ? 'icon' : '',
                    (level==='normal') ? 'black' : level,
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
        </div>

    </transition>
</template>

<script>
    import moment from 'moment'
    import { mapState } from 'vuex'

    export default {
        name: 'zsrAlerts',
        computed: mapState({
            alert: state => state.zsrAlert.content,
            level: state => state.zsrAlert.level,
            isActive: state => state.zsrAlert.isActive
        })
    }   
</script>

<style>
.zsr-alert-container{
    width: auto;
    max-width: 400px;
    height: auto;
    bottom: 0;
    display: block;
    position: fixed;
    overflow-x: hidden;
    margin: 0;
    padding-top: 0;
    padding-bottom: 10px;
    padding-left: 20px;
    padding-right: 0;
    z-index: 30;
}

/* transition for zsr-alert */
.zsrAlert-enter-active{
  animation: slideInUp .4s;
}
.zsrAlert-leave-active{
  animation: slideOutLeft .3s;
}
</style>