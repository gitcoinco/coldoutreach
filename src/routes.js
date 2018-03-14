import * as Containers from './containers';


export const routes = [
  {
    component: Containers.HomeContainer,
    exact: true,
    path: '/',
  },
  {
    component: Containers.ResumeContainer,
    exact: true,
    path: '/resume',
  },
  {
    component: Containers.EmailContainer,
    exact: true,
    path: '/email',
  }
];
