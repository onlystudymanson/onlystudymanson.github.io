---
title: ''
summary: 'The portfolio of Seung-Jae Son.'
type: landing
sections:
  - block: resume-biography-3
    content:
      username: me
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
  - block: content-collection
    id: publications
    content:
      title: Publications
      text: Publication details coming soon.
      filters:
        folders:
          - publications
    design:
      view: citation
---
