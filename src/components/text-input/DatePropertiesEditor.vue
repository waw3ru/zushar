
<template>
  
</template>

<script>
export default {
  name: 'datePropertiesEditor',
  props: {
    save: {
      type: Function,
      required: true
    }
  },
  data() {
    return {
      current: Object.assign({}, textInput.date)
    }
  },
  mounted() {

  },
  methods: {
    saveProps() {
      this.save({
        type: 'url',
        props: Object.assign({}, data)
      }, 
      function () {
        /*
        * after submitting properties return the props form to default
        * */
        this.current = Object.assign({}, textInput.url);
      }.bind(this));
    }
  }
}
</script> 

<style></style>
