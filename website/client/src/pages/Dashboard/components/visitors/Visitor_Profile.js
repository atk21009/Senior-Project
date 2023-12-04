import React, { Component } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";

import * as actions from "../../../../store/actions";
import LoadingScreen from "../../../../components/LoadingScreen";
import DashboardNav from "../../../../components/DashboardNav";

function RenderContent(e) {
  const { arrived, firstname, lastname, location, phonenumber, _id } =
    e.props.visitor;

  async function handleCheckout() {
    await e.props.deleteVisitor(_id);
  }

  return (
    <div className="page">
      <div className="dashboard">
        <DashboardNav />
        <div className="v-pro-ctnr">
          <div className="v-pro">
            <div className="v-title">
              {firstname} {lastname}
              <div className="v-checkout-ctnr">
                <button className="v-checkout-btn" onClick={handleCheckout}>
                  Check Out
                </button>
              </div>
            </div>
            <div className="v-data-ctnr">
              <div className="v-data">
                <span className="v-label">Name: </span>
                {firstname} {lastname}
              </div>
              <div className="v-data">
                <span className="v-label">Phone Number: </span>
                {phonenumber || "-"}
              </div>
              <div className="v-data">
                <span className="v-label">Time of Arrival: </span>
                {arrived}
              </div>
              <div className="v-data">
                <span className="v-label">Location Visiting: </span>
                {location || "-"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

class Visitor_Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: <LoadingScreen />,
    };
  }

  async componentDidMount() {
    const _id = this.props.params.visitor_number;
    await this.props.fetchVisitor(_id).then((res) => {
      this.setState({ content: RenderContent(this) });
    });
  }

  render() {
    return this.state.content;
  }
}

function mapStateToProps({ visitor, visitors }) {
  return { visitor, visitors };
}

const withRouter = (Child) => {
  return (props) => {
    const params = useParams();
    return <Child {...props} params={params} />;
  };
};

export default withRouter(connect(mapStateToProps, actions)(Visitor_Profile));
