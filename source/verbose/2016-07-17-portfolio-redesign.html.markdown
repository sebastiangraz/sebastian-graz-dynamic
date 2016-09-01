---
title: Portfolio re-design 2016
date: 2016-07-17 13:21 UTC
tags:
---

#### A simple disclosure of technologies

For this portfolio I used [Middleman][df29b96c] because I was comfortable using it
since previous rapid prototyping projects. With Middleman each page loads instantly
and that sat well with me.

Because Middleman is based on Rails I had the power to do some complex looping to
keep my code as [DRY][f7eacd16] as possible ...  ' ---

```ruby
- blog('case').articles.reverse.each do |article|
  %a.case{:href => article.url, :class => article.title.delete(' ').downcase}
    .case-bg.loadme{:style => 'background-color:' + article.data.color}
      %img{:src => article.data.image}
    %h4
      = article.title
    %p.small
      = article.data.description
```

  [f7eacd16]: https://en.wikipedia.org/wiki/Don%27t_repeat_yourself "DRY"
  [df29b96c]: https://middlemanapp.com/ "Middleman"
