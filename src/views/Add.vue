<template>
    <div class="container-fluid">
        <h3>Ajouter un site</h3>
        <form @submit.prevent="submitData" class="form-group ">
            <label>Nom:</label>
            <input class="form-control" type="text" v-model="nom">
            <label>URL:</label>
            <input class="form-control" type="text" v-model="url">
            <label>Description:</label>
            <textarea class="form-control" type="text" v-model="desc"></textarea>
            <label>Tags:</label>
            <input class="form-control" type="text" v-model.trim="tags"><br>
            <button type="submit" class="btn btn-success">Ajouter</button>
            </form>
    </div>
  
</template>

<script>
    export default {
        data() {
            return{
                nom: "",
                url: "",
                desc: "",
                tags: ""

            }
        }, 
        methods: {
            async submitData() {
                let array = this.tags.split(" ")
                let result = await fetch(`https://api---vuejs-default-rtdb.firebaseio.com/sites.json`, {
                    method: "POST", 
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        date: new Date(),
                        nom: this.nom,
                        url: this.url,
                        description: this.desc,
                        tags: array})
                })
                this.$router.push("/")
            }
        }
    }

</script>




<style>
    form {
        width: 30%
    }
</style>
