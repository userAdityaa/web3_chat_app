import React, { useContext } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import Style from "./Navbar.module.css"
import { ChatAppContext } from '@/context/ChatAppContext'
import images from '../../assets';
import {Model} from '../index';


export const Navbar = () => {
  const menuItems = [
    {
      menu: "ALL USERS", 
      link: "alluser", 
    }, 
    {
      menu: "CHAT", 
      link: "/", 
    }, 
    {
      menu: "CONTACT", 
      link: "/", 
    }, 
    {
      menu: "SETTING", 
      link: "/",
    }, 
    {
      menu: "FAQs", 
      link: "/",
    }, 
    { 
      menu: "TERMS OF USE", 
      link  : "/",
    }
  ]

  const [active, setActive] = React.useState(2) 
  const [open, setOpen] = React.useState(false)
  const [openModal, setOpenModal] = React.useState(false)
  const {account, userName, connectWallet, createAccount} = useContext(ChatAppContext);
  return (
    <div className={Style.Navbar}>
      <div className={Style.Navbar_box}>
      <div className={Style.Navbar_box_left}>
        <Image src={images.logo} alt='logo' width={50} height={50}></Image>
      </div>
      <div className={Style.Navbar_box_right}>
        <div className={Style.Navbar_box_right_menu}>
          {menuItems.map((item, index) => {
            return (
              <div
              onClick={() => setActive(index + 1)} 
              key = {index + 1}
              className={`${Style.Navbar_box_right_menu_items} ${active === index + 1 ? Style.active : ""}`}> 
                <Link className={Style.Navbar_box_right_menu_items_link}
                href = {item.link}>
                  {item.menu}
                </Link>
              </div>
            )
          })}
        </div>
        {open && (
          <div className={Style.mobile_menu}>
          {menuItems.map((item, index) => {
            return (
              <div
              onClick={() => setActive(index + 1)} 
              key = {index + 1}
              className={`${Style.mobile_menu_items} ${active === index + 1 ? Style.active : ""}`}> 
                <Link className={Style.mobile_menu_items_link}
                href = {item.link}>
                  {item.menu}
                </Link>
              </div>
            )
          })}
          <p className={Style.mobile_menu_btn}>
            <Image src = {images.close} alt='close' height={50} width={50} onClick={() => setOpen(false)}></Image>
          </p>  
        </div>
        )
        }

        <div className={Style.Navbar_box_right_connect}>
          {account == "" ? (
            <button onClick={() => connectWallet()}>
              {""}
              <span>Connect Wallet</span>
            </button>
          ): (
            <button onClick={() => setOpenModal(true)}>
              {""}
              <div style={{ display: 'flex', alignItems: 'center' }}>
              <Image 
                src={userName ? images.accountName : images.create2} 
                alt="Account Image" 
                width={20} 
                height={20} 
              />
              <small style={{ marginLeft: '8px' }}>{userName || "Create Account"}</small>
            </div>
            </button>
          )} 
        </div>
        <div className={Style.Navbar_box_right_open} onClick={() => setOpen(true)}>
          <Image src={images.open} alt='open' height={30} width={30}></Image>
        </div>
      </div>
      </div>

    {/* Modal Component:  */}
    {openModal && (
      <div className={Style.modelBox}>
        <Model openModal = {setOpenModal} title = 'Welcome to' head = 'Chat Buddy' info = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque animi culpa est aut aliquam neque voluptates. Optio doloribus voluptatibus architecto.'
        smallInfo = 'Kindly select your name...'
        image = {images.hero}
        functionName = {createAccount}
        address={account} />
      </div>
    )}
    {/* {error == "" ? "": <Error error = {error}/>} */}
    </div>
  )
}



