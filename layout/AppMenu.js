import React, { useContext } from 'react';
import AppMenuitem from './AppMenuitem';
import { LayoutContext } from './context/layoutcontext';
import { MenuProvider } from './context/menucontext';
import Link from 'next/link';

const AppMenu = () => {
  const { layoutConfig } = useContext(LayoutContext);

  const model = [
    {
      label: 'หน้าหลัก',
      items: [{ label: 'Dashboard', icon: 'pi pi-fw pi-home', to: '/' }],
    },

    {
      label: 'เกี่ยวกับเว็บไซต์',
      icon: 'pi pi-fw pi-briefcase',
      to: '/pages',
      items: [
        {
          label: 'จัดการข่าวประชาสัมพันธ์',
          icon: 'pi pi-fw pi-megaphone',
          to: '/pages/news',
        },
        {
          label: 'จัดการแบบคำร้อง',
          icon: 'pi pi-fw pi-paperclip',
          to: '/pages/forms',
        },
        {
          label: 'จัดการการเรียนการสอน',
          icon: 'pi pi-fw pi-book',
          to: '/pages/tabteach',
        },
        {
          label: 'จัดปฏิทินวิชาการ',
          icon: 'pi pi-fw pi-calendar',
          to: '/pages/timetable',
        },
        {
          label: 'จัดการระเบียบมหาวิทยาลัย',
          icon: 'pi pi-fw pi-verified',
          to: '/pages/rules',
        },
        {
          label: 'จัดการแบนเนอร์',
          icon: 'pi pi-fw pi-window-maximize',
          to: '/pages/banner',
        },
      ],
    },
    {
      label: 'เกี่ยวกับหลักสูตร',
      icon: 'pi pi-fw pi-briefcase',
      to: '/pages',
      items: [
        {
          label: 'จัดการข้อมูลหลักสูตร',
          icon: 'pi pi-fw pi-copy',
          to: '/pages/course',
        },
      ],
    },
    // {
    //   label: 'เกี่ยวกับทุนนักศึกษา',
    //   icon: 'pi pi-fw pi-briefcase',
    //   to: '/pages',
    //   items: [
    //     {
    //       label: 'จัดการข้อมูลทุน',
    //       icon: 'pi pi-fw pi-money-bill',
    //       to: '/pages/scholarship',
    //     },
    //     {
    //       label: 'จัดการกิจกรรม',
    //       icon: 'pi pi-fw pi-calendar-minus',
    //       to: '/pages/eventstime',
    //     },
    //     {
    //       label: 'จัดการนักศึกษาทุน',
    //       icon: 'pi pi-fw pi-users',
    //       to: '/pages/student',
    //     },
    //   ],
    // },
  ];

  return (
    <MenuProvider>
      <ul className='layout-menu'>
        {model.map((item, i) => {
          return !item.seperator ? (
            <AppMenuitem item={item} root={true} index={i} key={item.label} />
          ) : (
            <li className='menu-separator'></li>
          );
        })}
      </ul>
    </MenuProvider>
  );
};

export default AppMenu;
