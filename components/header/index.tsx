import React, {useState} from 'react'
import styles from './header.module.css'; 
import { Menu, Drawer} from 'antd';
import {MenuOutlined} from "@ant-design/icons";
import Link from 'next/link';


function AppMenu({isInline=false}){

  return(
    <div  className={styles.container}  >
       <div className={styles.logo}></div>
         <Menu 

         mode={isInline ? "inline" : "horizontal"}
         className={styles.nevbar} 
         items={[
          {
            label: "Home",
            key: "home",
          },
          {
            label: "Report Incident",
            key: "Report Incident",
          },
          {
            label: "Scedule Patrol",
            key: "Schedule Incident",
          },
          {
            label: "Rewards",
            key: "Rewards",
          },
          {
            label: "About us",
            key: "About us",
          },
          {
            label: "Fund us",
            key: "Fund us",
          },
          {
            label: "Account",
            key: "Account",
          },
         
         ]}
         >
          
         </Menu>
        

    </div>

  )

}

const Header = () => {
  const [openMenu, setOpenMenu] = useState(false)
  return (
 <div >
  <div className={styles.headers}><MenuOutlined onClick={()=>{
    setOpenMenu(true)
  }}/></div>
    <div className={styles.header}>
         <span className={styles.headerMenu} ><AppMenu/></span>
       <Drawer
       placement="left"
        open ={openMenu}
        onClose={()=>{
          setOpenMenu(false);
        }}
         closable={false} >
            <AppMenu isInline/>  
       </Drawer>
    

  </div>  
 </div>
  )

}

export default Header
