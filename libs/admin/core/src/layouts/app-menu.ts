
export interface AppMenu{
  feIcon: string
  isOpen: boolean
  path: string
  label: string
  subMenus: AppMenu[]
}
export const appMenu: AppMenu[]  = [
  {
    feIcon: 'fe-home',
    isOpen: false,
    path: '',
    label: 'Dashboard',
    subMenus:[
      {
        feIcon: 'fe-activity',
        isOpen: false,
        path: '/dashboard/insights',
        label: 'Insights',
        subMenus: []
      },
      {
        feIcon: 'fe-monitor',
        isOpen: false,
        path: '/dashboard/monitor',
        label: 'Monitor',
        subMenus: []
      },
      {
        feIcon: 'fe-alert-octagon',
        isOpen: false,
        path: '/dashboard/safety',
        label: 'Driver Safety',
        subMenus: []
      },
    ]
  },
  {
    feIcon: 'fe-users',
    isOpen: false,
    path: '/routing/students',
    label: 'Students',
    subMenus: [
    ]
  },

  {
    feIcon: 'fe-map-pin',
    isOpen: false,
    path: '/routing/stops',
    label: 'Stops',
    subMenus: [
    ]
  },
  {
    feIcon: 'fa fa-bus fe-truck',
    isOpen: false,
    path: '/buses',
    label: 'Buses',
    subMenus: [
    ]
  },
  {
    feIcon: 'fe-cpu',
    isOpen: false,
    path: '/devices',
    label: 'Devices',
    subMenus: [
    ]
  },
  {
    feIcon: 'fe-user-check',
    isOpen: false,
    path: '/drivers',
    label: 'Drivers',
    subMenus: [
    ]
  },



  // {
  //   feIcon: 'fe-settings',
  //   isOpen: false,
  //   path: '/settings',
  //   label: 'Settings',
  //   subMenus:[
  //     {
  //       feIcon: 'fe-users',
  //       isOpen: false,
  //       path: '/settings/users',
  //       label: 'Users',
  //       subMenus: []
  //     },
  //   ]
  // },
]