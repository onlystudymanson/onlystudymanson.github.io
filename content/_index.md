---
title: ''
summary: 'The portfolio of Seung-Jae Son.'
type: landing
sections:
  - block: resume-biography-3
    content:
      username: me
      profile_buttons:
        - text: View Publications
          url: '#publications'
        - text: Download CV
          url: /files/Seung_Jae_Son_CV.pdf
          download: true
      headings:
        about: About
    design:
      background:
        gradient_mesh:
          enable: true
      name:
        size: md
  - block: content-collection
    id: projects
    content:
      title: Projects
      count: 0
      sort_by: Weight
      sort_ascending: true
      filters:
        folders:
          - projects
    design:
      view: article-grid
      columns: 2
      show_date: false
      show_read_time: false
  - block: publication-groups
    id: publications
---
