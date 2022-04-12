If you are done with your hackathon and thinking about launching your project into production, or if you are just using this boilerplate to start your soon to be in production  application, this document is a checklist to help you get your application production ready.


- Remove Unused code and configs
- Add a proxy such as Cloudflare in front of your production deployment
- Update ```License.md``` and the relevant license field in package.json if applicable - See [npm's doc](https://docs.npmjs.com/files/package.json#license).
- Add [sitemap.xml](https://en.wikipedia.org/wiki/Sitemaps) and [robots.txt](https://moz.com/learn/seo/robotstxt)
- Add Winston Logging, and replace console.log statements with Winston; have a process for monitoring errors to identify bugs or other issues after launch.
- SEO and Social Media Improvements
- Create a deployment pipeline with a pre-prod/integration test stage.
 

### Remove unused code and configs
The following is a list of various codes that you may not potential be using and you could remove depending on your application:
- app.js:
  - chalk usage
  - Openshift env references
  - csrf check exception for /api/upload

- Removed readme, changelog, this guide, docker related files if not using them

### Search Engine Optimization (SEO)
Note that SEO only applies to the pages that will be publicly visible with no authentication.  Note that some of the following fields need to be added to the HTML header section similar to the page [title](https://github.com/sahat/hackathon-starter/blob/master/views/layout.pug#L9)
- Add Open Graph fields for SEO
  Open Graph data:
  ```
  <meta property="og:title" content="Title">
  <meta property="og:type" content="website">
  <meta property="og:url" content="http://www.example.com/article.html">
  <meta property="og:image" content="http://www.example.com/image.png">
  ```
- Add a page description, which will show up in the search results of the search engine.
```
  <meta name="Description" content="Description about the page.">
```

- Add the Google Plus page as the publisher of the website.
  ```
  <link rel=”publisher” href=”https://plus.google.com/+your_business_google_plus_id”>
  ```
