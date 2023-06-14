
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
    label: 'Dashboard',
    path: '/dashboard/insights',
    subMenus:[]
  },
  {
    feIcon: 'fe-grid',
    isOpen: false,
    path: '/branches',
    label: 'Branches',
    subMenus: [

    ]
  },

  {
    feIcon: 'fe-users',
    isOpen: false,
    path: '',
    label: 'Customers',
    subMenus: [
      {
        feIcon: 'fe-list',
        path: '/customers',
        label: 'Directory',
        isOpen: false,
        subMenus: []
      },
      {
        feIcon: 'fe-user-plus',
        path: '/register/customers',
        label: 'Register Customer',
        isOpen: false,
        subMenus: []
      }
    ]
  },

  {
    feIcon: 'fe-briefcase',
    isOpen: false,
    path: '/loans',
    label: 'Loans',
    subMenus: [
    ]
  },

  {
    feIcon: 'fe-user-check',
    isOpen: false,
    path: '/accounts',
    label: 'Accounts',
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
