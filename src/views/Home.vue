<template> 
  <main>
    <div class="container-fluid">
      <button class="btn btn-secondary m-1" v-on:change="filteredTags" :v-model="search" v-for="tag in tags">{{tag}}</button>
    </div>
    <!-- <Button :info="this.tags"/> -->
    <div v-for="(site, index) in sites" :key="index" :id="index" class="container-fluid border p-3 m-3">
      <h4 v-if="site.url"><a :href="site.url">{{site.nom}}</a></h4>
      <h4 v-else>{{site.nom}}</h4>
      <p>{{site.description}}</p>
      <button class="btn btn-secondary m-1" :v-model="tags" v-for="but in site.tags">{{but}}</button><br>
      <button @click.native="deleteSite(site.id)" class="btn btn-danger m-1">Delete</button>
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
        search: "",
        currentState: false
      }
    }, 
     methods: {
      async deleteSite(id) {
        console.log("Here")
       await fetch(`https://api---vuejs-default-rtdb.firebaseio.com/sites/${id}.json`, {
         method: "DELETE"
       })
        this.loadSites()
        this.loadTags()
      },
      async loadSites() {
        let arr = []
        let result = await fetch(`https://api---vuejs-default-rtdb.firebaseio.com/sites.json`)
        let data = await result.json()
        for(let i in data) {
          data[i].id = i
          arr.push(data[i])
        }
        let reverse = [...arr].reverse()
        this.sites = reverse



      },
      async loadTags() {
        let result = await fetch(`https://api---vuejs-default-rtdb.firebaseio.com/sites.json`)
        let data = await result.json()
        let arr = []
        let keys = Object.keys(data)
        for (let i = 0; i < keys.length; i++) {
        let k = keys[i];
        let tag = data[k].tags
        arr.push(tag)
      }
      let merge = [].concat.apply([], arr)
      let unique = [...new Set(merge)]
      this.tags = unique

      }
    },
    async mounted() {
     this.loadSites()
     this.loadTags()
    
    },
    computed: {
      filteredsites() {
        
      },
      filteredTags() {
        
        console.log("click")
        return this.tags.filter((tag) => {
          return tag.match(this.search)
        })
        
      }
        
      }
    }
   


  
</script>
