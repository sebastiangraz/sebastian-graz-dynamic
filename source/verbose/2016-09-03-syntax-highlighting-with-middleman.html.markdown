---
title: Syntax high​lighting with Middle​man
date: 2016-09-03 10:45 UTC
tags:
image: '/images/blog/syntax.png'
color: '#dbf6ff'
id: '2'
order: '2'
published: true
---

#### Adding syntax highlighting to your code blocks is the new swag. Here's how to do it in a Middleman project

#### Install the dependencies

Add the following to your `Gemfile`

```ruby
gem "middleman-syntax"
gem "redcarpet"
```

Make sure you run `bundle install` after you've added them to install them properly

Activate the syntax Gem in your `config.rb` file. It's important that you don't paste them
inside the build function or similar

```ruby
activate :syntax
set :markdown_engine, :redcarpet
set :markdown, :fenced_code_blocks => true, :smartypants => true, auto_ids: false
```

Breakdown time:

- `:fenced_code_blocks` allows to use tripple backticks &#x60;&#x60;&#x60;
in your code or markdown files to indicate where the code-block begins.

```haml
​​​​```haml
#tripplebacktick
​​​​```
```

- `:smartypants` Is a typographic tool which converts punctuation characters into the correct entity such as quotes. <kbd>''</kbd> turns into <kbd>&rsquo;&rsquo;</kbd>
- `auto_ids` This runs automatic id generation on titles, so if you have a title named `### Heading` that div will get an id of `id="#heading"` — which is rarely useful.

>Note to do the above rending I had to use a `Zero Width Space` to render the backticks

Generating a Zero Width Space is tricky you can try to do the keyboard shortcut:

<kbd>Alt</kbd> + <kbd>0</kbd><kbd>1</kbd><kbd>2</kbd><kbd>9</kbd>

Or copy the following into your Chrome console:

```javascript
copy(String.fromCodePoint(0x200B))
```

And you should be able to paste 4 times on the left of the ticks (you won't see them move), this means you won't have unwanted indentation

Apologies for the side track

#### Now for the colorful bit

By now the syntax should be loaded and actually work — however it might look like it doesn't work because theres no color highlighting the code

Now you have two options

- Either import a Pygment compatible ready-made CSS from [here][218919b1] (Python enabled syntax highlighting) and it should work out of the box.
- Or create a css file name for instance: `syntax.css.erb` inside the `/source/stylesheets` folder and add the following code:

```ruby
<%= Rouge::Themes::Github.render(:scope => '.highlight') %>
```

You can change the theme by replacing `Github` with any of these:

- ThankfulEyes
- Colorful
- Base16
- Base16::Solarized
- Base16::Monokai

Load the stylesheet in your `head`

```haml
= stylesheet_link_tag :syntax
```

Then use the code fencing like so:

>Notice the <code>```haml</code> which you can replace with almost any language you want, full list here — [list of supported languages][467c66d3]

```haml
​​​​```haml
%header
  .row.center-v
    %a#logo(href='/')
      = partial 'partials/logo'
    %ul
      %li{ nav_active('index.html') }
        %a{:href => "/"} Work
      %li{ nav_active('profile.html') }
        %a{:href => "/profile"} Profile
      %li{ nav_active('verbose.html') }
        %a{:href => "/verbose"} Verbose
​​​​```
```
#### Celebrate

Hopefully you've found this mini-tutorial useful!  


  [218919b1]: https://github.com/richleland/pygments-css "pygments"
  [467c66d3]: https://github.com/jneen/rouge/wiki/List-of-supported-languages-and-lexers "supported language"
