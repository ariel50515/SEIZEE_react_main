import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

import '../styles/InnerCook.scss'
import NavBar from '../../components/NavBar'
import Footer from '../../components/Footer'

import postImg from './../p-imgs/post.jpeg'
import timeIcon from './../p-imgs/pixel-time.svg'
import servingIcon from './../p-imgs/pixel-serving.svg'
import heartIcon from '../p-imgs/pixel-heartNormal.svg'
import cake from '../p-imgs/food/cake.png'

import Step from '../components/Step'
import Tag from '../components/Tag'
import Member from '../components/Member'
import SideBar from '../components/Side_bar'
import WriteBtn from '../components/WriteBtn'
import log from 'eslint-plugin-react/lib/util/log'
import Comment from '../components/Comment'
import Message from '../components/Message'

function InnerCook() {
  const { sid } = useParams()
  const [doRerender, setDoRerender] = useState(false)
  const [cookInnerData, setCookInnerData] = useState({
    sid: 1,
    member_sid: '1',
    categories_sid: 4,
    title: '',
    img: '',
    video: '',
    induction: '',
    serving: '',
    times: '',
    ps: '',
    likes: 1,
    creat_at: '',
    mb_photo: '',
    mb_name: '惜食料理王',
    mb_email: 'test1@abc.com',
    instructions: [
      {
        sid: '',
        instrucContent: '',
        portion: '',
      },
    ],
    steps: [
      {
        sid: '',
        cooking_post_sid: '',
        step: '',
        stepImg: '',
        stepContent: '',
      },
    ],
    comment: [
      {
        sid: '',
        member_sid: '',
        categories_sid: '',
        post_sid: '',
        content: '',
        parent_sid: '',
        created_at: '',
        mb_photo: '2.png',
        mb_name: '拖拖拖拖',
        mb_email: 'test1@abc.com',
      },
    ],
  })

  const getCookInnerData = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3004/forum/cook/inner/${sid}`
      )
      console.log(res.data)
      setCookInnerData(res.data)
    } catch (error) {
      console.log(error.message)
    }
  }
  useEffect(() => {
    getCookInnerData()
  }, [doRerender])

  return (
    <>
      <div className="p-navBar">
        <NavBar />
      </div>
      <div className="innerCook">
        <div className="sidBar">
          <SideBar />
        </div>
        <div className="p-cookContainer">
          <div className="p-cookTitle">
            <div className="p-cookH1AdIcon">
              <h1>{cookInnerData.title}</h1>
              <div className="p-saveIcon" alt="">
                <img src={heartIcon} alt="" />
              </div>
            </div>

            <div className="p-cookTagWrap">{/* <Tag /> */}</div>
            <div className="p-cookMemberWrap">
              <Member cookMb={cookInnerData} />
            </div>
          </div>

          <div className="p-imgAdContet">
            <div className="p-innerImgWrap">
              <img
                src={`http://localhost:3004/images/02-forum/cook/${cookInnerData.img}`}
                alt=""
              />
            </div>
            <p>{cookInnerData.induction}</p>
          </div>
          <div className="p-instAdTimAdServ">
            <div className="p-timeAdServ">
              <div className="p-timeWrap">
                <div className="p-timeIcon">
                  <img src={timeIcon} alt="" />
                </div>
                <h4 className="p-timeText">
                  時間
                  <span />
                  {cookInnerData.times}
                </h4>
              </div>
              <div className="p-servingWrap">
                <div className="p-servingIcon">
                  <img src={servingIcon} alt="" />
                </div>
                <h4 className="p-servingText">
                  人份 <span />
                  {cookInnerData.serving}
                </h4>
              </div>
            </div>
            <div className="p-instAdTitle">
              <h3>食材</h3>

              <ul className="p-instructions">
                {cookInnerData.instructions.map((v, i) => {
                  console.log(v.instrucContent)
                  return (
                    <li key={i}>
                      <p className="p-instContent">{v.instrucContent}</p>
                      <p className="p-portion">{v.portion}</p>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
          <div className="p-stepWrap">
            {cookInnerData.steps.map((v, i) => {
              console.log(v.step)
              return (
                <div
                  id={`p-stepWrap${v.cooking_post_sid}_${i}`}
                  className="p-step"
                  key={i}
                >
                  <div className="p-stepImg">
                    <img
                      src={`http://localhost:3004/images/02-forum/cook/${v.stepImg}`}
                      alt=""
                    />
                  </div>
                  <div className="p-stepContent">
                    <h3>STEP{v.step}</h3>
                    <h4>{v.stepContent}</h4>
                  </div>
                </div>
              )
            })}
          </div>
          <div className="p-PS">
            <h2>補充</h2>
            <h4>{cookInnerData.ps}</h4>
          </div>
          <div className="p-commentWrap">
            <div className="p-commentTitle">
              <h3>留言</h3>
            </div>
            <div className="p-commentForm">
              <Message
                setDoRerender={setDoRerender}
                doRerender={doRerender}
                InnerCategoriesSid={cookInnerData}
              />
            </div>
            <div className="p-commMessage">
              {cookInnerData.comment.map((v, i) => {
                return (
                  <>
                    <Comment commData={v} key={i} />
                  </>
                )
              })}
            </div>
          </div>
        </div>
        <div className="p-checkAdWrit">
          <div className="p-checkStep">
            {cookInnerData.steps.map((v, i) => {
              return (
                <>
                  <span>
                    <input type="checkbox"></input>
                    <h3>
                      <a href={`#p-stepWrap${v.cooking_post_sid}_${i}`}>
                        STEP {v.step}
                      </a>
                    </h3>
                  </span>
                </>
              )
            })}
          </div>
          <div className="p-writWrap">
            <WriteBtn />
          </div>
        </div>
      </div>
      <div className="p-footer" />
      <Footer />
    </>
  )
}

export default InnerCook
