# Hotel Coupon App Frontend

## About Environment
Configure this variables to interact with Websockets and Django REST API service

```javascript
export const environment = {
  production: true,
  url: "URL_DJANGO_APP_SERVICE",
  wsUrl: "WEB_SOCKET_CONNECTION"
};
```

## Installing dependencies and runnig project

```shell
npm install
npm install -g @angular/cli
ng serve --configuration development
```

## Building project

```shell
npm run build --configuration production
```



