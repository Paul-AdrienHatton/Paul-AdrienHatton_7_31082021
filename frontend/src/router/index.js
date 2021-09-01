import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Profile from "../views/Profile.vue";
import Forum from "../views/Forum.vue";
import About from "../views/About.vue";
import NotFound from "../views/NotFound.vue";

const routes = [
  {
    name: "Home",
    path: "/",
    component: Home,
    meta: {
      title: "Accueil",
    },
  },
  {
    name: "Profile",
    path: "/profile",
    component: Profile,
    meta: {
      title: "Mon profil",
    },
  },
  {
    name: "Forum",
    path: "/forum",
    component: Forum,
    meta: {
      title: "Forum",
    },
  },
  {
    name: "About",
    path: "/about",
    component: About,
    meta: {
      title: "A propos",
    },
  },
  {
    name: "NotFound",
    path: "/:pathmatch(.*)",
    component: NotFound,
    meta: {
      title: "404 Not Found",
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.afterEach((to) => {
  document.title = to.meta.title;
});

export default router;
