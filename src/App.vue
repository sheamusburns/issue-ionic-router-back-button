<template>
  <IonApp>
    <ion-header>
      <ion-toolbar>
        <div>
          <div>
            <ion-back-button class="backButtonClass"
                             :key="$route.path"
                             :disabled="backButtonDisabled()"
                             :icon="chevronBackCircleOutline"
                             text="Back"
            ></ion-back-button>
          </div>
        </div>
      </ion-toolbar>
      <div class="ion-padding">
        <h3>Current Paths:</h3>
        {{State.currentPaths.join(", ")}}
      </div>
    </ion-header>
    <ion-content>
      <ion-router-outlet id="main-content" :key="$route.path"></ion-router-outlet>

    </ion-content>
  </IonApp>
</template>

<script lang="ts">
import {
  IonApp,
  IonRouterOutlet,
  IonToolbar,
  IonHeader,
  IonBackButton,
  useIonRouter,
  IonContent,
} from '@ionic/vue';
import {
  chevronBackCircleOutline,
} from 'ionicons/icons';
import { defineComponent} from 'vue';
import {useRoute, useRouter} from 'vue-router';
import {State} from '@/router/index';

export default defineComponent({
  name: 'App',
  components: {
    IonApp,
    IonRouterOutlet, 
    IonHeader,
    IonToolbar,
    IonBackButton,
    IonContent
  },
  data() {
    return {
      currentPath: [],
      State: State
    }
  },
  methods: {
    backButtonDisabled: function() {
      const ionRouter = useIonRouter();
      const route = useRoute();
      return !ionRouter.canGoBack() ||
          ["/", "", null, undefined].includes(history.state.back) ||
          history.state.back === route.fullPath
    },
  },
  setup() {
    const router = useRouter();

    router.beforeEach(async (to, from, next) => {
      State.currentPaths.push(to.fullPath);
      next();
    })
    return {
      chevronBackCircleOutline
    }
  }
});
</script>

<style scoped>
.backButtonClass {
  display: block;
}
</style>