<template> 
  <main>
    <div class="container-fluid">
      <button class="btn btn-primary m-1" :class="{active:isActive === i}" @click="filteredTags(tag, i)"  v-for="(tag, i) in tags" :key="i">{{tag}}</button>
    </div>
    <!-- <Button :info="this.tags"/> -->
    <div v-if="current.length === 0">
      <div v-for="(site, index) in sites" :key="index" :id="index" class="container-fluid border p-3 m-3">
        <h4 class="m-1" v-if="site.url"><a :href="site.url">{{site.nom}}</a></h4>
        <h4 v-else>{{site.nom}}</h4>
        <p class="m-1">{{site.description}}</p>
        <button class="btn btn-primary m-1" v-for="but in site.tags">{{but}}</button><br>
        <button @click.native="deleteSite(site.id)" class="btn btn-danger m-1">Delete</button>
      </div>
    </div>
    <div v-else>
      <div v-for="(site, index) in current" :key="index" :id="index"      class="container-fluid border p-3 m-3">
        <h4 class="m-1" v-if="site.url"><a :href="site.url">{{site.nom}}</a></h4>
        <h4 v-else>{{site.nom}}</h4>
        <p class="m-1">{{site.description}}</p>
        <button class="btn btn-primary m-1" v-for="but in site.tags">{{but}}</button><br>
        <button @click.native="deleteSite(site.id)" class="btn btn-danger m-1">Delete</button>
      </div>
    </div>
  </main>
</template>


<script>
  export default {
    data() {
      return {
        sites: [],
        tags: [],
        current: [],
        filteredSites: [],
        search: "",
        lastIndex: "",
        isActive: null
      }
    }, 
     methods: {
      async deleteSite(id) {
        if (confirm("Voulez vous vraiment supprimer ce site?")) {
          await fetch(`https://api---vuejs-default-rtdb.firebaseio.com/sites/${id}.json`, {
            method: "DELETE"
          })
          this.current = []
           this.loadSites()
           this.loadTags()
        }
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
      let trimed = unique.filter(Boolean)
      this.tags = trimed
      },
        filteredTags(tag, i ) { 
          if (i == this.isActive) {
            console.log("i est lastindex")
            this.current = this.sites
            this.isActive = null
          } else if (i != this.isActive) {
            console.log("i != active")
            this.isActive = i
            this.current = this.sites
            let items = this.current.filter(item => {
            return item.tags.includes(tag)
            }) 
          this.current = items
          } 
         this.lastIndex = i 
         
          
      },
    },
    mounted() {
     this.loadSites()
     this.loadTags()
    
    },
    computed: {
 
    }
  }


  
</script>


<style>

</style>