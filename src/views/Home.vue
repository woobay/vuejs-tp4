<template> 
  <main>
    <div class="container-fluid">
      <button class="btn btn-primary m-1" :class="{active:isActive === i}" @click="filteredTags(tag); toggle(i);"  v-for="(tag, i) in tags" :key="i">{{tag}}</button>
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

    <div class="modal" tabindex="-1" id="reg-modal" role="dialog">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Modal title</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <p>Modal body text goes here.</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary">Save changes</button>
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>

  </main>
</template>


<script>
import { KeepAlive } from "vue"
import Button from "../components/Buttons.vue"
  export default {
    components: {Button},
    data() {
      return {
        sites: [],
        tags: [],
        current: [],
        filteredSites: [],
        search: "",
        isActive: null
      }
    }, 
     methods: {
      async deleteSite(id) {
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

      },
        filteredTags(tag) {
          this.current = this.sites
          let items = this.current.filter(item => {
          return item.tags.includes(tag)
          })
        this.current = items
      },
      toggle(i) {
        if(!!this.isActive) {
          this.isActive = null
          this.current = []
          console.log("Here")
          console.log(i)
        } else {
          console.log("Also here")
          this.isActive = i
        }
      
      }
    },
    async mounted() {
     this.loadSites()
     this.loadTags()
    
    },
    computed: {
 
    }
  }


  
</script>


<style>

</style>