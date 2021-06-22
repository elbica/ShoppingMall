import React from "react"
import "../css/Board.css"
import board1 from "../images/coffee2.png"
import board2 from "../images/search1.png"
import board3 from "../images/heart.png"
import board4 from "../images/chat.png"
import { Link, Router } from "react-router-dom"
import Axios from "axios"
import Boardbtn from "../Components/BoardBtn"

Axios.defaults.withCredentials = true

class Boardtd extends React.Component {
  render() {
    return (
      <td>
        <Link
          to={{
            pathname: `/board/page${this.props.num}/${this.props.original.id}`,
            state: {
              prevPage: this.props.num,
            },
          }}
        >
          {this.props.view}
        </Link>
      </td>
    )
  }
}
class BoardRow extends React.Component {
  render() {
    let version = this.props.num % 2 === 1 ? " #f1f1f1" : " white"
    let style = { background: version }
    let list = Object.values(this.props.array)
    list = list.slice(0, list.length - 1)
    list = list.map((l, idx) => {
      return (
        <Boardtd key={idx} original={this.props.array} view={l} num={this.props.pageNum}></Boardtd>
      )
    })
    return (
      <tr className="Boardrow" style={style}>
        {list}
      </tr>
    )
  }
}

class BoardTable extends React.Component {
  constructor(props) {
    super(props)

    let page = this.props.match.params.page
    page = parseInt(page.slice(4))
    this.state = {
      pageNum: page,
      lists: [
        {
          id: "1",
          title: "2",
          date: "3",
          writer: "3",
          view: "3",
          comments: "3",
          des: "3",
        },
        {
          id: "2",
          title: "2",
          date: "2",
          writer: "2",
          view: "3",
          comments: "4",
          des: "5",
        },
      ],
      lastPageNum: 1,
    }
  }
  componentDidMount() {
    this.getLists()
    // this.addLists()
  }

  getLists = async () => {
    await Axios.get(`/list/${this.state.pageNum}`, {
      currentPage: this.state.pageNum,
    }).then((res) => {
      this.setState({ lists: res.data.model, lastPageNum: res.data.lastPage })
    })

    this.addLists()
  }
  addLists = () => {
    let count = this.state.lists.length
    let temp = this.state.lists

    for (let i = count; i < 5; i++)
      temp.push({
        id: "",
        title: "",
        date: "",
        writer: "",
        view: "",
        comments: "",
        des: "",
      })
    this.setState({ lists: temp })
  }
  changePageNum = async (v) => {
    if (this.state.pageNum !== v) await this.setState({ pageNum: v })
    this.getLists()
  }
  render() {
    let ret = this.state.lists.map((l, idx) => {
      return <BoardRow num={idx} key={idx} array={l} pageNum={this.state.pageNum}></BoardRow>
    })
    return (
      <div className="text">
        <div className="search">
          <Link to={{ pathname: "/write", state: { prevPage: this.state.pageNum } }}>
            <input type="button" className="write" value="글 작성" />
          </Link>

          {/* <ul>
            <li>
              <input type="text" />
            </li>
            <li>
              <img src={board2} alt="" />
            </li>
          </ul> */}
        </div>

        <table>
          <thead>
            <tr>
              <th className="head-1">No.</th>
              <th className="head-2">Title</th>
              <th className="head-3">Date</th>
              <th className="head-4">Writer</th>
              <th className="head-5">View</th>

              <th className="head-7">
                <img src={board4} alt="" width="20px" />
              </th>
            </tr>
          </thead>
          <tbody>{ret}</tbody>
        </table>
        <div className="pagenum">
          <Boardbtn
            pageNum={this.state.pageNum}
            lastPageNum={this.state.lastPageNum}
            handle={this.changePageNum}
          ></Boardbtn>
        </div>
      </div>
    )
  }
}
class Board extends React.Component {
  render() {
    return (
      <div className="board">
        <div className="image">
          <h3 className="imageTitle">{"Q & A"}</h3>
          <h5 className="imageText"></h5>
        </div>

        <BoardTable {...this.props}></BoardTable>
      </div>
    )
  }
}

export default Board
