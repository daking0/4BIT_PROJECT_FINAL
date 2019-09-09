/*!

=========================================================
* Paper Dashboard PRO React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-pro-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";

import { ListofArticles, ListofNoticeArticles } from '../views/Article/ArticleIndex';

import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { ArticleActions } from '../Actions/ArticleActions';
import { ReplyActions } from '../Actions/ReplyActions';
import { Slide } from 'react-slideshow-image';

// reactstrap components
import {
  Badge,
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Collapse,
  Label,
  FormGroup,
  Input,
  Table,
  Row,
  Col,
  UncontrolledTooltip,
  Nav,
  Navbar,
  NavItem,
  NavLink,
  NavbarBrand,
  NavbarToggler,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  TabContent,
  TabPane
} from "reactstrap";

const slideImages = [
  'http://localhost:8080/fileupload/files/banner01.png',
  'http://localhost:8080/fileupload/files/banner02.png',
  'http://localhost:8080/fileupload/files/banner03.png'
];
 
const properties = {
  duration: 5000,
  transitionDuration: 500,
  infinite: true,
  indicators: true,
  arrows: true,
  onChange: (oldIndex, newIndex) => {
    console.log(`slide transition from ${oldIndex} to ${newIndex}`);
  }
}
 
const Slideshow = () => {
  
    return (
      <div className="slide-container" style={{margin: 'auto'}}>
        <Slide {...properties}>
          <div className="each-slide" style={{width: '1185px', height: '468px', marginLeft: 'auto', marginRight: 'auto'}}>
            <div style={{'backgroundImage': `url(${slideImages[0]})`, width: '100%', height: '100%'}}>
              <span></span>
            </div>
          </div>
          <div className="each-slide" style={{width: '1185px', height: '468px', 'display': 'flex', marginLeft: 'auto', marginRight: 'auto'}}>
            <div style={{'backgroundImage': `url(${slideImages[1]})`, width: '100%', height: '100%'}}>
              <span></span>
            </div>
          </div>
          <div className="each-slide" style={{width: '1185px', height: '468px', 'display': 'flex', marginLeft: 'auto', marginRight: 'auto'}}>
            <div style={{'backgroundImage': `url(${slideImages[2]})`, width: '100%', height: '100%'}}>
              <span></span>
            </div>
          </div>
        </Slide>
      </div>
    )
}

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: '1',
      boardId: "notice"
    };
    this.toggle = this.toggle.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  toggle(boardId) {
    console.log(this.state.boardId)
    console.log(boardId)
    if (this.state.boardId !== boardId) {
      this.setState({
        boardId: boardId
      });
    }
  }

  onClick = (e, boardId) => {
    // console.log(boardId)
    // console.log("원래는", this.state.boardId, "넣을래", boardId)
    // this.setState({
    //   boardId: boardId
    // });
    // console.log("내가불럿어", this.state.boardId)
    this.props.listofArticle(1, 10, boardId)
  }

  render() {

    console.log("얘", this.props.history)
    console.log("얘 location", this.props.location)
    // console.log("얘",this.props.history.location.state.User)
    console.log("location", this.props.match)
    // this.props.history.path.substring(this.props.history.path.indexOf('/')+1,)

    const { boardId } = this.state;
    return (
      <div className="content" style={{ margin: '120px' }}>
        <Slideshow/>
        <Card className="card-plain"
          style={{ backgroundColor: '#fff2e6', width: '100%', marginTop : '30px' }}>
          <CardHeader>
            <div className="nav-tabs-navigation">
              <div className="nav-tabs-wrapper">
                <Nav tabs>
                  <NavItem>
                    <NavLink
                      tag="h4"
                      className={this.state.boardId === "notice" ? "active" : ""}
                      onClick={e => {
                        this.toggle("notice");
                        this.onClick(e, "notice")
                      }}
                    >
                      Notice
              </NavLink>
                  </NavItem>

                  <NavItem>
                    <NavLink
                      tag="h4"
                      className={this.state.boardId === "job" ? "active" : ""}
                      onClick={e => {
                        this.toggle("job");
                        this.onClick(e, "job")
                      }}
                    >
                      Job
              </NavLink>
                  </NavItem>

                  <NavItem>
                    <NavLink
                      tag="h4"
                      className={this.state.boardId === "class_1_board" ? "active" : ""}
                      onClick={e => {
                        this.toggle("class_1_board");
                        this.onClick(e, "class_1_board")
                      }}
                    >
                      Class
              </NavLink>
                  </NavItem>
                </Nav>
              </div>
            </div>
          </CardHeader>
          <CardBody>
            <TabContent className="text-center">
              <ListofArticles boardId={boardId} />
            </TabContent>
          </CardBody>
        </Card>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  retrieveArticle: (boardId, articleId) => dispatch(ArticleActions.RetrieveArticle(boardId, articleId))
  , listofReply: (boardId, articleId) => dispatch(ReplyActions.ListofReply(boardId, articleId))
  , listofArticle: (page, size, boardId) => dispatch(ArticleActions.ListofArticle(page, size, boardId))
});

export default withRouter(connect(null, mapDispatchToProps)(Dashboard));

// export default Dashboard;