<!-- created by waweru -->

<template>
    <div class="ui container" id="selection-component">
        <div class="ui two column grid">
            <div class="centered three wide column">
                <div class="ui secondary pointing vertical menu">
                <div class="header item">Selection Components</div>
                <a class="item" :class="{'blue active': (activeComponent.txt===component.txt) }"
                    v-for="component in components" 
                    @click.prevent="(activeComponent = component);">

                    <i :class="component.icon" class="icon"></i>
                    {{ component.txt }}

                </a>
                </div>
            </div>
            <div class="centered column"></div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Selection',
        data() {
            return {
                components: [
                    { txt: 'Dropdown', icon: 'text cursor' },
                    { txt: 'Multi Choice', icon: 'at' },
                    { txt: 'Multi Select', icon: 'external' }
                ],
                activeComponent: { txt: 'Dropdown', icon: 'text cursor' },
            }
        }
    }
</script>

<style>
#selection-component{
    background: #FFF;
    border: 1px solid rgba(0,0,0,0.1);
    border-top: 3px solid sienna;
    padding-top: 30px;
    padding-bottom: 20px;
}
</style>