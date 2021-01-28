<template>
  <ion-page>
    <ion-content class="has-header">
      <div class="centered">
        <div class="column">
          <div>
            history.state.back : {{JSON.stringify(history.state.back)}}
          </div>
          <div>
            $route.fullPath : {{$route.fullPath}}
          </div>

          <div>
            <ion-button type="button" @click="goToPage('A')">Page A</ion-button>
          </div>

          <div>
            <ion-button type="button" @click="goToPage('B')">Page B</ion-button>
          </div>

          <div>
            <ion-button type="button" @click="goToPage('C')">Page C</ion-button>
          </div>
        </div>

      </div>

    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonContent,
  IonPage,
  IonButton,
} from '@ionic/vue';
import {
  defineComponent
} from "vue";

export default defineComponent({
  name: 'Folder',
  components: {
    IonContent,
    IonPage,
    IonButton,
  },
  data() {
    return {
      history: history
    }
  },
  methods: {
    getNextRoute(): string {
      let nextRoute = 'other-page';
      if (this.$route.name === 'other-page') {
        nextRoute = 'page';
      }
      return nextRoute;
    },
    async goToPage(pageId: string): Promise<void> {
      await this.$router.push({
        name: this.getNextRoute(),
        params: {
          id: pageId
        },
      })
    }
  }
})
</script>

<style scoped>
.has-header {
  margin-top: 60px !important;
}
.centered {
  display: flex;
  justify-content: center
}

.column {
  flex-direction: column;
}

.centered div {
  margin-top: 40px;
}

</style>