<template>
    <div class="container-fluid">
        <h3>Ajouter un site</h3>
        <form @submit.prevent="submitData" class="form-group ">
            <div :class="{invalid: userNameValidity}">
                <label>Nom:</label>
                <input class="form-control" type="text" v-model="nom">
                 <p class="error" v-if="userNameValidity">Veuillez saisir un nom</p>
            </div>
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
                tags: "",
                userNameValidity: false,
                formIsValid: true

            }
        }, 
        methods: {
            async submitData() {
                this.validate(); 
  
            if (!this.formIsValid) {
                return;
            }
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
            }, 
            validate() {
                this.formIsValid = true
                this.userNameValidity = false;

                if (this.nom.length === 0 || this.nom.length > 250) {
                    this.userNameValidity = true;
                    this.formIsValid = false;
                 }
            }
        }
    }

</script>




<style>
    form {
        width: 30%
    }

    .error {
        color: red
    }
</style>
