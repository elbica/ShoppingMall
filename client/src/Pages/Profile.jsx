import React from "react"
import "../css/Profile.css"
import { withRouter, Link } from "react-router-dom"
import peopleimg from "../images/profile_people.PNG"
import Axios from "axios"
import axios from "axios"
Axios.defaults.withCredentials = true

const PurchaseRow = ({ file_name, product_title, product_count, product_price, purchase_date }) => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr 1fr",
        float: "left",
        padding: "5px",
        width: "30vw",
      }}
    >
      <td>
        <img
          src={`http://localhost:5000/upload/${file_name}`}
          style={{ width: "6vw", height: "6vw", objectFit: "cover" }}
        />
      </td>
      <td>{product_title}</td>
      <td>{product_price * product_count}</td>
      <td>{purchase_date.slice(0, 11)}</td>
    </div>
  )
}

class Profile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      nickName: "",
      updateFlag: false,
      purchases: [],
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
    if (!window.sessionStorage.getItem("id")) {
      console.log(this.props.array)
      alert("로그인이 필요합니다!")
      this.props.history.push("/login")
    } else {
      axios.get(`/cart/purchase/${window.sessionStorage.getItem("id")}`).then((res) => {
        this.setState({
          nickName: this.props.array.nickName,
          purchases: res.data,
        })
      })
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
            회원가입 시 입력하신 닉네임과 구매 기록을 확인하실 수 있습니다.
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
        <div className="purchase_list">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr",
              backgroundColor: "gray",
              margin: "5px",
              height: "26px",
              color: "white",
              lineHeight: "23px",
            }}
          >
            <div>상품 사진</div>
            <div>이름</div>
            <div>총 가격</div>
            <div>구매 날짜</div>
            <div>상품 사진</div>
            <div>이름</div>
            <div>총 가격</div>
            <div>구매 날짜</div>
          </div>
          {this.state.purchases.length > 0
            ? this.state.purchases.map((p) => <PurchaseRow {...p} />)
            : "구매 기록이 없습니다."}
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
