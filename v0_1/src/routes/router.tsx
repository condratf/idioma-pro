import { FC, Suspense, lazy } from 'react'
import { Routes, Route, Navigate, PathRouteProps } from 'react-router-dom'
import * as pages from '../components/pages'
import { Loading } from '../components/Loading'

type PagesMapping = keyof typeof pages
type ComponentItem = {
  route: string
  Component: React.LazyExoticComponent<FC>
} & Omit<PathRouteProps, 'path' | 'element'>

export const pagesMapping: Record<PagesMapping, ComponentItem> = {
  Home: {
    route: '/home',
    Component: lazy(() => import('../components/pages/Home')),
  },
  Contacts: {
    route: '/contacts',
    Component: lazy(() => import('../components/pages/Contacts')),
  }
}

export const RoutesMapping: Record<PagesMapping, string> = Object.entries(
  pagesMapping,
).reduce<Record<string, string>>((acc, [key, value]) => {
  acc[key] = value.route
  return acc
}, {})

const pagesArray = Object.values(pagesMapping)

const defaultPage = RoutesMapping.Home

export const AppRoutes: FC = () => (
  <Suspense fallback={<Loading />}>
    <Routes>
      <Route path="/" element={<Navigate to={defaultPage} replace />} />
      {pagesArray.map(({ route, Component, ...x }, i) => (
        <Route key={i} path={route} element={<Component />} {...x} />
      ))}
    </Routes>
  </Suspense>
)