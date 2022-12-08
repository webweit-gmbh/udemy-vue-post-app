# Webweit POSTERMAN app

This app is the result of this Udemy course:
[https://www.udemy.com/course/vuejs-3-the-composition-api/](https://www.udemy.com/course/vuejs-3-the-composition-api/)

Generic webweit space for Vue stuff:
[https://webweit.atlassian.net/wiki/spaces/wwCircles/pages/3779526679/Vue+trainings](https://webweit.atlassian.net/wiki/spaces/wwCircles/pages/3779526679/Vue+trainings)

Live app here [54.37.233.139](54.37.233.139) (contact **Rob** if app or server is down)

[![Demo](doc/posterman-app.gif)](doc/posterman-app.gif)

Original readme below:

---

## Vue.js: The Composition API (v3)

Welcome to the third recording of my Vue.js course! Get it here [on Udemy](https://www.udemy.com/course/vuejs-3-the-composition-api/?referralCode=0C911BD2BD6C57007F36).

This is a information dense course where we build a full blogging application, including a real back-end with authentication and authorization. We go deep into Vue's reactivity system, and create some complex components.

## Content

### Vue.js
- `<script setup>`
- Vite + ES modules
- Vuex -> Pinia (official state management solution)
- Composables
- Reusable components

### General Skills
- Design Patterns, modular code
- TypeScript for type safety
- *real* authentication and authorization using jsonwebtoken (JWT)
- Basic server with Node.js + Express

### Bonus!
- Deploy to production
- Testing module (coming soon)

## Useful Links and Snippets

Bulma: `@import "https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css";`

Modal

```html
<div class="modal" style="display: block; color: white;">
  <div class="modal-background">
    <div class="modal-content">
      <div id="modal"></div>
    </div>
  </div>
  <button class="modal-close is-large"></button>
</div>
```