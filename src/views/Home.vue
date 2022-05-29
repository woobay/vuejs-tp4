<template> 
  <main>
    <div class="container-fluid">
      <button class="btn btn-secondary m-1" :v-model="search" v-for="tag in tags">{{tag}}</button>
    </div>
    <!-- <Button :info="this.tags"/> -->
    <div v-for="(site, index) in sites" :key="index" :id="index" class="container-fluid border p-3 m-3">
      <h4 v-if="site.url"><a :href="site.url">{{site.nom}}</a></h4>
      <h4 v-else>{{site.nom}}</h4>
      <p>{{site.description}}</p>
      <button class="btn btn-secondary m-1" :v-model="tags" v-for="but in site.tags">{{but}}</button><br>
      <button @click.native="deleteSite(index)" class="btn btn-danger m-1">Delete</button>
    </div>
  </main>
</template>


<script>
import Button from "../components/Buttons.vue"
  export default {
    components: {Button},
    data() {
      return {
        sites: [],
        tags: [],
        search: ""
      }
    }, 
     methods: {
      async deleteSite(id) {
       await fetch(`https://api---vuejs-default-rtdb.firebaseio.com/sites/${id}.json`, {
         method: "DELETE"
       })
        
      },
    },
    async created() {
     let arr = []
      let result = await fetch(`https://api---vuejs-default-rtdb.firebaseio.com/sites.json`)
      let data = await result.json()

      let keys = Object.keys(data)
      for (let i = 0; i < keys.length; i++) {
        let k = keys[i];
        let tag = data[k].tags
        arr.push(tag)
      }
      let merge = [].concat.apply([], arr)
      let unique = [...new Set(merge)]
      this.tags = unique
      this.sites = data
    },
    computed: {
      filteredSites() {
        // console.log(this.sites)
        // return this.sites.filter((site) => {
        //   return site.tags.match(this.search)
        // })
      }
        
      }
    }
   


  
</script>
