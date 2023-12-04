import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Header from '../../components/Navbar';
import { deleteVisitor, viewVisitor } from '../../actions/visitor';
import LoadingScreen from '../../components/LoadingScreen';

function RenderContent(v: any) {
  const { visitor } = v;
  const { firstname, lastname, arrived, location, phonenumber } = visitor;
  const navigate = useNavigate();

  async function handleCheckout() {
    // eslint-disable-next-line no-underscore-dangle
    await deleteVisitor(visitor._id);
    navigate('/visitor');
  }

  return (
    <div className="v-prof-page">
      <div className="v-prof-ctnr">
        <div className="v-prof-title">
          {firstname} {lastname}
          <div className="v-checkout-ctnr">
            <button
              className="v-checkout-btn"
              type="button"
              onClick={handleCheckout}
            >
              Check Out
            </button>
          </div>
        </div>
        <div className="v-pd-ctnr">
          <div className="v-prof-data-ctnr">
            <span className="v-prof-label">Time of arrival: </span>
            {arrived}
          </div>
          <div className="v-prof-data-ctnr">
            <span className="v-prof-label">Phone Number: </span>
            {phonenumber || 'None'}
          </div>
          <div className="v-prof-data-ctnr">
            <span className="v-prof-label">Location visiting: </span>
            {location || 'None'}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function VisitorProfile() {
  const params = useParams();
  const [content, setContent] = useState(<LoadingScreen />);

  useEffect(() => {
    // eslint-disable-next-line no-underscore-dangle
    const _id = params.visitor_id;
    async function getVisitor() {
      const visitor = await viewVisitor(_id);
      if (visitor) {
        setContent(<RenderContent visitor={visitor} />);
      }
    }
    getVisitor();
  }, [params.visitor_id]);

  return (
    <>
      <Header />
      {content}
    </>
  );
}
