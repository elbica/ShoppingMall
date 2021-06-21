import React from "react"
import Input from "../Components/Input"
import { withRouter, Link } from "react-router-dom"
import LoginQuestion from "../images/login_question.png"
import "../css/Login.css"
import Axios from "axios"
const headers = { withCredentials: true }

class Login extends React.Component {
  changeValue = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }
  Check(event) {
    event.preventDefault()

    if (event.target[0].attributes[3].value === "") alert("please write id!")
    else if (event.target[1].attributes[3].value === "") alert("please write password!")
    else {
      let url = "/auth/login"

      Axios.post(url, {
        headers,
        user_id: event.target[0].value,
        user_password: event.target[1].value,
      })
        .then((res) => {
          let success = res.data._login

          if (success) {
            alert("로그인 성공!")
            let temp = {
              id: event.target[0].value,
              nickName: res.data._user_name,
              loginCheck: true,
            }
            window.sessionStorage.setItem("id", temp.id)
            this.props.change(temp)
            this.props.history.push("/")
          } else {
            alert("로그인 실패")
            event.target[0].value = ""
            event.target[1].value = ""
          }
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
  render() {
    return (
      <div className="haha">
        <div className="total">
          <div className="logins">
            <h2>Login</h2>

            <form onSubmit={(e) => this.Check(e)} className="login">
              <div className="loginInput">
                <div className="Id">
                  <Input
                    name="id"
                    placeholder="id"
                    message="*아이디를 입력하세요"
                    type="text"
                    up="ID"
                    func={this.changeValue}
                  />
                </div>
                <div className="Password">
                  <Input
                    name="password"
                    placeholder="password"
                    message="*비밀번호를 입력하세요"
                    type="password"
                    up="PW"
                    func={this.changeValue}
                  />
                </div>
              </div>
              <div className="loginButton">
                <input type="submit" value=""></input>
              </div>
              <div className="etc">
                {/* <div className="finds">
                  <img src={LoginQuestion} alt="" />
                  <div className="find">
                    <Link to="/find_id">아이디 찾기</Link>
                    <span></span>
                    <Link to="/find_password">비밀번호 찾기</Link>
                  </div>
                </div> */}
                <div className="register">
                  <Link to="/register">ELBI가 처음이신가요?</Link>
                </div>
              </div>
            </form>
          </div>
          <div className="letter">
            <img
              src="https://ae01.alicdn.com/kf/HTB1szZRQVXXXXaJaXXXq6xXFXXXj/Beibehang.jpg"
              alt=""
            />
            <div className="wrap">
              <div className="title">
                <h2>ELBI</h2>
              </div>
              <span className="line"></span>
              <div className="description">
                <p>
                  ELBI에 오신 것을 환영합니다! ELBI는 사용자 친화적인, 사용자만을 위한 토탈
                  쇼핑몰입니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(Login)
