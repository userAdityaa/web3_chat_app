import Images from '../../assets';
import { ChatAppContext } from '@/context/ChatAppContext';
// import {Loader} from '../index';
import { useContext, useState } from 'react';
import Style from './Module.module.css';
import Image, { StaticImageData } from 'next/image';

interface FunctionParams {
  name: string;
  accountAddress: string;
}

interface ModelProps {
  openModal: (value: boolean) => void;
  title: string;
  head: string;
  info: string;
  smallInfo: string;
  image: StaticImageData;
  functionName: (params: FunctionParams) => void;
  address?: string;
}

export const Model: React.FC<ModelProps> = ({openModal, title, head, info, smallInfo, image, functionName, address}) => { 
  const [name, setName] = useState(""); 
  const [accountAddress, setAccountAddress] = useState(""); 
  const {loading} = useContext(ChatAppContext);
  return (
    <div className={Style.Model}>
      <div className={Style.Model_box}>
        <div className={Style.Model_box_left}>
          <Image src={image} alt = 'buddy' height={700} width = {700} />
        </div>
        <div className={Style.Model_box_right}>
          <h1>
            {title} <span>{head}</span>
          </h1>
          <p>{info}</p>
          <small>{smallInfo}</small>

          <div className={Style.Model_box_right_name}>
            <div className={Style.Model_box_right_name_info}>
              <Image src = {Images.username} alt='user' width={30} height={30}></Image>
              <input type="text" placeholder='your name' onChange={(e) => setName(e.target.value)} />
            </div>
            <div className={Style.Model_box_right_name_info}>
              <Image src = {Images.username} alt='user' width={30} height={30}></Image>
              <input type="text" placeholder={address || "Enter address"} onChange={(e) => setName(e.target.value)} />
            </div>

            <div className= {Style.Model_box_right_name_btn}>
              <button onClick={() => functionName({name, accountAddress})}>
                {""}
                <Image src={Images.send} alt='send' width={30} height={30}/>
                {""}
                Submit
              </button>

              <button onClick={() => openModal(false)}>
                {""}
                <Image src={Images.send} alt='send' width={30} height={30}/>
                {""}
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}