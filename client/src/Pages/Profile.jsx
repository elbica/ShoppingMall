import React from "react"
import "../css/Profile.css"
import { withRouter, Link } from "react-router-dom"
import peopleimg from "../images/profile_people.PNG"
import Axios from "axios"
Axios.defaults.withCredentials = true

class Profile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      nickName: "",
      updateFlag: false,
    }
  }
  handleUpdate = () => {
    this.setState({ updateFlag: true })
  }
  update = async (e) => {
    e.preventDefault()
    let nickname = e.target.previousSibling.value
    let id = this.props.array.id
    await Axios.post(`/profile/update/${id}`, { data: nickname }).then((res) => {
      if (res.data.update) {
        alert("닉네임이 수정되었습니다")
        this.props.change({ id: id, loginCheck: true, nickName: nickname })
      } else {
        alert("수정 실패")
      }
    })
    this.setState({ nickName: nickname, updateFlag: false })
  }
  async componentDidMount() {
    await Axios.post("/")
      .then((res) => {
        let temp = {
          id: res.data.id,
          nickName: res.data.nickName,
          loginCheck: res.data.loginCheck,
        }

        this.props.change(temp)
      })
      .catch((err) => {
        console.log(err)
      })
    if (!this.props.array.loginCheck) {
      console.log(this.props.array)
      alert("로그인이 필요합니다!")
      this.props.history.push("/login")
    } else {
      this.setState({ nickName: this.props.array.nickName })
    }
  }
  render() {
    return this.props.array.loginCheck ? (
      <div className="profile_all">
        <div className="title">
          <img src={peopleimg} alt="" width="48px" />
          <h1>내 정보</h1>
        </div>
        <div className="text">
          <div className="box">
            <h1>{this.props.array.id}</h1>님 <br />
            안녕하세요! 내 정보 메뉴는 <br />
            회원가입 시 입력하신 닉네임과 심리테스트 결과를 확인하실 수 있습니다.
          </div>
        </div>
        <div className="result">
          <p className="heads">닉네임</p>

          {!this.state.updateFlag ? (
            <>
              <input type="text" className="box" value={this.state.nickName} disabled />
              <button type="text" className="modify" onClick={this.handleUpdate}>
                {"수정"}
              </button>
            </>
          ) : (
            <>
              <input type="text" className="box" />
              <button className="compl" onClick={this.update}>
                {"완료"}
              </button>
            </>
          )}
        </div>
        <div className="gotest">
          <Link to="/product">
            <p className="message">오늘의 상품이 궁금하다면?</p>
            <button className="btn">Go Shopping!</button>
          </Link>
        </div>
      </div>
    ) : null
  }
}
export default withRouter(Profile)
