import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import TeamView from '../views/TeamView.vue'
import GalleryView from '../views/GalleryView.vue'
import ContactView from '../views/ContactView.vue'
import OfferView from '../views/OfferView.vue'
import BlogView from '../views/BlogView.vue'
import AdminLoginView from '../views/AdminLoginView.vue'
import AdminPanelView from '../views/AdminPanelView.vue'
import AdminPanelMessageView from '../views/AdminPanelMessageView.vue'

import AdminPanelBlogView from '../views/AdminPanelBlogView.vue'
import AdminGalleryManageImgView from '../views/AdminGalleryManageImgView.vue'
import AdminGalleryAddImgView from '../views/AdminGalleryAddImgView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/team',
      name: 'team',
      component: TeamView
    },
    {
      path: '/gallery',
      name: 'gallery',
      component: GalleryView
    },
    {
      path: '/contact',
      name: 'contact',
      component: ContactView
    },
    {
      path: '/offer',
      name: 'offer',
      component: OfferView
    },
    {
      path: '/blog',
      name: 'blog',
      component: BlogView
    },
    {
      path: '/admin-login',
      name: 'admin-login',
      component: AdminLoginView
    },
    {
      path: '/admin-panel',
      name: 'admin-panel',
      component: AdminPanelView,
      children: [
        {
          path: '',
          name: 'admin-messages',
          component: AdminPanelMessageView
        },
        {
          path: 'add-img',
          name: 'add-img',
          component: AdminGalleryAddImgView
        },
        {
          path: 'manage-gallery',
          name: 'manage-gallery',
          component: AdminGalleryManageImgView
        },

        {
          path: 'blog',
          name: 'admin-blog',
          component: AdminPanelBlogView
        }
      ]
    }
  ]
})

export default router
