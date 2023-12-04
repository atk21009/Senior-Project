import { Key, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Header from '../../components/Navbar';
import { viewVisitors } from '../../actions/visitor';
import LoadingScreen from '../../components/LoadingScreen';

function searchVisitor() {
  let td;
  let i;
  let txtValue;

  const input = document.getElementById('VisitorSearch') as HTMLInputElement;
  const table = document.getElementById('visitorTable') as HTMLTableElement;
  const filter = input.value.toUpperCase();

  const tr = table.getElementsByTagName('tr');
  for (i = 1; i < tr.length; i += 1) {
    td = tr[i];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = '';
      } else {
        tr[i].style.display = 'none';
      }
    }
  }
}

function RenderTable(
  visitors: {
    firstname: any;
    lastname: any;
    location: any;
    phonenumber: any;
    arrived: any;
    _id: Key | null | undefined;
  }[],
) {
  return (
    <table className="v-data-table" id="visitorTable">
      <tbody>
        <tr className="v-table-header">
          <td>Name</td>
          <td>Arrival Time</td>
          <td>Phone Number</td>
          <td>Location</td>
        </tr>
        {/* eslint-disable-next-line react/destructuring-assignment */}
        {visitors.map(
          (e: {
            firstname: any;
            lastname: any;
            location: any;
            arrived: any;
            phonenumber: any;
            _id: any;
          }) => {
            const { firstname } = e;
            const { lastname } = e;
            const { location } = e;
            const { phonenumber } = e;
            const { arrived } = e;
            const { _id } = e;
            return (
              // eslint-disable-next-line no-underscore-dangle
              <tr className="v-table-rows" key={_id}>
                <td>
                  <Link
                    to={`/visitor/${_id}`}
                    className="v-link"
                  >{`${firstname} ${lastname}`}</Link>
                </td>
                <td>{arrived}</td>
                <td>{phonenumber || '-'}</td>
                <td>{location || '-'}</td>
              </tr>
            );
          },
        )}
      </tbody>
    </table>
  );
}
function RenderNoData() {
  return (
    <div className="v-no-data-ctnr">
      <span className="v-no-data">
        There are no current visitors at your business
      </span>
    </div>
  );
}

function RenderContent(v: any) {
  const { visitors } = v;
  return (
    <div className="v-ctnr">
      <div className="v-title">
        <span>Visitors</span>
        <div className="v-func">
          {visitors.length > 0 ? (
            <input
              className="v-search"
              placeholder="Search..."
              id="VisitorSearch"
              onChange={searchVisitor}
            />
          ) : null}
          <Link className="v-btn" type="button" to="/create-visitor">
            Register Visitor
          </Link>
        </div>
      </div>
      <div className="v-data-ctnr">
        <div className="v-data">
          {visitors.length > 0 ? RenderTable(visitors) : RenderNoData()}
        </div>
      </div>
    </div>
  );
}

export default function Visitor() {
  const [content, setContent] = useState(<LoadingScreen />);

  useEffect(() => {
    const renderVisitors = async () => {
      const visitorsData = await viewVisitors();
      if (visitorsData) {
        setContent(<RenderContent visitors={visitorsData} />);
      }
    };
    renderVisitors();
  }, []);

  return (
    <>
      <Header />
      {content}
    </>
  );
}
