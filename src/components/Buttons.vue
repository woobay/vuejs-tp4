<template>
<button v-for="tag in tags" class="btn btn-success">{{tag}}</button>

</template>

<script>
export default {
    props: {
        info: Array
    },
    data() {
        return {
        
        }
    }, 

    methods: {

    }
}

</script>