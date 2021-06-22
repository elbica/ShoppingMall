import React from "react"
import Input from "../Components/Input"
import "../css/Register.css"
import register_title from "../images/register_title.PNG"
import { withRouter, Link } from "react-router-dom"
import Axios from "axios"
Axios.defaults.withCredentials = true
class Register extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      flag: true,
      _id: "",
      _password: "",
      passwordCheck: "",
      nickName: "",
      question: "",
      answer: "",
      possible: {
        _id: false,
        _password: false,
        passwordCheck: false,
        nickName: false,
      },
    }
  }
  handleForm = (e) => {
    e.preventDefault()
    let temp = Object.values(this.state.possible)
    console.log(temp)
    let check = true
    for (let i = 0; i < temp.length; i++)
      if (temp[i] === false) {
        check = false
        break
      }
    if (check && this.state.answer) {
      Axios.post("/auth", {
        user_id: this.state._id,
        user_password: this.state._password,
        user_nickname: this.state.nickName,
        user_q: this.state.question,
        user_a: this.state.answer,
      })
        .then((res) => {
          alert("회원가입 성공!")
          window.sessionStorage.setItem("id", this.state._id)
          window.location.href = "/"
        })
        .catch((err) => {
          alert("회원가입 실패 ㅠㅠ")
          console.log(err)
          this.props.history.push("/login")
        })
    } else {
      alert("다시 확인해 주세요")
    }
  }
  version = () => {
    this.setState((state) => {
      return { flag: !state.flag }
    })
  }
  change_SValue = (e) => {
    let s = this.select.options[this.select.selectedIndex]
    this.setState({ [e.target.name]: s.value })
  }
  handle = (e, v) => {
    if (v === undefined) this.setState({ [e.target.name]: e.target.value })
    else {
      if (e.target.name === "passwordCheck" && v)
        this.setState({
          possible: {
            ...this.state.possible,
            _password: true,
            passwordCheck: true,
          },
        })
      else
        this.setState({
          possible: { ...this.state.possible, [e.target.name]: v },
        })
    }
  }
  render() {
    //n, placeholder, message, type, up
    const visi1 = this.state.flag ? { display: "block" } : { display: "none" }
    const visi2 = this.state.flag ? { display: "none" } : { display: "block" }

    return (
      <div className="all">
        <section className="titleBox">
          <div className="title">
            <img src={register_title} alt="" />
            <h1>회원가입</h1>
          </div>
          <span className="line"></span>
        </section>

        <form
          onSubmit={(e) => {
            this.handleForm(e)
          }}
        >
          <section className="input_list">
            <ul style={visi1}>
              <li>
                <Input
                  placeholder=""
                  message=""
                  type="text"
                  up="아이디"
                  name="_id"
                  handle={this.handle}
                />
              </li>
              <li>
                <Input
                  placeholder=""
                  message=""
                  type="password"
                  up="비밀번호"
                  name="_password"
                  handle={this.handle}
                  pwc={this.state.passwordCheck}
                />
              </li>
              <li>
                <Input
                  placeholder=""
                  message=""
                  type="password"
                  up="비밀번호 확인"
                  name="passwordCheck"
                  handle={this.handle}
                  pw={this.state._password}
                />
              </li>
            </ul>

            <ul style={visi2}>
              <li>
                <Input
                  placeholder=""
                  message=""
                  type="text"
                  up="닉네임"
                  name="nickName"
                  handle={this.handle}
                />
              </li>
              <li>
                {/* select 수정한 부분 -option.value에 바로 접근하기 위함! */}
                <div className="inputBox">
                  <p className="heads">본인확인용 질문</p>
                  <div className="Box">
                    <select
                      name="question"
                      ref={(ref) => (this.select = ref)}
                      onChange={(event) => {
                        this.change_SValue(event)
                      }}
                    >
                      <option value="-">선택해주세요.</option>
                      <option value="질문 1">어린 시절 별명은 무엇인가요?</option>
                      <option value="질문 2">출신 초등학교는 어디인가요?</option>
                      <option value="질문 3">좋아하는 가수의 이름은 무엇인가요?</option>
                    </select>
                  </div>
                </div>
              </li>
              <li>
                <Input
                  placeholder=""
                  message=""
                  type="text"
                  up="답변"
                  name="answer"
                  handle={this.handle}
                />
              </li>
            </ul>
          </section>
          <section className="next">
            <Link to="register" className="prevPage" onClick={this.version} style={visi2}>
              이전
            </Link>
            <Link to="register" className="nextPage" onClick={this.version} style={visi1}>
              다음
            </Link>
            <button className="complete" type="submit" style={visi2}>
              제출하기
            </button>
          </section>
        </form>
      </div>
    )
  }
}
export default withRouter(Register)
