---
title: Portfolio re-design 2016
date: 2016-07-17 13:21 UTC
tags:
image: '/images/blog/graz.png'
color: '#f7ffed'
id: '1'
---

#### The new website is live! In this post I will disclose some of the technologies I've used to create this website

For this portfolio I used [Middleman][df29b96c] because I was comfortable using it
since previous rapid prototyping projects. Middleman comes with insane speed,
ability to use versioning, its easy to build upon if you need something more complex, and comes with the power of Ruby!


Because Middleman is based on Rails I had the power to do some complex looping to
keep my code as [DRY][f7eacd16] as possible. Below is a simplified version of my portfolio loop

```haml
- blog('case').articles.each do |article|
  %a.case{ :href => article.url }
    %img{:src => article.data.image}
    %h4 = article.title
    %p.small = article.data.description
```

It's worth noting in the loop that I'm using HAML. In Middleman it's as easy as replacing `.html` with `.haml` at the end of the markup files and Middleman will do the rest for you

#### Layout
I used SCSS to layout the webpage sprinkled with [PostCSS][d28f6d0d] plugins, notably the [LostGrid][fb5b2234] which was very useful
for layout.

With LostGrid I could do, which would divide the content into four equal columns with a 32px gap

```scss
@lost flexbox flex;
@lost gutter 32px;

.cases {
	lost-center: $max-width;
	.case {
		lost-column: 1/4;
  }
}
```

  [fb5b2234]: https://github.com/peterramsing/lost "LostGrid"
  [d28f6d0d]: https://github.com/postcss "PostCSS"
  [f7eacd16]: https://en.wikipedia.org/wiki/Don%27t_repeat_yourself "DRY"
  [df29b96c]: https://middlemanapp.com/ "Middleman"
