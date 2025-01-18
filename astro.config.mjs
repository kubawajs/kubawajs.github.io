import { defineConfig } from "astro/config";
import partytown from "@astrojs/partytown";
import sitemap from "@astrojs/sitemap";
import robotsTxt from "astro-robots-txt";

import vercel from '@astrojs/vercel';

const domainUrl = "https://www.wajs-dev.net";

// https://astro.build/config
export default defineConfig({
  site: domainUrl,

  prefetch: {
    defaultStrategy: "viewport"
  },

  integrations: [
    partytown({
      config: {
        forward: ["dataLayer.push"],
      },
    }),
    sitemap(),
    robotsTxt({
      sitemap: `${domainUrl}/sitemap-index.xml`,
      policy: [
        {
          userAgent: '*',
          disallow: ["/work", "/work/*"],
        },
      ],
    }),
  ],
  redirects: {
    '/2017/05/06/console-writelinehello-world/': '/blog/2017/05/console-writelinehello-world/',
    '/2017/05/15/first-webpage-with-materialize-project-2/': '/blog/2017/05/first-webpage-with-materialize-project-2/',
    '/2017/05/20/grid-in-materialize-project-3/': '/blog/2017/05/grid-in-materialize-project-3/',
    '/2017/05/09/the-idea-is-not-the-most-important-project-1/': '/blog/2017/05/the-idea-is-not-the-most-important-project-1/',
    '/2017/06/06/angular-for-printing-list-of-objects-project-4/': '/blog/2017/06/angular-for-printing-list-of-objects-project-4/',
    '/2017/09/09/creating-net-core-mvc-application/': '/blog/2017/09/creating-net-core-mvc-application/',
    '/2017/09/23/tkinter-window-applications-in-python/': '/blog/2017/09/tkinter-window-applications-in-python/',
    '/2017/11/18/agile-work-organization-on-github-with-zenhub/': '/blog/2017/11/agile-work-organization-on-github-with-zenhub/',
    '/2017/11/30/how-to-bubble-sort-the-array-in-c/': '/blog/2017/11/how-to-bubble-sort-the-array-in-c/',
    '/2018/01/14/web-api-in-net-core-project-5/': '/blog/2018/01/web-api-in-net-core-project-5/',
    '/2018/05/31/blazor-first-view/': '/blog/2018/05/blazor-first-view/',
    '/2018/05/14/visual-studio-live-share-preview-finally-released/': '/blog/2018/05/visual-studio-live-share-preview-finally-released/',
    '/2018/09/26/machine-learning-in-net-introducing-ml-net/': '/blog/2018/09/machine-learning-in-net-introducing-ml-net/',
    '/2019/11/28/logging-with-log4net-in-net-core-3-0-console-app/': '/blog/2019/11/logging-with-log4net-in-net-core-3-0-console-app/',
    '/2019/11/28/logging-with-log4net-in-net-core-3-0-console-app/comment-page-1/?unapproved=3749&moderation-hash=de63c05c7449972c2afd0e03a2bea206': '/blog/2019/11/logging-with-log4net-in-net-core-3-0-console-app/',
    '/2019/12/23/excel-import-and-export-in-sitecore-content-hub/': '/blog/2019/12/excel-import-and-export-in-sitecore-content-hub/',
    '/2019/12/13/javascript-customization-in-sitecore-content-hub-introducing-external-page-components/': '/blog/2019/12/javascript-customization-in-sitecore-content-hub-introducing-external-page-components/',
    '/2020/01/31/deploying-asp-net-core-3-1-web-api-to-heroku-with-docker/': '/blog/2020/01/deploying-asp-net-core-3-1-web-api-to-heroku-with-docker/',
    '/2020/01/14/displaying-public-links-inside-page-component-in-sitecore-content-hub/': '/blog/2020/01/displaying-public-links-inside-page-component-in-sitecore-content-hub/',
    '/2020/02/19/sitecore-content-hub-add-custom-setting-m-setting/': '/blog/2020/02/sitecore-content-hub-add-custom-setting-m-setting/',
    '/2020/03/21/transformations-dynamic-image-resizing-in-sitecore-content-hub/': '/blog/2020/03/transformations-dynamic-image-resizing-in-sitecore-content-hub/',
    '/2020/03/10/using-azure-devops-for-ci-cd-in-azure-paas-hosted-sitecore-solutions/': '/blog/2020/03/using-azure-devops-for-ci-cd-in-azure-paas-hosted-sitecore-solutions/',
    '/2020/04/23/add-message-to-azure-service-bus-from-asp-net-web-application/': '/blog/2020/04/add-message-to-azure-service-bus-from-asp-net-web-application/',
    '/2020/05/11/error-cs8107-feature-is-not-available-in-c-7-0-please-use-language-version-7-3-or-greater-in-azure-devops-build/': '/blog/2020/05/error-cs8107-feature-is-not-available-in-c-7-0-please-use-language-version-7-3-or-greater-in-azure-devops-build/',
    '/2020/06/21/create-api-controller-in-sitecore-9-3/': '/blog/2020/06/create-api-controller-in-sitecore-9-3/',
    '/2020/08/07/sitecore-powershell-extensions-enable-spe-remoting-with-media-upload/': '/blog/2020/08/sitecore-powershell-extensions-enable-spe-remoting-with-media-upload/',
    '/2020/09/22/running-sitecore-powershell-extensions-module-as-part-of-powershell-script-in-azure-devops/': '/blog/2020/09/running-sitecore-powershell-extensions-module-as-part-of-powershell-script-in-azure-devops/',
    '/2021/01/12/setup-autofac-and-automapper-in-net-5-web-project/': '/blog/2021/01/setup-autofac-and-automapper-in-net-5-web-project/',
    '/2022/08/05/search-api-with-google-custom-search-and-net-6/': '/blog/2022/08/search-api-with-google-custom-search-and-net-6/',
    '/2023/01/17/logging-with-log4net-in-net-7-console-app/': '/blog/2023/01/logging-with-log4net-in-net-7-console-app/',
    '/2023/01/16/minimal-api-in-net-7-tips-tricks/': '/blog/2023/01/minimal-api-in-net-7-tips-tricks/',
    '/2023/02/23/distributed-cache-in-net-7-with-redis-docker/': '/blog/2023/02/distributed-cache-in-net-7-with-redis-docker/',
    '/2023/04/11/message-broker-in-net-7-with-rabbitmq-and-docker/': '/blog/2023/04/message-broker-in-net-7-with-rabbitmq-and-docker/',
    '/2023/05/02/sign-in-with-apple-in-kentico-13-website-with-net-4-8-owin-and-openid/': '/blog/2023/05/sign-in-with-apple-in-kentico-13-website-with-net-4-8-owin-and-openid/',
  }
});